import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ModalController, Platform, AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { ImageProvider } from 'src/app/service/image.service';
import { Capacitor } from '@capacitor/core';
import { Profile } from 'src/app/dto/profile';
import { Repairer } from 'src/app/dto/repairer';
import { RequestService } from 'src/app/service/request.service';
import { dataURItoBlob } from 'src/app/util/file.util';
import { RepairerService } from 'src/app/service/repairer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {

  platformIs = '';

  @ViewChild('inputPhoto', { static: false }) inputPhoto: ElementRef;

  @Input() profile: Profile;

  @Input() repairer: Repairer;

  change = false;

  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private platform: Platform,
    private requestService: RequestService,
    private imageProvider: ImageProvider,
    private loadingController: LoadingController,
    private repairerService: RepairerService
  ) { }

  ngOnInit() {
    // Are we on mobile?
    if (this.platform.is('ios')) {
      this.platformIs = 'ios';
    } else { // Or web?
      this.platformIs = 'another';
    }
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

  async save() {
    const formData = new FormData();
    const file = new File([dataURItoBlob(this.profile.avatar)], 'image.png', { type: 'image/png', lastModified: Date.now() });
    formData.append('images', file);
    const imageUrls = await this.requestService.uploadImage(formData).toPromise();

    const loading = await this.loadingController.create({
      message: 'Đang lưu thay đổi ảnh đại diện...',
      spinner: 'lines-small'
    });
    loading.present();

    const alert = await this.alertController.create({
      header: 'Lưu thay đổi',
      message: 'Thay đổi ảnh đại diện thất bại!',
      buttons: ['Xong']
    });

    const url = `${environment.serviceUrl}/requests/description-images/${imageUrls[0]}`;
    this.repairerService.updateAvatar(this.profile.id, url).subscribe(data => {
      loading.dismiss();
      this.profile.avatar = url;
      this.modalController.dismiss({
        status: 'SUCCESS'
      });
    }, error => {
      loading.dismiss();
      alert.present();
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
            // console.log('image form camera');
            this.profile.avatar = url;
            this.change = true;
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
              // console.log('image form library');
              this.profile.avatar = data;
              this.change = true;
            })
            .catch((error) => {
              // console.log('ERROR - Returning the selectPhoto method data in a Promise');
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
            // console.log('Cancelled');
          }
        }
      ]
    });
    action.present();
  }

  async displayErrorWarning(message: string) {
    const alert = await this.alertController.create({
      header: 'Lỗi chụp ảnh từ camera',
      message: 'Vui lòng kiểm tra lại camera!',
      buttons: ['Đồng ý']

    });
    alert.present();
  }

  async selectImage(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      const data = await this.imageProvider.selectImage(event, i).toPromise();
      this.profile.avatar = data + '';
      this.change = true;
      // console.log('image form input ');
    }
  }

}
