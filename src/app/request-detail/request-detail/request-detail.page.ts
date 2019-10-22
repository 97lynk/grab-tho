import { Component, OnInit } from '@angular/core';
import { RecentRequest, Request } from 'src/app/dto/request';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit {

  request: Request;
  imageHost = imageHost;
  loadingRepairerSection = false;
  statusToLoadRepairer = ['POSTED', 'RECEIVED', 'QUOTED'];
  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    const { requestId } = this.route.snapshot.params;
    this.requestService.getRequest(requestId)
      .subscribe((data: Request) => {
        this.request = data;
        this.loadingRepairerSection = this.statusToLoadRepairer.includes(this.request.status);
      });
  }

}
