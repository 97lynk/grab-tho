import { Component, OnInit, Input } from '@angular/core';
import { AcceptedRequest, AcceptedItemConfig } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'item-accepted',
  templateUrl: './accepted.item.html',
  styleUrls: ['./accepted.item.scss'],
})
export class AcceptedItem implements OnInit {

  @Input() data: AcceptedRequest;

  @Input() config: AcceptedItemConfig;

  imageHost = imageHost;

  constructor() { }

  ngOnInit() {
  }

}
