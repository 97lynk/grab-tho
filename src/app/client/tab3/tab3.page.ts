import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MessagingService } from '../../service/message.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../util/auth.service';
import { Profile } from '../../dto/profile';
import { environment } from '../../../environments/environment';

const { LocalNotifications, PushNotifications, Device, OAuth2Client } = Plugins;


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy, AfterViewInit {

  // message: BehaviorSubject<any>;

  // subscriptions: Subscription[] = [];

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    // console.log('ngOnit tab3');

    // this.message = this.messagingService.currentMessage;
    // this.subscriptions.push(
    //   this.messagingService.requestPermission(this.authService.getUsername()),
    //   this.messagingService.receiveMessage()
    // );
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(s => s.unsubscribe());
    // this.messagingService.destroy();
  }

  async ngAfterViewInit() {
  }

}
