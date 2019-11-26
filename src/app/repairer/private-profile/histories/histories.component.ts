import { Component, OnInit, Input } from '@angular/core';
import { Request } from 'src/app/dto/request';

@Component({
  selector: 'c-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
})
export class HistoriesComponent implements OnInit {

  @Input()
  requests: Request[] = [];
  
  constructor() { }

  ngOnInit() {}

}
