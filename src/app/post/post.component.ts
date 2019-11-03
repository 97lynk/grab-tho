import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Request } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { NAME_STATUS, COLOR_STATUS } from 'src/app/util/color-status';
import { Profile } from 'src/app/dto/profile';
import * as FastAverageColor from 'fast-average-color/dist';
const fac = new FastAverageColor();

@Component({
  selector: 'c-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  request: Request;
  @Input() poster: Profile;

  imageHost = imageHost;

  status = {
    color: 'primary',
    name: '',
  };

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    fadeEffect: {
      crossFade: true
    },
    slidesPerColumnFill: 'col'
  };

  constructor(
  ) { }

  @Input('request')
  set setRequest(request: Request) {
    if (!request) { return; }
    this.request = request;
    this.status = {
      name: NAME_STATUS[request.status],
      color: COLOR_STATUS[request.status]
    };
  }

  ngOnInit() { }

  ngOnDestroy(): void { }

  loadImage(img: HTMLImageElement, slide: any) {
    slide.el.style = `background-color: ${fac.getColor(img).rgba}`;
  }

}
