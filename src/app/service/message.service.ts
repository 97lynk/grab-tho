import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  subscriptions: Subscription[] = [];

  currentMessage = new BehaviorSubject<any>(null);

  token: string;

  current = new Date().toLocaleTimeString();

  constructor(
    private toastController: ToastController,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private fun: AngularFireFunctions,
    private angularFireMessaging: AngularFireMessaging) {

    const messaging = firebase.messaging();

    // if (firebase.messaging.isSupported()) {
    this.subscriptions.push(
      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
    );
    // }
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.subscriptions.push(
      this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
        const data = {};
        data[userId] = token;
        this.token = token;
        this.angularFireDB.object(environment.tag + '/fcmTokens/').update(data);
      })
    );
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    return this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.currentMessage.next(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    )
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    return this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', this.current, payload);
      this.currentMessage.next(payload);
      this.makeToast(payload);
    });
  }

  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'dismiss'
    });
    toast.present();
  }

  destroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
