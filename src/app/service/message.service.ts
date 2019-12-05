import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  subscriptions: Subscription[] = [];

  currentMessage = new BehaviorSubject<any>(null);

  token: string;

  isCustomer: boolean;

  current = new Date().toLocaleTimeString();

  constructor(
    private toastController: ToastController,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
    private angularFireMessaging: AngularFireMessaging) {


    // console.log('messaging service ', platform.platforms(), firebase.messaging.isSupported());
    if (!platform.is('ios') && firebase.messaging.isSupported()) {
      this.subscriptions.push(
        this.angularFireMessaging.messaging.subscribe(
          (_messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
          }
        )
      );
    }
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
  requestPermission(userId, isCustomer) {
    this.isCustomer = isCustomer;
    return this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log(this.current, token);
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
      // console.log('new message received. ', this.current, payload);
      this.currentMessage.next(payload);
      this.makeToast(payload);
    });
  }

  async makeToast(payload) {
    const notification = payload['notification'];
    const data = payload['data'];
    const toast = await this.toastController.create({
      header: notification.title,
      message: notification.body,
      duration: 5000,
      position: 'top',
      buttons: [
        {
          side: 'end',
          text: 'Xem',
          handler: () => {
            if (this.isCustomer)
              this.router.navigateByUrl(`/requests/${data.requestId}`)
            else
              this.router.navigateByUrl(`/r/requests/${data.requestId}`)
          }
        }
      ]
    });
    toast.present();
  }

  destroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
