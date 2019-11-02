import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';
import { JoinedRepairer } from 'src/app/dto/repairer';


@Component({
  selector: 'repairer-list',
  templateUrl: './repairer-list.page.html',
  styleUrls: ['./repairer-list.page.scss'],
})
export class RepairerList implements OnInit {

  _requestId: number;

  selectedTab = 'RECEIVE';

  repairers: JoinedRepairer[] = [];

  loading = false;

  @Input('request-id')
  set requestId(value: number) {
    if (value !== null) {
      this._requestId = value;
      this.loading = true;
      this.repairerService.getRepairerJoinedRequest(value, ['RECEIVE', 'QUOTE'])
        .subscribe((data: JoinedRepairer[]) => {
          this.repairers = data;
          this.loading = false;
        }, error => this.loading = false);
    }
  }

  constructor(
    private navController: NavController,
    private repairerService: RepairerService) {
  }

  ngOnInit() {

  }

  segmentChanged(event) {
    this.selectedTab = event.target.value;
    console.log(event.target.value);
  }

  goBack() {
    this.navController.navigateBack('/tabs/request-management');
  }

  click(e: Event) {
    console.log('click');
    e.stopPropagation();
  }
}
