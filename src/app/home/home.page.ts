import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Profile } from 'selenium-webdriver/firefox';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'grabtho-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

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
    private router: Router) {
  }

  ngOnInit(): void {
    this.authService.registerSubscriber().subscribe((profile: Profile) => {
      console.log('OAuth2: authenticated, receive profile ', profile);
      this.profile = profile;
    }, error => console.log('Header: receive profile fail'));
    this.authService.loadProfile();
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
