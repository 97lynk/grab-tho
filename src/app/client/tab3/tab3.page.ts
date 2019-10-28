import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  Plugins, Capacitor,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  LocalNotificationEnabledResult,
  LocalNotificationScheduleResult,
  LocalNotificationsPluginWeb,
  registerWebPlugin
} from '@capacitor/core';
import { Platform, ModalController, NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
const { LocalNotifications, PushNotifications, Device, OAuth2Client } = Plugins;

import { firebase } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/service/notification.servie';
import { OAuth2Client as OAuth2 } from '@byteowls/capacitor-oauth2';
import { AuthService } from 'src/app/util/auth.service';
import { HttpClient } from '@angular/common/http';
import { ImageProvider } from 'src/app/service/image.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {


  info: any;
  platform: any;
  platforms: any;
  myDate: any;
  datePickerObj: any;
  @ViewChild('inputPhoto', { static: false }) inputPhoto: ElementRef;

  constructor(
    private authService: AuthService,
    private plt: Platform,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private notificationsService: NotificationsService,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private imageProvider: ImageProvider, ) {
  }

  async ngOnInit() {
    // subscribe profile
    this.authService.registerSubscriber().subscribe(profile => {
      console.log('OAuth2: authenticated, receive profile ', profile);
    }, error => console.log('Header: receive profile fail'));


    console.log('Register custom capacitor plugins');
    registerWebPlugin(OAuth2);

    // firebase.initializeApp(environment.firebase);
    // await this.notificationsService.init();

    this.getInfoPlatform();

    this.myDate = 'YOUR_DATE';
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.     
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format     
      new Date('12-14-2018'), // Short format
    ];
    this.datePickerObj = {
      inputDate: new Date('2018-08-10'), // default new Date()
      fromDate: new Date('2016-12-08'), // default null
      toDate: new Date('2018-12-28'), // default null
      showTodayButton: false, // default true
      closeOnSelect: true, // default false
      disableWeekDays: [4], // default []
      mondayFirst: true, // default false
      setLabel: 'S',  // default 'Set'
      todayLabel: 'T', // default 'Today'
      closeLabel: 'C', // default 'Close'
      disabledDates: disabledDates, // default []
      titleLabel: 'Select a Date', // default null
      monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
      clearButton: false, // default true
      momentLocale: 'pt-BR', // Default 'en-US'
      yearInAscending: true, // Default false
      btnCloseSetInReverse: true, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: '', // Default 'solid'
        size: '', // Default 'default'
        disabled: false, // Default false
        strong: '', // Default false
        color: 'primary' // Default ''
      },
      arrowNextPrev: {
        nextArrowSrc: 'assets/images/arrow_right.svg',
        prevArrowSrc: 'assets/images/arrow_left.svg'
      }, // This object supports only SVG files.
      highlightedDates: [
        { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
        { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
      ], // Default [],
      isSundayHighlighted: {
        fontColor: '#ee88bf' // Default null
      } // Default {}
    };
  }


  async ngAfterViewInit() {
    this.plt.ready().then(async () => {
      await this.notificationsService.requestPermission();
    });
  }

  async getInfoPlatform() {
    this.info = await Device.getInfo();
    this.info = JSON.stringify(this.info, null, 2);
    this.platform = Capacitor.platform;
    this.platforms = this.plt.platforms();
  }

  async notify() {
    // alert('hello');
    // console.log('Initializing HomePage');

    // // Register with Apple / Google to receive push via APNS/FCM
    // PushNotifications.register();
    // PushNotifications.addListener('registration', (token) => {
    //   console.log(token);
    // });

    // // On success, we should be able to receive notifications
    // PushNotifications.addListener('registration',
    //   (token: PushNotificationToken) => {
    //     alert('Push registration success, token: ' + token.value);
    //   }
    // );

    // // Some issue with our setup and push will not work
    // PushNotifications.addListener('registrationError',
    //   (error: any) => {
    //     alert('Error on registration: ' + JSON.stringify(error));
    //   }
    // );

    // // Show us the notification payload if the app is open on our device
    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification: PushNotification) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   }
    // );

    // // Method called when tapping on a notification
    // PushNotifications.addListener('pushNotificationActionPerformed',
    //   (notification: PushNotificationActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );

    console.log('notification');

    Notification.requestPermission();

    // await LocalNotifications.requestPermissions();

    // LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       title: 'Title',
    //       body: 'Body',
    //       id: 1,
    //       schedule: { at: new Date(Date.now() + 1000 * 5) },
    //       sound: null,
    //       attachments: null,
    //       actionTypeId: '',
    //       extra: null
    //     }
    //   ]
    // });



    // console.log(await LocalNotifications.areEnabled());
  }

  selectedDate: any;

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        'objConfig': this.datePickerObj,
        'selectedDate': this.selectedDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

  notifs: LocalNotificationScheduleResult;
  pendingNotifs: LocalNotificationScheduleResult;

  async init() {
    await Plugins.LocalNotifications.requestPermissions();

    try {
      Plugins.LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'OPEN_PRODUCT',
            actions: [
              {
                id: 'view',
                title: 'Product'
              }, {
                id: 'remove', title: 'Remove', destructive: true
              },
              {
                id: 'response',
                title: 'Response',
                input: true
              }
            ]
          }
        ]
      });

      Plugins.LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notification: ', notification);
      })

      Plugins.LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Notification action performed', notification);
      });

    } catch (e) {
      console.log(e);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalNotificationsPage');
  }

  async scheduleNow() {
    this.notifs = await Plugins.LocalNotifications.schedule({
      notifications: [{
        title: 'Get 10% off!',
        body: 'Swipe now to learn more',
        // Get random id to test cancel
        id: Math.floor(Math.random() * 10),
        sound: 'beep.aiff',
        attachments: [
          { id: 'face', url: 'res://public/assets/ionitron.png' }
        ],
        actionTypeId: 'OPEN_PRODUCT',
        extra: {
          productId: 'PRODUCT-1'
        }
      }]
    });
  }

  async scheduleNowWithIcon() {
    this.notifs = await Plugins.LocalNotifications.schedule({
      notifications: [{
        title: 'Get 10% off!',
        body: 'Swipe now to learn more',
        // Android-only: set a custom statusbar icon 
        smallIcon: 'res://ic_stat_icon_sample',
        // Get random id to test cancel
        id: Math.floor(Math.random() * 10),
        sound: 'beep.aiff',
        attachments: [
          { id: 'face', url: 'res://public/assets/ionitron.png' }
        ],
        actionTypeId: 'OPEN_PRODUCT',
        extra: {
          productId: 'PRODUCT-1'
        }
      }]
    });
  }

  async scheduleOnce() {
    var now = new Date();
    this.notifs = await Plugins.LocalNotifications.schedule({
      notifications: [{
        title: 'Get 20% off!',
        body: 'Swipe to learn more',
        // Get random id to test cancel
        id: Math.floor(Math.random() * 10),
        sound: 'beep.aiff',
        attachments: [
          { id: 'face', url: 'res://public/assets/ionitron.png' }
        ],
        schedule: {
          at: new Date(now.getTime() + (10 * 1000))
        },
        actionTypeId: 'OPEN_PRODUCT',
        extra: {
          productId: 'PRODUCT-1'
        }
      }]
    });
  }

  async scheduleRepeatingOn() {
    var now = new Date();
    this.notifs = await Plugins.LocalNotifications.schedule({
      notifications: [{
        title: 'Get 20% off daily',
        body: 'Swipe to learn more',
        id: 2,
        schedule: {
          on: {
            minute: new Date().getUTCMinutes() + 1
          }
        }
      }]
    });
  }

  async scheduleRepeatingEvery() {
    var now = new Date();
    this.notifs = await Plugins.LocalNotifications.schedule({
      notifications: [{
        title: 'Happy Holidays! Last minute.',
        body: 'Swipe to learn more',
        id: 3,
        schedule: {
          every: 'minute'
        }
      }]
    });
  }

  cancelNotification() {
    this.pendingNotifs && Plugins.LocalNotifications.cancel(this.pendingNotifs);
  }

  async getPending() {
    this.pendingNotifs = await Plugins.LocalNotifications.getPending();
    console.log('PENDING', this.pendingNotifs);
  }

  toJson(o: any) {
    return JSON.stringify(o, null, 2);
  }

  facebookLogin() {
    const fbApiVersion = '2.11';
    OAuth2Client.authenticate({
      appId: environment.fbAppId,
      authorizationBaseUrl: `https://www.facebook.com/v${fbApiVersion}/dialog/oauth`,
      accessTokenEndpoint: `https://graph.facebook.com/v${fbApiVersion}/oauth/access_token`,
      resourceUrl: `https://graph.facebook.com/v${fbApiVersion}/me`,
      web: {
        redirectUrl: `${environment.redirectUri}`,
        windowOptions: 'height=600,left=0,top=0'
      },
      android: {
        customHandlerClass: 'com.companyname.appname.YourAndroidFacebookOAuth2Handler',
      },
      ios: {
        customHandlerClass: 'App.YourIOsFacebookOAuth2Handler',
      }
    }).then(resourceUrlResponse => {
      console.log('FB OAuth complete', resourceUrlResponse);
      this.http.post(`${environment.serviceUrl}/login/facebook?token=${resourceUrlResponse.access_token}`, {}).subscribe(data => {
        console.log('data ', data);
      });
    }).catch(reason => {
      console.error('FB OAuth rejected', reason);
    });
  }

  oauth2Login() {
    this.authService.loginWithUsernameAndPassword('572338133504702', 'tuan')
      .then(value => {
        console.log('login sucess ', value);
        this.authService.loadProfile();
      })
      .catch(error => {
        console.log('OAuth2: login failed');
      });
  }

  captureImage() {
    this.launchActionSheet();
  }

  parseImage(mode: string) {
    switch (mode) {

      // Handle image requests via the device camera
      case 'camera':
        this.imageProvider
          .takePicture()
          .then((url: string) => {
            console.log('image form camera');
            // this.makeGrid(url);
          })
          .catch((error) => {
            console.dir(error);
            this.displayErrorWarning(error);
          });
        break;

      // Handle image requests via the device photolibrary
      case 'library':
        // if (Capacitor.platform === 'web') {
        //   this.inputPhoto.nativeElement.click();
        // } else {
          this.imageProvider
            .selectPhoto()
            .then((data) => {
              console.log('image form library');
              // this.makeGrid(data);
            })
            .catch((error) => {
              console.log('ERROR - Returning the selectPhoto method data in a Promise');
              console.dir(error);
              this.displayErrorWarning(error);
            });
        // }
        break;

    }
  }

  async launchActionSheet() {
    const action = await this.actionSheetController.create({
      header: 'Chọn hình ảnh từ',
      buttons: [
        {
          text: 'Máy ảnh',
          handler: () => {
            this.parseImage('camera');
          }
        },
        {
          text: 'Bộ sưu tập',
          handler: () => {
            this.parseImage('library');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });
    action.present();
  }

  async displayErrorWarning(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['Ok']

    });
    alert.present();
  }


}
