import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { ToastController } from '@ionic/angular';

import 'firebase';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);

  token: string;

  constructor(
    private toastController: ToastController,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private fun: AngularFireFunctions,
    private angularFireMessaging: AngularFireMessaging) {

    const messaging = firebase.messaging();

    // if (firebase.messaging.isSupported()) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
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
    this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
      const data = {};
      data[userId] = token;
      this.token = token;
      this.angularFireDB.object('fcmTokens/').update(data);
    });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.currentMessage.next(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
      // this.makeToast(payload);
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

  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`subscribed to ${topic}`)))
      .subscribe();
  }

  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
      .subscribe();
  }
}
