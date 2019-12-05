// import { Injectable } from '@angular/core';
// // import { Platform } from '@ionic/angular';
// // import { Storage } from '@ionic/storage';
// import { Subject } from 'rxjs';
// import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';

// import { Plugins } from '@capacitor/core';
// const { CapacitorDataStorageSqlite, Capacitor } = Plugins;

// @Injectable({
//   providedIn: 'root'
// })
// export class PhotoService {

//   storage: any = {};
//   photos: any[];

//   constructor() {
//     // console.log('platform ', Capacitor.platform);
//     if (Capacitor.platform === 'ios' || Capacitor.platform === 'android') {
//       this.storage = CapacitorDataStorageSqlite;
//     } else {
//       this.storage = CapacitorSQLPlugin.CapacitorDataStorageSqlite;
//     }
//   }


//   private subject = new Subject<any[]>();

//   loadPhotos() {
//     this.storage.get({ key: 'PHOTOS' }).then((photos) => {
//       this.photos = photos.value || [];
//       this.subject.next(this.photos);
//     });
//   }

//   getPhotos() {
//     return this.subject.asObservable();
//   }

//   addPhoto(photo: any) {
//     this.photos.push(photo);
//     this.storage.set({ key: 'PHOTOS', value: this.photos });
//     return this.subject.next(this.photos);
//   }

// }
