import { Component, OnInit, OnDestroy } from '@angular/core';
import { imageHost } from 'src/app/util/file.util';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { RepairerService } from 'src/app/service/repairer.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { NAME_STATUS, COLOR_STATUS } from 'src/app/util/color-status';
import { Request } from 'src/app/dto/request';
import * as FastAverageColor from 'fast-average-color/dist';
import { AuthService } from 'src/app/util/auth.service';
import { Profile } from 'src/app/dto/profile';
import { History } from 'src/app/dto/history';
import { Subscription } from 'rxjs';
import { JoinedRepairer } from 'src/app/dto/repairer';
const fac = new FastAverageColor();

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit, OnDestroy {

  request: Request;
  poster: Profile;
  me: Profile;
  repairers: JoinedRepairer[];

  highlightComment = {
    RECEIVE: false,
    QUOTE: false,
    ACCEPT: false,
    COMPLETE: false
  };

  loading = true;

  imageHost = imageHost;
  showRepairerSection = false;
  showInputQuote = false;
  statusToLoadRepairer = ['POSTED', 'RECEIVED', 'QUOTED', 'ACCEPTED', 'COMPLETED', 'FEEDBACK', 'CLOSED'];
  statusToStyling = ['QUOTED', 'ACCEPTED'];
  statusToQuote = ['POSTED', 'RECEIVED', 'QUOTED'];

  subscriptions: Subscription[] = [];

  status = {
    color: 'primary',
    name: '',
  };

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  loadingPopup: any;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private repairerService: RepairerService,
    private navController: NavController,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) { }

  async ionViewWillEnter() {
    const { requestId } = this.route.snapshot.params;
    this.subscriptions.push(
      this.authService.registerSubscriber().subscribe(data => this.me = data)
    );
    this.authService.loadProfile();

    this.loadRequest(requestId);
  }

  loadRequest(requestId: number | string) {
    this.highlightComment = {
      RECEIVE: false,
      QUOTE: false,
      ACCEPT: false,
      COMPLETE: false
    };
    this.loading = true;
    this.subscriptions.push(
      this.requestService.getRequest(requestId)
        .subscribe((data: Request) => {
          this.request = data;
          this.poster = {
            avatar: data.userAvatar,
            fullName: data.userFullName
          };

          this.makeStatus(data.status);

          this.loading = false;

          this.subscriptions.push(
            this.repairerService.getRepairerJoinedRequest(requestId,
              ['RECEIVE', 'QUOTE', 'ACCEPT', 'COMPLETE', 'FEEDBACK'])
              .subscribe((data2: JoinedRepairer[]) => {
                this.repairers = data2;
                if (data2.find(r => r.status === 'QUOTE')) {
                  this.showInputQuote = false;
                }
              }, error => this.repairers = [])
          );
        }, error => this.loading = false)
    );

  }

  makeStatus(status: string) {
    this.showRepairerSection = this.statusToLoadRepairer.includes(status);
    this.showInputQuote = this.statusToQuote.includes(status);

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

  async ngOnInit() {
    this.loadingPopup = await this.loadingController.create({
      message: 'Đang báo giá',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => element.unsubscribe());
    this.subscriptions = [];
  }

  async successAlert(price) {
    const { requestId } = this.route.snapshot.params;
    this.loadRequest(requestId);
    const alert = await this.alertController.create({
      header: 'Báo giá',
      message: 'Bạn đã báo giá thành công với giá ' + price,
      buttons: [
        { text: 'Xong' }
      ]
    });

    await alert.present();
  }


  submitQuotePrice(price) {
    this.loadingPopup.present();
    this.repairerService.actionRequest(this.request.id, this.me.id, price, 'QUOTE').subscribe(
      () => {
        this.loadingPopup.dismiss();
        this.showInputQuote = false;
        this.successAlert(price);
      }, error => this.loadingPopup.dismiss());
  }

  async completeRequest() {
    const { requestId } = this.route.snapshot.params;

    const loading = await this.loadingController.create({
      message: 'Xác nhận hoàn thành công việc'
    });

    const alert = await this.alertController.create({
      header: 'Xác nhận',
      message: 'Xác nhận hoàn thành công việc?',
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
            this.repairerService.actionRequest(this.request.id, this.me.id, 0, 'COMPLETE').subscribe(
              () => {
                loading.dismiss();
                this.loadRequest(requestId);
              });
          }
        }
      ]
    });

    await alert.present();
  }


  loadImage(img: HTMLImageElement, slide: any) {
    slide.el.style = `background-color: ${fac.getColor(img).rgba}`;
  }

  goBack() {
    this.navController.back();
  }

  getHistory(histories: History[], requestId: number) {
    return histories.find(h => h.requestId === requestId && h.status === 'QUOTE');
  }

}
