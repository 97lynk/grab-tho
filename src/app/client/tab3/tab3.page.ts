import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
// import {NotificationsService} from 'src/app/service/notification.servie';
import { MessagingService } from '../../service/message.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../util/auth.service';
import { Profile } from '../../dto/profile';
// import 'firebase/app';
// import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';

const { LocalNotifications, PushNotifications, Device, OAuth2Client } = Plugins;

// firebase.initializeApp(environment.firebase);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {


  message: BehaviorSubject<any>;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.authService.registerSubscriber().subscribe((profile: Profile) => {
      this.messagingService.requestPermission(profile.username);
      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
    });
    this.authService.loadProfile();

    // Notification.requestPermission();
    // LocalNotifications.requestPermissions().then(value => {
    //   LocalNotifications.schedule({
    //     notifications: [
    //       {
    //         title: 'Title',
    //         body: 'Body',
    //         id: 1,
    //         schedule: {at: new Date(Date.now() + 1000 * 5)},
    //         sound: null,
    //         attachments: null,
    //         actionTypeId: '',
    //         extra: null
    //       }
    //     ]
    //   });
    // });
  }

  subscribe() {
    this.messagingService.sub('tgdd');
  }

  //
  // info: any;
  // platform: any;
  // platforms: any;
  // myDate: any;
  // datePickerObj: any;
  //
  // message: any;
  //
  // @ViewChild('inputPhoto', {static: false}) inputPhoto: ElementRef;
  //
  // // Declare the variables used
  // messaging: Messaging;
  // token: any;  // Stores the current token ID instance generated
  // items: AngularFireList<any>;
  // itemsDisplay: AngularFireList<any>; // List observable for template view (Optional. items itthis can be used)
  // itemsArr: any[]; // Stores the token IDs retrieved from the firebase database
  //
  // // // Notificayion object
  // // pushData: any = {
  // //   notification: {
  // //     title: 'Background Message Title',
  // //     body: 'Background Message Body'
  // //   },
  // //   to: ''
  // // };
  //
  // constructor(
  //   // public messagingService: MessagingService,
  //   public db: AngularFireDatabase,
  //   private angularFireMessaging: AngularFireMessaging,
  //   private plt: Platform,
  //   public modalCtrl: ModalController,
  //   public navCtrl: NavController,
  //   private notificationsService: NotificationsService,
  //   // private fcm: FcmService,
  //   private http: HttpClient,
  //   private actionSheetController: ActionSheetController,
  //   private alertController: AlertController,
  //   private imageProvider: ImageProvider) {
  //
  //
  //   // Creates a Firebase List Observable and calls the data in it
  //   this.itemsDisplay = db.list('/items');
  //
  //   // Declaring the property value of messaging
  //   const messaging = firebase.messaging();
  //
  //   // Check for token refresh
  //   this.messaging.onTokenRefresh(() => {
  //     this.messaging.getToken()
  //       .then((refreshedToken) => {
  //         console.log('Token refreshed.');
  //       })
  //       .catch((err) => {
  //         console.log('Unable to retrieve refreshed token ', err);
  //       });
  //   });
  //
  //   // Obtaining the firebase data and retrieving token ID values separately
  //   this.itemsArr = []; // Reinitialize the array to prevent data duplication
  //   this.items = this.db.list('/items');
  //   this.items.snapshotChanges().subscribe(snapshots => {
  //     snapshots.forEach(snapshot => {
  //       console.log('tokenId ', snapshot.payload.val());
  //       this.itemsArr.push(snapshot.payload.val().tokenID);
  //     });
  //   });
  //   console.log('itemsArr', this.itemsArr);
  //
  // }
  //
  // // Check for duplicates in token subscription
  // checkToken(token: string, arr: string[]) {
  //   console.log('Inside check token function');
  //   console.log(arr);
  //   console.log(token);
  //   let counter = 0;
  //   arr.forEach(a => {
  //     if (a === token) {
  //       counter++;
  //     }
  //   });
  //   console.log('Counter value', counter);
  //   return counter;
  // }
  //
  //
  // async ngOnInit() {
  //   // Prompt user to grant permission for notifications on loading components
  //     this.items = this.db.list('/items');
  //     Notification.requestPermission()
  //       .then((result) => {
  //           console.log('Notification permission granted.');
  //           this.messaging.getToken().then((currentToken) => {
  //               if (currentToken) {
  //                   this.token = currentToken;
  //
  //                   // Set a timeout so as to enable all the data to be loaded
  //                   setTimeout(() => {
  //                       if (this.checkToken(this.token, this.itemsArr) === 0) {
  //                           console.log('Push occurrence');
  //                           this.items.push({tokenID: currentToken});
  //                       } else {
  //                           console.log('User is already subscribed');
  //                       }
  //                   }, 6500);
  //
  //                   // Displays the current token data
  //                   console.log('currentToken: ', currentToken);
  //                   console.log('Stored token: ', this.token);
  //               } else {
  //                   // Show permission request.
  //                   console.log('No Instance ID token available. Request permission to generate one.');
  //               }
  //           })
  //             .catch((err) => {
  //                 console.log('An error occurred while retrieving token.', err);
  //             });
  //       })
  //       .catch((err) => {
  //           console.log('Unable to get permission to notify. ', err);
  //       });
  //
  //     // Handle incoming messages. Called when:
  //     // - a message is received while the app has focus
  //     // - the user clicks on an app notification created by a sevice worker `messaging.setBackgroundMessageHandler` handler.
  //     this.messaging.onMessage((payload) => {
  //         console.log('Message received. ', payload);
  //   });
  //
  //     this.getInfoPlatform();
  // }
  //
  //
  async ngAfterViewInit() {
    //   this.plt.ready().then(async () => {
    //     // await this.notificationsService.requestPermission();
    //   });
  }

  //
  // async getInfoPlatform() {
  //   this.info = await Device.getInfo();
  //   this.info = JSON.stringify(this.info, null, 2);
  //   this.platform = Capacitor.platform;
  //   this.platforms = this.plt.platforms();
  // }
  //
  // async notify() {
  //
  //   LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         title: 'Title',
  //         body: 'Body',
  //         id: 1,
  //         schedule: {at: new Date(Date.now() + 1000 * 5)},
  //         sound: null,
  //         attachments: null,
  //         actionTypeId: '',
  //         extra: null
  //       }
  //     ]
  //   });
  //
  //   console.log('notification');
  //
  //   Notification.requestPermission();
  //
  // }


}
