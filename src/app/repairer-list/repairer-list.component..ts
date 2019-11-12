import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';
import { JoinedRepairer } from 'src/app/dto/repairer';
import { Profile } from 'src/app/dto/profile';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../dto/request';
import { RequestService } from '../service/request.service';


@Component({
  selector: 'c-repairer-list',
  templateUrl: './repairer-list.component.html',
  styleUrls: ['./repairer-list.component.scss'],
})
export class RepairerListComponent implements OnInit {

  repairers: JoinedRepairer[] = null;

  @Output() acceptQuote = new EventEmitter<JoinedRepairer>();


  @Input() poster: Profile;

  @Input() highlightComment = {
    RECEIVE: false,
    QUOTE: false,
    ACCEPT: false,
    COMPLETE: false
  };

  @Input() itemClickable = false;

  @Input() request: Request;

  @Input('repairers')
  set setRepairers(repairers: JoinedRepairer[]) {
    console.log('set Repairers ', repairers);
    this.repairers = repairers;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private repairerService: RepairerService,
    private requestService: RequestService) {
  }

  ngOnInit() {

  }

  clickItem(repairerId: number) {
    if (this.itemClickable) {
      this.navController.navigateRoot(['/repairers', repairerId], { relativeTo: this.activatedRoute });
    }
  }

  goBack() {
    this.navController.navigateBack('/tabs/request-management');
  }

}
