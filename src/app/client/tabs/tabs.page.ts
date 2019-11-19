import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/util/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  counterNoti: BehaviorSubject<number>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService) {
    this.counterNoti = notificationService.unseenCount;
  }

  ngOnInit() {
    this.authService.registerSubscriber().subscribe(profile => {
      if (profile) {
        this.notificationService.countUnseen(profile.username);
      }
    });
  }
}
