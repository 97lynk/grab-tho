import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-repairer',
  templateUrl: './find-repairer.component.html',
  styleUrls: ['./find-repairer.component.scss'],
})
export class FindRepairerComponent implements OnInit {

  repairers = [
    {
      name: 'Anh Nguyễn Văn Thanh',
      position: 'Thợ sửa chữa nước',
      time: '2 phút trước',
      distance: '2 km',
      avatar: '/assets/avatar-1.png',
      ok: true
    },
    {
      name: 'Anh Trần Bình Trọng',
      position: 'Thợ sửa chữa nước',
      time: '4 phút trước',
      distance: '9 km',
      avatar: '/assets/avatar-2.jpg',
      ok: false
    },
    {
      name: 'Anh Lê Văn Chí',
      position: 'Thợ sửa chữa nước',
      time: '23 phút trước',
      distance: '12 km',
      avatar: '/assets/avatar-3.jpg',
      ok: false
    }
  ];


  constructor() { }

  ngOnInit() { }

}
