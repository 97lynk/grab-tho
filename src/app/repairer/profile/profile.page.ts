import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepairerService } from 'src/app/service/repairer.service';
import { Repairer } from 'src/app/dto/repairer';
import { Request } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  requests: Request[] = [];

  imageHost = imageHost;

  repairer: Repairer;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
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
      this.requestService.getAndFilterBy(['COMPLETED', 'FEEDBACK', 'CLOSED'])
        .subscribe((data: Page<Request>) => {
          this.requests = data.content;
        })
    );
  }

}
