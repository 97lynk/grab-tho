import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/util/auth.service';
import { Profile } from 'src/app/dto/profile';
import { Observable, Subscription } from 'rxjs';
import { Notification } from 'src/app/dto/notification';
import { mergeMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {

  notifications: Notification[];
  profile: Profile;
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(
    private navController: NavController,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.loading = true;
    this.subscriptions.push(
      this.authService.registerSubscriber().subscribe((profile: Profile) => {
        if (profile) {
          this.profile = profile;
          const sub = this.notificationService.getNotification(this.profile.username).subscribe((data: any[]) => {
            this.notifications = [];
            data.forEach(d => {
              const noti: Notification = d.payload.val();
              noti.key = d.key;
              this.notifications.push(noti);
            });
            console.log('notifi ', this.notifications);
            this.notifications.reverse();
            this.loading = false;
          }, error => this.loading = false);
          this.subscriptions.push(sub);
        } else {
          this.loading = false;
        }
      }, error => this.loading = false)
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  seenNotification(key: string, id: any) {
    this.notificationService.seenNotification(key, this.profile.username);

    if (this.authService.isClient()) {
      this.navController.navigateRoot(['/requests', id]);
    } else {
      this.navController.navigateRoot(['/r/requests', id]);
    }
  }

}
