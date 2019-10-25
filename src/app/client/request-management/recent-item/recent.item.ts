import { Component, OnInit, Input } from '@angular/core';
import { RecentRequest } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'item-recent',
  templateUrl: './recent.item.html',
  styleUrls: ['./recent.item.scss'],
})
export class RecentItem implements OnInit {

  imageHost = imageHost;

  @Input() data: RecentRequest;

  constructor() { }

  ngOnInit() {
  }

}
