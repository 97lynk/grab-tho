import { Component, OnInit, Input } from '@angular/core';
import { ClosedRequest, ClosedItemConfig } from 'src/app/dto/request';

@Component({
  selector: 'item-closed',
  templateUrl: './closed.item.html',
  styleUrls: ['./closed.item.scss'],
})
export class ClosedItem implements OnInit {

  @Input() data: ClosedRequest;

  @Input() config: ClosedItemConfig;

  constructor() { }

  ngOnInit() {
  }

}
