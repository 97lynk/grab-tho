import { Component, OnInit } from '@angular/core';
import {
  RecentRequest,
  AcceptedRequest, AcceptedItemConfig,
  CompletedRequest, CompletedItemConfig,
  ClosedRequest, ClosedItemConfig
} from 'src/app/dto/request';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { GarbageCollector } from 'src/app/util/garbage.collector';

@Component({
  selector: 'grabtho-request-management',
  templateUrl: 'request-management.page.html',
  styleUrls: ['request-management.page.scss']
})
export class RequestManagementPage implements OnInit {

  recentRequest: RecentRequest[] = [];

  quotedRequest: RecentRequest[] = [];

  acceptedRequest: AcceptedRequest[] = [];

  completedRequest: CompletedRequest[] = [];

  closedRequest: CompletedRequest[] = [];

  acceptedItemConfig: AcceptedItemConfig = {
    color: 'secondary',
    iconName: 'checkmark-circle-outline',
  };

  completedItemConfig: CompletedItemConfig = {
    color: 'warning',
    iconName: 'checkbox-outline',
  };

  closedItemConfig: ClosedItemConfig = {
    color: 'medium',
    iconName: 'checkbox-outline',
  };

  seletedTab = 'recent';

  loadingData = false;

  gc = new GarbageCollector('Customer/Tabs/Request-management');

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void { }

  ionViewWillEnter() {
    this.changeTab('recent');
  }

  ionViewWillLeave() {
    this.gc.clearAll();
  }

  changeTab(tabIndex) {
    // console.log('change tab ', tabIndex);
    switch (tabIndex) {
      case 'recent':
        {
          const tempQuotedRequest = this.quotedRequest;
          const tempRecentRequest = this.recentRequest;
          this.quotedRequest = [];
          this.recentRequest = [];
          this.loadingData = true;

          this.gc.collect('requestService.getAndFilterBy([POSTED, RECEIVED, QUOTED]',
            this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
              .subscribe((data: Page<RecentRequest>) => {
                data.content.forEach(req => {
                  if (req.status === 'QUOTED') { this.quotedRequest.push(req); }
                  else { this.recentRequest.push(req); }
                });
                this.loadingData = false;

              }, error => {
                this.loadingData = false;
                this.quotedRequest = tempQuotedRequest;
                this.recentRequest = tempRecentRequest;
              })
          );
        }
        break;
      case 'accepted':
        {
          const tempAcceptedtRequest = this.acceptedRequest;
          this.acceptedRequest = [];
          this.loadingData = true;
          this.gc.collect('requestService.getAndFilterBy([ACCEPTED, WAITING]',
            this.requestService.getAndFilterBy(['ACCEPTED', 'WAITING'])
              .subscribe((data: Page<AcceptedRequest>) => {
                this.acceptedRequest = data.content;
                this.loadingData = false;
              }, error => {
                this.loadingData = false;
                this.acceptedRequest = tempAcceptedtRequest;
              })
          );
        }
        break;
      case 'completed':
        {
          const tempCompletedRequest = this.completedRequest;
          const tempClosedRequest = this.closedRequest;
          this.completedRequest = [];
          this.closedRequest = [];
          this.loadingData = true;
          this.gc.collect('requestService.getAndFilterBy([COMPLETED, FEEDBACK, CLOSED]',
            this.requestService.getAndFilterBy(['COMPLETED', 'FEEDBACK', 'CLOSED'])
              .subscribe((data: Page<CompletedRequest>) => {

                data.content.forEach(req => {
                  if (req.status === 'COMPLETED') { this.completedRequest.push(req); }
                  else { this.closedRequest.push(req); }
                });
                this.loadingData = false;
              }, error => {
                this.loadingData = false;
                this.completedRequest = tempCompletedRequest;
                this.closedRequest = tempClosedRequest;
              })
          );
        }
        break;
    }
  }
}
