import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  unseenCount = new BehaviorSubject<number>(0);

  total = 0;

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  countUnseen(username: string) {
    this.angularFireDB.list(`${environment.tag}/notifications/${username}`).valueChanges().subscribe((data: any[]) => {
      this.unseenCount.next(data.filter(d => !d.seen).length);
      this.total = data.length;
    });
  }

  getNotification(username: string, amount: number) {
    return this.angularFireDB.list(`${environment.tag}/notifications/${username}`,
      ref => ref.orderByChild('sendAt').limitToLast(amount)
    ).snapshotChanges();
  }

  seenNotification(key: string, username: string) {
    this.angularFireDB.object(`${environment.tag}/notifications/${username}/${key}`)
      .update({
        seen: true
      });
  }

  removeNotification(key: string, username: string) {
    this.angularFireDB.object(`${environment.tag}/notifications/${username}/${key}`).remove();
  }

}
