import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Profile } from 'selenium-webdriver/firefox';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';
import { RequestService } from '../service/request.service';
import { Page } from '../dto/page';
import { RecentRequest, AcceptedRequest } from '../dto/request';
import { imageHost } from '../util/file.util';


@Component({
  selector: 'grabtho-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  imageHost = imageHost;

  recentRequest: RecentRequest[] = [];

  options = {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 1000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  profile: Profile = null;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.authService.registerSubscriber().subscribe((profile: Profile) => {
      console.log('OAuth2: authenticated, receive profile ', profile);
      this.profile = profile;
    }, error => console.log('Header: receive profile fail'));
    this.authService.loadProfile();

    this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
      .subscribe((data: Page<RecentRequest>) => {
        this.recentRequest = data.content;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
