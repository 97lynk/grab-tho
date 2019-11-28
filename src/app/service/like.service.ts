import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take, tap, map, filter } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { AuthService } from './authentication.service';
import { Profile } from '../dto/profile';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  counter = new BehaviorSubject<number>(0);
  liked = new BehaviorSubject<any>(null);

  constructor(private angularFireDB: AngularFireDatabase) {
  }

  countLike(repairer: string, liker: string) {
    this.angularFireDB.list(`${environment.tag}/likes/${repairer}`).snapshotChanges().subscribe((data: any[]) => {
      this.counter.next(data.length);
      this.liked.next(data.find(d => d.payload.val().username === liker));
    });
  }

  getLiker(repairer: string) {
    return this.angularFireDB.list(`${environment.tag}/likes/${repairer}`).snapshotChanges();
  }

  like(repairer: string, repairerFullname: string, customerUsername: string, customerFullName: string) {
    const data = {
      username: customerUsername,
      fullName: customerFullName,
      likeAt: new Date().getTime(),
      repairer: repairerFullname
    };
    this.angularFireDB.list(`${environment.tag}/likes/${repairer}`).push(data);
    this.angularFireDB.object(`${environment.tag}/likes/${customerUsername}/${repairer}`).set(data);
  }

  unlike(repairer: string, customerUsername: string, key: string) {
    this.angularFireDB.object(`${environment.tag}/likes/${repairer}/${key}`).remove();
    this.angularFireDB.object(`${environment.tag}/likes/${customerUsername}/${repairer}`).remove();
  }

}
