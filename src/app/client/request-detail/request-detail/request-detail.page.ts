import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecentRequest, Request } from 'src/app/dto/request';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { imageHost } from 'src/app/util/file.util';
import { Repairer } from 'src/app/dto/repairer';
import { RepairerService } from 'src/app/service/repairer.service';
import { NAME_STATUS, COLOR_STATUS } from 'src/app/util/color-status';
import { NavController } from '@ionic/angular';

import * as FastAverageColor from 'fast-average-color/dist';
import { AuthService } from 'src/app/util/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Profile } from 'src/app/dto/profile';
const fac = new FastAverageColor();

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit, OnDestroy {

  request: Request;
  repairer: Repairer = null;
  imageHost = imageHost;
  showRepairerSection = false;
  showReviewSection = false;
  showJoinedRepairer = false;
  statusToLoadRepairer = ['POSTED', 'RECEIVED', 'QUOTED'];
  statusToShowReview = ['COMPLETED', 'FEEDBACK', 'CLOSED'];
  statusToShowJoinedRepairer = [...this.statusToShowReview, 'ACCEPTED', 'WAITING'];

  subscriptions: Subscription[] = [];

  profile: Profile;

  status = {
    color: 'primary',
    name: '',
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
    private authService: AuthService,
    private requestService: RequestService,
    private repairerService: RepairerService,
    private navController: NavController
  ) { }

  ionViewWillEnter() {
    const { requestId } = this.route.snapshot.params;
    this.requestService.getRequest(requestId)
      .subscribe((data: Request) => {
        this.request = data;
        this.showRepairerSection = this.statusToLoadRepairer.includes(this.request.status);
        this.showReviewSection = this.statusToShowReview.includes(this.request.status);
        this.showJoinedRepairer = this.statusToShowJoinedRepairer.includes(this.request.status);
        this.status = {
          name: NAME_STATUS[data.status],
          color: COLOR_STATUS[data.status]
        };
        if (data.repairerId) {
          this.repairerService.getRepairer(data.repairerId)
            .subscribe((r: Repairer) => this.repairer = r);
        }
      });
  }

  ngOnInit() {
    const s = this.authService.registerSubscriber().subscribe(profile => this.profile = profile);
    this.subscriptions.push(s);
    this.authService.loadProfile();
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

}
