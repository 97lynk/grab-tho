import { Component, OnInit, Input } from '@angular/core';
import { ClosedRequest, ClosedItemConfig } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'item-closed',
  templateUrl: './closed.item.html',
  styleUrls: ['./closed.item.scss'],
})
export class ClosedItem implements OnInit {

  imageHost = imageHost;

  @Input() data: ClosedRequest;

  @Input() config: ClosedItemConfig;

  constructor() { }

  ngOnInit() {
  }

}
