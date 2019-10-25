import { Component, OnInit, Input } from '@angular/core';
import { CompletedRequest, CompletedItemConfig } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'item-complete',
  templateUrl: './complete.item.html',
  styleUrls: ['./complete.item.scss'],
})
export class CompleteItem implements OnInit {

  imageHost = imageHost;

  @Input() data: CompletedRequest;

  @Input() config: CompletedItemConfig;

  constructor() { }

  ngOnInit() {
  }

}
