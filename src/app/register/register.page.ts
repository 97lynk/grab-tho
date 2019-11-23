import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/authentication.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email = '';

  username = '';

  password = '';

  confirmPassword = '';

  noMatchPassword = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  async submitRegisterForm() {
    const alertSuccess = await this.alertController.create({
      header: 'Đăng kí',
      message: 'Tài khoản đã được đăng kí thành công',
      buttons: [
        {
          text: 'Đăng nhập',
          handler: () => this.navController.navigateRoot('/login')
        }
      ]
    });

    const alertFaild = await this.alertController.create({
      header: 'Đăng kí',
      message: 'Đăng kí tài khoản thất bại',
      buttons: ['Hủy']
    });

    const loading = await this.loadingController.create({
      message: 'Đăng kí tài khoản'
    });
    loading.present();

    this.authService.registerAccount(this.username, this.email, this.password)
      .subscribe(result => {
        loading.dismiss();
        alertSuccess.present();
      }, error => {
        loading.dismiss();
        alertFaild.message = `${alertFaild.message}: ${error.error.error_description}`; 
        alertFaild.present();
      });
  }

}
