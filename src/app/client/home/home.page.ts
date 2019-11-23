import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { RecentRequest } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { Profile } from 'src/app/dto/profile';
import { GarbageCollector } from 'src/app/util/garbage.collector';


@Component({
  selector: 'grabtho-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  imageHost = imageHost;

  recentRequest: RecentRequest[] = [];

  loadingData = false;

  optionsForGuide = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 1500,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 500000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  profile: Profile;

  gc = new GarbageCollector('Customer/Tabs/Home');

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private requestService: RequestService) {
  }

  ionViewWillEnter() {

    this.loadingData = true;

    this.gc.collect('requestService.getAndFilterBy',
      this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
        .subscribe((data: Page<RecentRequest>) => {
          this.recentRequest = data.content;
          this.loadingData = false;
        }, error => this.loadingData = false)
    );

    this.gc.collect('profile',
      this.authService.registerSubscriber().subscribe((profile: Profile) => {
        console.log('OAuth2: authenticated, receive profile in home ', profile);
        this.profile = profile;
      }, () => console.log('Header: receive profile fail'))
    );

  }

  ionViewWillLeave() {
    this.gc.clearAll();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ionViewWillLeave();
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
