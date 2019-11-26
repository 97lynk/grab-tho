import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { imageHost } from 'src/app/util/file.util';
import { Request } from 'src/app/dto/request';
import { Repairer } from 'src/app/dto/repairer';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/dto/page';
import { RepairerService } from 'src/app/service/repairer.service';

@Component({
  selector: 'c-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {

  imageHost = imageHost;

  @Input() requests: Request[] = [];

  @Input() repairer: Repairer;

  @Input() rate: {
    data: {
      [param: string]: number
    },
    max: number,
    count: number
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
