import { Component } from '@angular/core';
import { AuthService } from 'src/app/util/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/dto/profile';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'repairer-app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  counterNoti: BehaviorSubject<number>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService) {
    this.counterNoti = notificationService.unseenCount;
    this.authService.registerSubscriber().subscribe(profile => {
      if (profile) {
        notificationService.countUnseen(profile.username);
      }
    });
  }

}
