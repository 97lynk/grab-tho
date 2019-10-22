import { Component, OnInit } from '@angular/core';
import {
  RecentRequest,
  AcceptedRequest, AcceptedItemConfig,
  CompletedRequest, CompletedItemConfig,
  ClosedRequest, ClosedItemConfig
} from '../dto/request';
import { AuthService } from '../util/auth.service';
import { RequestService } from '../service/request.service';
import { Page } from '../dto/page';

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

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
      .subscribe((data: Page<RecentRequest>) => {
        data.content.forEach(req => {
          if (req.status === 'QUOTED') { this.quotedRequest.push(req); }
          else { this.recentRequest.push(req); }
        });
      });

    this.requestService.getAndFilterBy(['ACCEPTED', 'WAITING'])
      .subscribe((data: Page<AcceptedRequest>) => {
        this.acceptedRequest = data.content;
      });

    this.requestService.getAndFilterBy(['COMPLETED', 'FEEDBACK', 'CLOSED'])
      .subscribe((data: Page<CompletedRequest>) => {
        data.content.forEach(req => {
          if (req.status === 'CLOSED') { this.closedRequest.push(req); }
          else { this.completedRequest.push(req); }
        });
      });

  }

}
