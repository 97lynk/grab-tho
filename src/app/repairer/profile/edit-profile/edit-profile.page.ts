import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Repairer } from 'src/app/dto/repairer';
import { Profile } from 'src/app/dto/profile';
import { RepairerService } from 'src/app/service/repairer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  @Input() profile: Profile;
  @Input() repairer: Repairer;

  constructor(
    private repairerService: RepairerService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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
      message: 'Thông tin cá nhân thất bại!',
      buttons: ['Xong']
    });

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
    });
  }

}
