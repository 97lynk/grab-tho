import { Component, OnInit, OnDestroy } from '@angular/core';
import { Request } from 'src/app/dto/request';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { imageHost } from 'src/app/util/file.util';
import { Repairer, JoinedRepairer } from 'src/app/dto/repairer';
import { RepairerService } from 'src/app/service/repairer.service';
import { NAME_STATUS, COLOR_STATUS } from 'src/app/util/color-status';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import * as FastAverageColor from 'fast-average-color/dist';
import { AuthService } from 'src/app/util/auth.service';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/dto/profile';
const fac = new FastAverageColor();

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit, OnDestroy {

  request: Request;
  // repairer: Repairer = null;
  repairers: JoinedRepairer[];
  review = {
    rate: 0, comment: ''
  };

  imageHost = imageHost;
  showRepairerSection = true;
  showReviewSection = false;
  showJoinedRepairer = false;
  statusToLoadRepairer = ['POSTED', 'RECEIVED', 'QUOTED', 'ACCEPTED', 'COMPLETED', 'FEEDBACK'];
  statusToShowReview = ['COMPLETED', 'FEEDBACK', 'CLOSED'];
  statusToShowJoinedRepairer = [...this.statusToShowReview, 'ACCEPTED', 'WAITING'];

  subscriptions: Subscription[] = [];

  poster: Profile;

  status = {
    color: 'primary',
    name: '',
  };

  highlightComment = {
    RECEIVE: false,
    QUOTE: false,
    ACCEPT: false,
    COMPLETE: false
  };

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    fadeEffect: {
      crossFade: true
    },
    slidesPerColumnFill: 'col'
  };

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private repairerService: RepairerService,
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ionViewWillEnter() {
    const { requestId } = this.route.snapshot.params;
    this.loadData(requestId);
  }

  loadData(requestId) {
    this.highlightComment = {
      RECEIVE: false,
      QUOTE: false,
      ACCEPT: false,
      COMPLETE: false
    };

    this.requestService.getRequest(requestId)
      .subscribe((data: Request) => {
        this.request = data;
        this.poster = {
          avatar: data.userAvatar,
          fullName: data.userFullName
        };

        this.makeStatus(data.status);

        // if (data.repairerId) {
        //   this.repairerService.getRepairer(data.repairerId)
        //     .subscribe((r: Repairer) => this.repairer = r);
        // }
      });

    this.repairerService.getRepairerJoinedRequest(requestId, ['RECEIVE', 'QUOTE', 'ACCEPT', 'COMPLETE', 'FEEDBACK'])
      .subscribe((data: JoinedRepairer[]) => {
        this.repairers = data;
      }, error => this.repairers = []);
  }

  makeStatus(status: string) {
    this.showRepairerSection = this.statusToLoadRepairer.includes(status);
    this.showReviewSection = this.statusToShowReview.includes(status);
    this.showJoinedRepairer = this.statusToShowJoinedRepairer.includes(status);

    switch (status) {
      case 'QUOTED':
        this.highlightComment.QUOTE = true;
        break;
      case 'ACCEPTED':
        this.highlightComment.ACCEPT = true;
        break;
      case 'COMPLETED':
        this.highlightComment.COMPLETE = true;
        break;
    }

    this.status = {
      name: NAME_STATUS[status],
      color: COLOR_STATUS[status]
    };
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => element.unsubscribe());
    this.subscriptions = [];
  }

  loadImage(img: HTMLImageElement, slide: any) {
    slide.el.style = `background-color: ${fac.getColor(img).rgba}`;
  }

  goBack() {
    this.navController.navigateBack('/tabs/request-management');
  }

  async confirmPostReview() {
    const { requestId } = this.route.snapshot.params;

    const loading = await this.loadingController.create({
      message: 'Đánh giá thợ sửa chữa'
    });

    const alert = await this.alertController.create({
      header: 'Xác nhận',
      message: 'Gửi đánh giá?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            loading.present();
            this.requestService.postReview(this.request.id, this.request.comment, this.request.rate)
              .subscribe(data => {
                console.log('post review ', data);
                loading.dismiss();
                this.loadData(requestId);
              });
          }
        }
      ]
    });

    alert.present();
  }

  async acceptQuote(repairer: JoinedRepairer) {
    console.log('handle ', repairer);
    const loading = await this.loadingController.create({
      message: `Đang chấp nhận giá ${repairer.point} của ${repairer.fullName}`
    });

    const alert = await this.alertController.create({
      header: 'Xác nhận',
      message: `Chấp nhận giá ${repairer.point} của ${repairer.fullName}?`,
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Đồng ý',
          handler: () => {
            loading.present();
            this.requestService.acceptRepairerForRequest(this.request.id, repairer.id)
              .subscribe(data => {
                loading.dismiss();
                this.ionViewWillEnter();
              }, error => {
                loading.dismiss();
              });
          }
        }
      ]
    });

    alert.present();
  }

}
