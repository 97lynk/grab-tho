import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Repairer } from 'src/app/dto/repairer';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { RequestService } from 'src/app/service/request.service';
import { RepairerService } from 'src/app/service/repairer.service';
import { forkJoin } from 'rxjs';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private repairerService: RepairerService,
    private requestService: RequestService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loading = true;
    this.gc.collect('forkJoin',
      forkJoin([
        this.repairerService.getRateRepairer(this.repairer.id),
        this.requestService.getRequestOfRepairer(this.repairer.id, ['COMPLETED', 'FEEDBACK', 'CLOSED']),
      ]).subscribe((results: any[]) => {
        /// 
        const rateScore = Object.values(results[0]) as number[];
        const max = Math.max(...rateScore);
        this.rate = {
          data: results[0],
          max: (max === 0) ? 1 : max,
          count: +rateScore.reduce((a, b) => (+a + +b))
        };
        ///
        this.requests = results[1].content;

        this.loading = false;
      }, error => this.loading = false)
    );
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
