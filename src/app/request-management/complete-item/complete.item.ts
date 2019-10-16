import { Component, OnInit, Input } from '@angular/core';
import { CompletedRequest, CompletedItemConfig } from 'src/app/dto/request';

@Component({
  selector: 'item-complete',
  templateUrl: './complete.item.html',
  styleUrls: ['./complete.item.scss'],
})
export class CompleteItem implements OnInit {

  @Input() data: CompletedRequest;

  @Input() config: CompletedItemConfig;

  constructor() { }

  ngOnInit() {
  }

}
