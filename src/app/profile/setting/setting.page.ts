import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';
import { Profile } from 'src/app/dto/profile';
import { GarbageCollector } from 'src/app/util/garbage.collector';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit, OnDestroy {

  @Input() profile: Profile;

  gc = new GarbageCollector();

  constructor(
    private modalController: ModalController,
    private repairerService: RepairerService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gc.clearAll();
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Đang lưu thay đổi cài đặt...',
      spinner: 'lines-small'
    });
    loading.present();

    const alert = await this.alertController.create({
      header: 'Lưu cài đặt',
      message: 'Thay đổi cài đặt cá nhân thất bại!',
      buttons: ['Xong']
    });


    this.gc.collect('repairerService.updateSetting', this.repairerService.updateSetting(this.profile.id, {
      pushNotification: this.profile.pushNotification,
      notification: this.profile.notification
    }).subscribe(data => {
      loading.dismiss();
      this.modalController.dismiss({
        status: 'SUCCESS'
      });
    }, error => {
      loading.dismiss();
      alert.present();
    }));
  }

}
