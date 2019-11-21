import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/dto/request';

@Component({
  selector: 'c-processing',
  templateUrl: './processing.page.html'
})
export class ProcessingModal implements OnInit {

  id = null;
  value = 0.0;
  buffer = 0.0;
  iconName = 'list';
  color = 'primary';
  stepText = 'Đang gửi yêu cầu';

  status: {
    progressBarColor: string,
    textColor: any,
    text: string
  };

  STATUS = {
    processing: {
      progressBarColor: 'primary',
      textColor: '',
      text: 'Đang gửi yêu cầu'
    },
    success: {
      progressBarColor: 'success',
      textColor: { color: 'var(--ion-color-success-shade)' },
      text: 'Gửi yêu cầu thành công'
    },
    error: {
      progressBarColor: 'danger',
      textColor: { color: 'var(--ion-color-danger-shade)' },
      text: 'Gửi yêu cầu thất bại'
    }
  };


  constructor(
    private requestService: RequestService,
    private modalController: ModalController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.status = this.STATUS.processing;
    this.id = null;
    this.updateProgessBar(0.0, 0.1, 'list', 'Đang gửi yêu cầu...');
    this.status = this.STATUS.processing;
    this.requestService.postRequest(this.updateProgessBar)
      .then((data: Request) => {
        console.log('Post a request success ', data);
        this.updateProgessBar(1.0, 1.0, 'cloud-upload', 'Các thợ sẽ xem yêu cầu và cùng với bạn thương lượng để chốt chi phí');
        this.status = this.STATUS.success;
        this.id = data.id;
      }).catch(error => {
        this.updateProgessBar(this.value, 1.0, this.iconName, 'Đã có lỗi xảy ra trong quá trình gửi yêu cầu!');
        // this.color = 'danger';
        this.status = this.STATUS.error;
        console.log('Failed to post request ', error);
        this.id = null;
      });
  }

  updateProgessBar = (value: number, buffer: number, iconName: string, stepText: string) => {
    this.value = value;
    this.buffer = buffer;
    this.iconName = iconName;
    this.stepText = stepText;
  }

  ionViewWillEnter() {
  }


  forwardToRequestDetail() {
    if (this.id === null) { return; }

    this.navController.navigateForward(['/requests', this.id]);
    this.modalController.dismiss();
  }

  forwardToHome() {
    this.navController.navigateForward('/tabs/home');
    this.modalController.dismiss();
  }
}
