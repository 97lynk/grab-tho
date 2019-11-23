import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/service/authentication.service';
import { Profile } from 'src/app/dto/profile';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/dto/notification';
import { mergeMap } from 'rxjs/operators';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { GarbageCollector } from '../util/garbage.collector';

@Component({
  selector: 'page-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {

  counterNoti: BehaviorSubject<number>;
  notifications: Notification[];
  numOfNoti = 0;
  total = 0;
  profile: Profile;
  loading = false;
  gc = new GarbageCollector('Tabs/Notifications');
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;


  constructor(
    private navController: NavController,
    private notificationService: NotificationService,
    private authService: AuthService) {
    this.counterNoti = notificationService.unseenCount;
  }

  async ngOnInit() {
    this.loading = true;
    this.gc.collect('profile', this.authService.registerSubscriber().subscribe((profile: Profile) => {
      if (!profile) {
        this.loading = false;
        return;
      }

      this.profile = profile;
      this.notificationService.countUnseen(profile.username);
      const sub = this.notificationService.getNotification(this.profile.username, 15).subscribe((data: any[]) => {
        this.makeNotification(data);
        this.numOfNoti += 15;
      }, error => this.loading = false);
      this.gc.collect('notificationService.getNotification', sub);
    }, error => this.loading = false));
  }

  makeNotification(data: any[]) {
    this.notifications = [];
    data.forEach(d => {
      const noti: Notification = d.payload.val();
      noti.key = d.key;
      noti.thumbnail = noti.thumbnail.replace("192.168.1.10", "localhost");
      this.notifications.push(noti);
    });

    this.notifications.reverse();
    this.loading = false;
    console.log('notifications ', this.notifications);
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }

  seenNotification(key: string, id: any) {
    this.notificationService.seenNotification(key, this.profile.username);

    if (this.authService.isClient()) {
      this.navController.navigateRoot(['/requests', id]);
    } else {
      this.navController.navigateRoot(['/r/requests', id]);
    }
  }

  removeNotification(key: string) {
    this.notificationService.removeNotification(key, this.profile.username);
  }


  loadData(event) {
    if (this.notificationService.total <= this.numOfNoti) {
      event.target.complete();
      return;
    };

    this.numOfNoti += 15;
    const sub = this.notificationService.getNotification(this.profile.username, this.numOfNoti).subscribe((data: any[]) => {
      this.makeNotification(data);
      event.target.complete();

    }, error => this.loading = false);
    this.gc.collect('notificationService.getNotification', sub);

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
