import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authentication.service';

@Component({
  selector: 'c-guide-slides',
  templateUrl: './guide-slides.component.html',
  styleUrls: ['./guide-slides.component.scss'],
})
export class GuideSlidesComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {}

}
