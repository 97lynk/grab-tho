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

  receiveRepairers: JoinedRepairer[] = [];

  quoteRepairers: JoinedRepairer[] = [];

  @Input('request-id')
  set requestId(value: number) {
    if (value !== null) {
      this._requestId = value;
      this.repairerService.getRepairerJoinedRequest(value, ['RECEIVE', 'QUOTE'])
        .subscribe((data: JoinedRepairer[]) => {
          data.forEach(r => {
            if (r.status === 'QUOTE') { this.quoteRepairers.push(r); }
            else { this.receiveRepairers.push(r); }
          });
        });
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
