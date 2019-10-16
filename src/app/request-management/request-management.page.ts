import { Component, OnInit } from '@angular/core';
import {
  RecentRequest,
  AcceptedRequest, AcceptedItemConfig,
  CompletedRequest, CompletedItemConfig,
  ClosedRequest, ClosedItemConfig
} from '../dto/request';

@Component({
  selector: 'grabtho-request-management',
  templateUrl: 'request-management.page.html',
  styleUrls: ['request-management.page.scss']
})
export class RequestManagementPage implements OnInit {

  recentRequest: RecentRequest = {
    noQuote: 1,
    noReceive: 4,
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    desImages: [
      '/assets/problem-1.jpg',
      '/assets/problem-2.jpg',
      '/assets/problem-3.jpg'
    ],
    desText: 'La phông bị hư khoảng 10 đến 12 tấm, la phông thạch cao...',
    createAt: new Date(2019, 8, 23, 14, 20)
  };

  recentRequest2: RecentRequest = {
    noQuote: 0,
    noReceive: 0,
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    desImages: [
      'https://thietbivesinhvn.com.vn/Image/Upload/Aqualem-FT954.jpg'
    ],
    desText: 'Lavabo của tôi bị nghẹt, có thể cần phải thay. Vòi nước cũng bị rỉ...',
    createAt: new Date(2019, 8, 23, 14, 20)
  };

  acceptedRequest: AcceptedRequest = {
    repairerName: 'a. Trần Bình Trọng',
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    coin: 250,
    desImages: [
      'http://maychasandon.com/wp-content/uploads/2018/08/san-nha-bi-tham-nuoc-nguyen-nhan-va-giai-phap-khac-phuc-02.jpg'
    ],
    desText: 'Sàn nhà gạch bông bị bễ khoảng 8 9 ô gạch',
    createAt: new Date(2019, 8, 10, 10, 21)
  };

  acceptedItemConfig: AcceptedItemConfig = {
    color: 'secondary',
    iconName: 'checkmark-circle-outline',
  };

  completedRequest: CompletedRequest = {
    repairerName: 'a. Lê Duy Chí',
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    coin: 250,
    desImages: [
      'https://noithatmanhhe.vn/media/3246/phong-tro-cho-vo-chong-moi-cuoi.jpg'
    ],
    desText: 'Cầ thợ qua nhà lắp máy lạnh Daikin',
    createAt: new Date(2019, 8, 1, 13, 20)
  };

  completedItemConfig: CompletedItemConfig = {
    color: 'warning',
    iconName: 'checkbox-outline',
  };

  closedRequest: ClosedRequest = {
    repairerName: 'a. Nguyễn Văn Hoàng',
    address: '23 Lê Thị Hoa, Thủ Đức, Hồ Chí Minh, Việt Nam',
    coin: 250,
    rating: 4.5,
    desImages: [
      'https://uwosh.edu/facilities/wp-content/uploads/sites/105/2018/09/no-photo.png'
    ],
    desText: 'Tôi cần lắp hệ thống nước cho vườn trước nhà',
    createAt: new Date(2019, 7, 21, 18, 20)
  };

  closedItemConfig: ClosedItemConfig = {
    color: 'medium',
    iconName: 'checkbox-outline',
  };

  ngOnInit(): void {
  }

}
