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
import { Subscription } from 'rxjs';
import { Repairer } from 'src/app/dto/repairer';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService,
    private repairerService: RepairerService,
    public navController: NavController
  ) {
  }


  ionViewWillEnter() {
    console.log('r home page');

    this.authService.loadProfile();

    this.recentRequest = [];
    this.histories = [];
    this.myRequests = [];
    this.subscriptions.push(
      this.requestService.getRequest('accepted')
        .subscribe((data: Request[]) => this.myRequests = data)
    );

    this.subscriptions.push(
      this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
        .subscribe((data: Page<RecentRequest>) => {
          this.recentRequest = data.content;
          const ids = this.recentRequest.map(r => r.id);
          this.data = this.recentRequest[0];
          this.repairerService.getHistoryInRequests(ids)
            .subscribe((histories: History[]) => {
              this.histories = histories;
            });
        })
    );
  }

  ngOnInit(): void {
    console.log('r home init');
    this.subscriptions.push(
      this.authService.registerSubscriber().subscribe((profile: Profile) => {
        console.log('OAuth2: authenticated, receive profile in home ', profile);
        this.profile = profile;

        if (profile) {
          this.subscriptions.push(
            this.repairerService.getRepairer(profile.id).subscribe((data: Repairer) => {
              this.repairer = data;
              console.log('repairer ', data);
            })
          );
        }
      }, () => console.log('Header: receive profile fail'))
    );
  }

  ngOnDestroy(): void {
    console.log('unsubscribe ', this.subscriptions.length);
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

  getHistory(requestId: number) {
    return this.histories.find(h => h.requestId === requestId && h.status === 'QUOTE');
  }

}
