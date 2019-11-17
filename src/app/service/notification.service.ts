import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take, tap, map, filter } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { AuthService } from '../util/auth.service';
import { Profile } from '../dto/profile';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  unseenCount = new BehaviorSubject<number>(0);

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  countUnseen(username: string) {
    this.angularFireDB.list(`notifications/${username}`).valueChanges().subscribe((data: any[]) => {
      this.unseenCount.next(data.filter(d => !d.seen).length);
    });
  }

  getNotification(username: string) {
    return this.angularFireDB.list(`notifications/${username}`,
      ref => ref.orderByChild('sendAt').limitToLast(10)
    ).snapshotChanges();
  }

  seenNotification(key: string, username: string) {
    this.angularFireDB.object(`notifications/${username}/${key}`)
      .update({
        seen: true
      });
  }

}
