import { Component, OnInit } from '@angular/core';
import { RecentRequest } from 'src/app/dto/request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit {

  recentRequest: RecentRequest = {
    noQuote: 1,
    noReceive: 3,
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    desImages: [
      '/assets/problem-1.jpg',
      '/assets/problem-2.jpg',
      '/assets/problem-3.jpg'
    ],
    desText: 'La phông bị hư khoảng 10 đến 12 tấm, la phông thạch cao, cần thay thế hay thay luôn toàn bộ',
    createAt: new Date(2019, 8, 21, 16, 22)
  };

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 1000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
