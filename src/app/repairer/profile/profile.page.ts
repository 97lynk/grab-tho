import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairerService } from 'src/app/service/repairer.service';
import { Repairer } from 'src/app/dto/repairer';
import { Request } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

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

  constructor(
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
    const { repairerId } = this.route.snapshot.params;
    this.subscriptions.push(
      this.repairerService.getRepairer(repairerId).subscribe((data: Repairer) => {
        this.repairer = data;
      })
    );

    this.subscriptions.push(
      this.repairerService.getRateRepairer(repairerId).subscribe((data: { [param: string]: number }) => {
        const rateScore = Object.values(data) as number[];
        const max = Math.max(...rateScore);
        this.rate = {
          data,
          max: (max === 0) ? 1 : max,
          count: +rateScore.reduce((a, b) => (+a + +b))
        };

        console.log(this.rate, this.rate.data['5.0']);
      })
    );

    this.subscriptions.push(
      this.requestService.getRequestOfRepairer(repairerId, ['COMPLETED', 'FEEDBACK', 'CLOSED'])
        .subscribe((data: Page<Request>) => {
          this.requests = data.content;
        })
    );

  }

  goBack() {
    this.navController.back();
  }

}
