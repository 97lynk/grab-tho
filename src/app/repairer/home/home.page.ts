import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/util/auth.service';
import { Router } from '@angular/router';
import { Profile } from 'src/app/dto/profile';
import { RequestService } from 'src/app/service/request.service';
import { RecentRequest, Request } from 'src/app/dto/request';
import { Page } from 'src/app/dto/page';
import { imageHost } from 'src/app/util/file.util';
import { RepairerService } from 'src/app/service/repairer.service';
import { History } from 'src/app/dto/history';
import { NavController } from '@ionic/angular';
import { Subscription, merge, forkJoin, BehaviorSubject } from 'rxjs';
import { Repairer, JoinedRepairer } from 'src/app/dto/repairer';
import { mergeMap, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';
import { LikeService } from 'src/app/service/like.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  imageHost = imageHost;

  profile: Profile;

  repairer: Repairer;

  recentRequest: RecentRequest[] = [];

  histories: History[] = [];

  data: RecentRequest;

  myRequests: Request[] = [];

  subscriptions: Subscription[] = [];

  requestIds: number[];

  dataRepairerList: any;

  countLike: BehaviorSubject<number>;

  constructor(
    private likeService: LikeService,
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService,
    private repairerService: RepairerService,
    public navController: NavController,
    private notificationService: NotificationService
  ) {
  }


  async ionViewWillEnter() {
    console.log('r home page');
    this.countLike = this.likeService.counter;
    const sub = this.authService.registerSubscriber().subscribe(profile => {
      this.profile = profile;
      if (profile) {
        this.likeService.countLike(this.profile.username, '');
        this.loadData();
      }
    });

    this.subscriptions.push(sub);
    this.authService.loadProfile();
  }

  loadData() {

    this.recentRequest = [];
    this.histories = [];
    this.myRequests = [];

    const sub = forkJoin([
      this.requestService.getRequest('accepted'),
      this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED']),
      this.repairerService.getRepairer(this.profile.id)
    ]).pipe(
      mergeMap((results: any[]) => {
        // 1st request
        this.myRequests = results[0];
        // 2nd request
        this.recentRequest = results[1].content;
        this.data = this.recentRequest[0];
        // 3rd request
        this.repairer = results[2];

        this.requestIds = this.myRequests.map(r => r.id);
        this.requestIds.push(...this.recentRequest.map(r => r.id));
        return this.repairerService.getHistoryInRequests(this.requestIds);
      })
    ).subscribe((histories: History[]) => {
      this.histories = histories;
      this.histories.sort((a, b) => (+new Date(b.createAt) - +new Date(a.createAt)));
      this.makeRepairerListData();
    });


    this.subscriptions.push(sub);

  }

  ionViewWillLeave() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('unsubscribe hoem repairer ', this.subscriptions);
    this.subscriptions.forEach(s => s.unsubscribe());
  }



  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

  makeRepairerListData() {
    this.dataRepairerList = {};
    this.requestIds.forEach((id: number) => {
      this.dataRepairerList[id + ''] = this.histories
        .filter(h => h.requestId === id)
        .map((h: History) => {
          return {
            fullName: this.profile.fullName,
            avatar: this.profile.avatar,
            point: h.point,
            status: h.status,
            createAt: h.createAt
          };
        });
    });

  }

}
