import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NavController, IonItemSliding } from '@ionic/angular';
import { JoinedRepairer } from 'src/app/dto/repairer';
import { Profile } from 'src/app/dto/profile';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../dto/request';


@Component({
  selector: 'c-repairer-list',
  templateUrl: './repairer-list.component.html',
  styleUrls: ['./repairer-list.component.scss'],
})
export class RepairerListComponent implements OnInit, AfterViewChecked {

  repairers: JoinedRepairer[] = null;

  // @ViewChildren('item') components:QueryList<IonItemSliding>;

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
    this.repairers = repairers;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    
    // console.log(this.components.toArray());
    // this.components.toArray().forEach((c: IonItemSliding) => c.open('end'));
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
