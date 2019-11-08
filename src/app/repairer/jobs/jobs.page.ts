import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/dto/request';
import { Page } from 'src/app/dto/page';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  requests: Request[] = [];

  imageHost = imageHost;

  subscriptions: Subscription[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subscriptions.push(
      this.requestService.getAndFilterBy(['COMPLETED', 'FEEDBACK', 'CLOSED'])
        .subscribe((data: Page<Request>) => {
          this.requests = data.content;
        })
    );
  }

}
