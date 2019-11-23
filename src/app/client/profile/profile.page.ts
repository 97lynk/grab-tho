import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MessagingService } from '../../service/message.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../service/authentication.service';
import { Profile } from '../../dto/profile';
import { environment } from '../../../environments/environment';
import { GarbageCollector } from 'src/app/util/garbage.collector';

const { LocalNotifications, PushNotifications, Device, OAuth2Client } = Plugins;


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ClientProfilePage implements OnInit, OnDestroy, AfterViewInit {

  gc = new GarbageCollector();

  profile: Profile;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    console.log('ngOnit tab3');
    this.gc.collect('profile', this.authService.registerSubscriber().subscribe(p => this.profile = p))
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }

  async ngAfterViewInit() {
  }

}
