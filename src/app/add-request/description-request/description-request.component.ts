import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, Platform, NavController, AlertController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Capacitor } from '@capacitor/core';
import { ImageProvider } from 'src/app/service/image.service';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'request-description',
  templateUrl: './description-request.component.html',
  styleUrls: ['./description-request.component.scss'],
})
export class DescriptionRequestComponent implements OnInit {

  sources = [];
  images: Array<Array<string>>;
  win: any = window;
  platformIs = '';
  textDescription = '';

  @ViewChild('inputPhoto', { static: false }) inputPhoto: ElementRef;

  constructor(
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private platform: Platform,
    private imageProvider: ImageProvider,
    public navController: NavController,
    private storageService: StorageService) {
    console.log('available ', Capacitor.isPluginAvailable('Camera'));
  }

  ngOnInit() {

    this.images = new Array(0);

    console.log('Platform ', this.platform.platforms());
    console.log('Capacitor.platform ', Capacitor.platform);

    // Are we on mobile?
    if (this.platform.is('ios')) {
      this.platformIs = 'ios';
    } else { // Or web?
      this.platformIs = 'another';
    }
  }

  selectImage(event: any) {
    this.imageProvider
      .selectImage(event)
      .subscribe((data: string) => {
        this.makeGrid(data);
        console.log('image form input');
      });
  }

  captureImage() {
    if (this.platformIs === 'ios') {
      this.inputPhoto.nativeElement.click();
      return;
    }
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
            this.makeGrid(url);
          })
          .catch((error) => {
            console.dir(error);
            this.displayErrorWarning(error);
          });
        break;

      // Handle image requests via the device photolibrary
      case 'library':
        if (Capacitor.platform === 'web') {
          this.inputPhoto.nativeElement.click();
        } else {
          this.imageProvider
            .selectPhoto()
            .then((data) => {
              console.log('image form library');
              this.makeGrid(data);
            })
            .catch((error) => {
              console.log('ERROR - Returning the selectPhoto method data in a Promise');
              console.dir(error);
              this.displayErrorWarning(error);
            });
        }
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

  makeGrid(src) {
    // console.log('make ', src);
    this.sources.push({ src });
    const s = [];
    s.push(...this.sources);
    this.images = [];
    while (s.length) {
      this.images.push(s.splice(0, 2));
    }
  }

  continute() {
    this.storageService.save('imagesDescription', this.sources);
    this.storageService.save('textDescription', this.textDescription);

    this.navController.navigateForward('/requests/my-location');
  }

  goBack() {
    this.navController.navigateBack('/tabs/home');
  }
}
