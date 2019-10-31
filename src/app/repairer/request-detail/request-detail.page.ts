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
const fac = new FastAverageColor();

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit, OnDestroy {

  request: Request;
  profile: Profile;
  history: History;

  imageHost = imageHost;
  showRepairerSection = false;
  showReviewSection = false;
  showJoinedRepairer = false;
  statusToLoadRepairer = ['POSTED', 'RECEIVED', 'QUOTED'];
  statusToShowReview = ['COMPLETED', 'FEEDBACK', 'CLOSED'];
  statusToShowJoinedRepairer = [...this.statusToShowReview, 'ACCEPTED', 'WAITING'];

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

  loading: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private repairerService: RepairerService,
    private navController: NavController,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) { }

  async ionViewWillEnter() {
    const { requestId } = this.route.snapshot.params;
    this.authService.registerSubscriber().subscribe(data => this.profile = data);
    this.authService.loadProfile();

    this.loadRequest(requestId);
  }

  loadRequest(requestId: number | string) {
    const s = this.requestService.getRequest(requestId)
      .subscribe((data: Request) => {
        this.request = data;
        this.showRepairerSection = this.statusToLoadRepairer.includes(this.request.status);
        this.showReviewSection = this.statusToShowReview.includes(this.request.status);
        this.showJoinedRepairer = this.statusToShowJoinedRepairer.includes(this.request.status);
        this.status = {
          name: NAME_STATUS[data.status],
          color: COLOR_STATUS[data.status]
        };

        const ss = this.repairerService.getHistoryInRequests([data.id])
          .subscribe((histories: History[]) => {
            this.history = this.getHistory(histories, data.id);
          });

        this.subscriptions.push(ss);
      });

    this.subscriptions.push(s);
  }

  async ngOnInit() {
    const s = this.authService.registerSubscriber().subscribe(profile => this.profile = profile);
    this.subscriptions.push(s);
    this.authService.loadProfile();
    this.loading = await this.loadingController.create({
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


  submitQuotePrice(price: number) {
    this.loading.present();
    this.repairerService.quotingRequest(this.request.id, this.profile.id, price, 'QUOTE').subscribe(
      () => {
        this.loading.dismiss();
        this.successAlert(price);
      }, error => this.loading.dismiss());
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
