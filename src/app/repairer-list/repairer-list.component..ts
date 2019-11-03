import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';
import { JoinedRepairer } from 'src/app/dto/repairer';
import { Profile } from 'src/app/dto/profile';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'c-repairer-list',
  templateUrl: './repairer-list.component.html',
  styleUrls: ['./repairer-list.component.scss'],
})
export class RepairerListComponent implements OnInit {

  repairers: JoinedRepairer[] = null;

  @Input() poster: Profile;

  @Input() highlightComment = {
    RECEIVE: false,
    QUOTE: false,
    ACCEPT: false,
    COMPLETE: false
  };

  @Input() quotedClass = '';
  @Input() acceptedClass = '';
  @Input() itemClickable = false;

  @Input('repairers')
  set setRepairers(repairers: JoinedRepairer[]) {
    console.log('set Repairers ', repairers);
    this.repairers = repairers;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private repairerService: RepairerService) {
  }

  ngOnInit() {

  }

  clickItem(repairerId: number) {
    if (this.itemClickable) {
      this.navController.navigateRoot(['repairers', repairerId], { relativeTo: this.activatedRoute });
    }
  }

  goBack() {
    this.navController.navigateBack('/tabs/request-management');
  }

}
