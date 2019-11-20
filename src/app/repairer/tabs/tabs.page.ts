import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/util/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Profile } from 'src/app/dto/profile';
import { mergeMap } from 'rxjs/operators';
import { MessagingService } from 'src/app/service/message.service';
import { auth } from 'firebase';
import { GarbageCollector } from 'src/app/util/garbage.collector';

@Component({
  selector: 'repairer-app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {

  counterNoti: BehaviorSubject<number>;

  gc = new GarbageCollector();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private messagingService: MessagingService) {
    this.counterNoti = notificationService.unseenCount;
  }

  ngOnInit() {
    this.gc.collect('profile', this.authService.registerSubscriber().subscribe(profile => {
      if (!profile) return;

      this.gc.collect('messagingService.requestPermission', this.messagingService.requestPermission(profile.username));
      this.gc.collect('messagingService.receiveMessage', this.messagingService.receiveMessage());

      this.notificationService.countUnseen(profile.username);
    }));
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
    this.messagingService.destroy();
  }

}
