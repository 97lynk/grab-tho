import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Repairer } from 'src/app/dto/repairer';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { RequestService } from 'src/app/service/request.service';
import { RepairerService } from 'src/app/service/repairer.service';
import { forkJoin } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit, OnDestroy {

  rate: {
    data: {
      [param: string]: number
    },
    max: number,
    count: number
  } = null;

  requests: Request[] = [];

  gc = new GarbageCollector('Repairer/Tabs/Profile/Reviews');

  @Input() repairer: Repairer;

  loading = false;

  selectedTab = '1';

  isRepairer = false;

  constructor(
    private repairerService: RepairerService,
    private requestService: RequestService,
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isRepairer = !this.authService.isClient();

    if (!this.isRepairer) {
      this.selectedTab = '1';
      this.gc.collect('this.repairerService.getFeedback',
        this.repairerService.getFeedback().subscribe((data: Request[]) => this.requests = data));
    } else {
      this.loading = true;
      this.gc.collect('forkJoin',
        forkJoin([
          this.requestService.getRequestOfRepairer(this.repairer.id, ['COMPLETED', 'FEEDBACK', 'CLOSED']),
          this.repairerService.getRateRepairer(this.repairer.id)
        ]).subscribe((results: any[]) => {
          ///
          this.requests = results[0].content;

          /// 
          const rateScore = Object.values(results[1]) as number[];
          const max = Math.max(...rateScore);
          this.rate = {
            data: results[1],
            max: (max === 0) ? 1 : max,
            count: +rateScore.reduce((a, b) => (+a + +b))
          };

          this.loading = false;
        }, error => this.loading = false)
      );
    }
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }
}
