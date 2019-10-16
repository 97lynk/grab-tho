import { Component, OnInit, Input } from '@angular/core';
import { RecentRequest } from 'src/app/dto/request';

@Component({
  selector: 'item-recent',
  templateUrl: './recent.item.html',
  styleUrls: ['./recent.item.scss'],
})
export class RecentItem implements OnInit {

  @Input() data: RecentRequest;

  constructor() { }

  ngOnInit() {
  }

}
