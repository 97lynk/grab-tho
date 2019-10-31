import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/util/auth.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Page } from 'src/app/dto/page';
import { RecentRequest } from 'src/app/dto/request';
import { imageHost } from 'src/app/util/file.util';
import { Profile } from 'src/app/dto/profile';


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
      delay: 500000,
    },
    fadeEffect: {
      crossFade: true
    }
  };

  profile: Profile;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService) {
  }

  ionViewWillEnter() {

    this.authService.loadProfile();

    this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
      .subscribe((data: Page<RecentRequest>) => {
        this.recentRequest = data.content;
      });
  }

  ngOnInit(): void {
    this.authService.registerSubscriber().subscribe((profile: Profile) => {
      console.log('OAuth2: authenticated, receive profile in home ', profile);
      this.profile = profile;
    }, () => console.log('Header: receive profile fail'));

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
