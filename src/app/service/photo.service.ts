import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private platform: Platform, private storage: Storage) { }

  photos: any[];

  private subject = new Subject<any[]>();

  loadPhotos() {
    this.platform.ready().then(() => {
      this.storage.get('PHOTO').then((photos) => {
        this.photos = photos || [];
        this.subject.next(this.photos);
        console.log(this.photos.length);
      });
    });
  }

  getPhotos() {
    return this.subject.asObservable();
  }

  addPhoto(photo: any) {
    this.photos.push(photo);
    this.storage.set('photos', this.photos);
    return this.subject.next(this.photos);
  }

}
