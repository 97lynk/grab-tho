import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Repairer } from 'src/app/dto/repairer';
import { Profile } from 'src/app/dto/profile';
import { RepairerService } from 'src/app/service/repairer.service';
import { GarbageCollector } from 'src/app/util/garbage.collector';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {

  @Input() profile: Profile;
  @Input() repairer: Repairer;

  gc = new GarbageCollector('Repairer/Tabs/Profile/Edit-Profile')

  constructor(
    private repairerService: RepairerService,
    private modalController: ModalController,
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
      message: 'Đang lưu thay đổi thông tin cá nhân...',
      spinner: 'lines-small'
    });
    loading.present();

    const alert = await this.alertController.create({
      header: 'Lưu thay đổi',
      message: 'Thay đổi thông tin cá nhân thất bại!',
      buttons: ['Xong']
    });

    this.gc.collect('repairerService.updateProfile',
      this.repairerService.updateProfile(this.profile.id, {
        email: this.profile.email,
        fullName: this.profile.fullName,
        address: this.profile.address,
        phone: this.profile.phone
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
