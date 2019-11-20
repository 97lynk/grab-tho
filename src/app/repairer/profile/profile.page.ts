import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairerService } from 'src/app/service/repairer.service';
import { Repairer } from 'src/app/dto/repairer';
import { Request } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { Subscription, forkJoin, BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LikeService } from 'src/app/service/like.service';
import { AuthService } from 'src/app/util/auth.service';
import { Profile } from 'src/app/dto/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  me: Profile;

  requests: Request[] = [];

  selectedTab = 1;

  imageHost = imageHost;

  repairer: Repairer;

  subscriptions: Subscription[] = [];

  rate: {
    data: {
      [param: string]: number
    },
    max: number,
    count: number
  } = null;

  loading = false;
  countLike: BehaviorSubject<number>;
  liked: any;

  constructor(
    private authService: AuthService,
    private likeService: LikeService,
    private route: ActivatedRoute,
    private navController: NavController,
    private repairerService: RepairerService,
    private requestService: RequestService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ionViewWillEnter() {
    this.countLike = this.likeService.counter;
    this.liked = this.likeService.liked;

    this.subscriptions.push(
      this.authService.registerSubscriber().subscribe(p => {
        ///
        this.me = p;
        this.loadRepairerData();
      })
    );

    this.subscriptions.push(
      this.likeService.liked.subscribe(k => this.liked = k)
    );
  }

  loadRepairerData() {
    const { repairerId } = this.route.snapshot.params;
    this.loading = true;

    this.subscriptions.push(
      forkJoin([
        this.repairerService.getRepairer(repairerId),
        this.repairerService.getRateRepairer(repairerId),
        this.requestService.getRequestOfRepairer(repairerId, ['COMPLETED', 'FEEDBACK', 'CLOSED']),
      ]).subscribe((results: any[]) => {
        ///
        this.repairer = results[0];
        /// 
        const rateScore = Object.values(results[1]) as number[];
        const max = Math.max(...rateScore);
        this.rate = {
          data: results[1],
          max: (max === 0) ? 1 : max,
          count: +rateScore.reduce((a, b) => (+a + +b))
        };
        ///
        this.requests = results[2].content;
        ///
        this.likeService.countLike(this.repairer.username, this.me.username);
        this.loading = false;
      }, error => this.loading = false)
    );
  }

  goBack() {
    this.navController.back();
  }

  async likeRepairer() {
    if (!this.liked) {
      this.likeService.like(this.repairer.username, this.me.username, this.me.fullName);
    } else {
      this.likeService.unlike(this.repairer.username, this.liked.key);
    }
  }

}
