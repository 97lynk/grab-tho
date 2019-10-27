import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/util/auth.service';
import { Router } from '@angular/router';
import { Profile } from 'src/app/dto/profile';
import { RequestService } from 'src/app/service/request.service';
import { RecentRequest } from 'src/app/dto/request';
import { Page } from 'src/app/dto/page';
import { imageHost } from 'src/app/util/file.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  imageHost = imageHost;

  profile: Profile;

  recentRequest: RecentRequest[] = [];

  data: RecentRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService
  ) { }


  ionViewWillEnter() {

    this.authService.loadProfile();

    this.requestService.getAndFilterBy(['POSTED', 'RECEIVED', 'QUOTED'])
      .subscribe((data: Page<RecentRequest>) => {
        this.recentRequest = data.content;
        this.data = this.recentRequest[0];
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



}
