import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username = '';
  password = '';
  loading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('login page');
    if (this.authService.isAuthenticated()) {
      if (this.authService.isClient()) {
        this.router.navigateByUrl('/tabs');
      } else {
        this.router.navigateByUrl('/r/tabs');
      }
    }
  }

  login() {
    this.loading = true;
    this.authService.loginWithUsernameAndPassword(this.username, this.password)
      .then(value => {
        console.log('OAuth2: login sucess ', value);
        this.loading = false;
        this.error = null;
        if (this.authService.isClient()) {
          this.router.navigateByUrl('/tabs');
        } else {
          this.router.navigateByUrl('/r/tabs');
        }
      })
      .catch(error => {
        this.loading = false;
        alert('OAuth2: login failed ' + JSON.stringify(error) );
        this.error = error.error.error_description;
      });
  }

  loginWithFacebook() {
    this.loading = true;
    this.error = null;
    this.authService.loginWithFacebook()
      .then(() => {
        this.authService.refreshTokenWithoutLoadProfile()
          .then(data => {
            console.log('Fb login flow success');
            this.router.navigateByUrl('/tabs');
            this.loading = false;
          });
      }).catch(error => {
        console.log('Fb login flow failed', error);
        this.loading = false;
      });
  }

  async loginWithMockToken() {
    localStorage.setItem('refresh_token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0dWFudHVhbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiXSwianRpIjoiZGQ5ZGZhYTktZmNhZC00N2E1LWI5ZDktZmY0MGNkOGZkNzRkIiwiY2xpZW50X2lkIjoiY2xpZW50SWRQYXNzd29yZCIsInNjb3BlIjpbInJlYWQiXSwiYXRpIjoiNzAzZDA3NzYtZTc5Zi00NmI4LTg0NTAtZTAxNGZkOTI2Y2ViIn0.WB4YHApPG1XU23jrPIvyXRZK-6gmdKdYVDorRqxhfA_ZWZl-hW4EdOXXXcFjoVzNWd5xOcgHCzWeX80TujYLs7VfV53IVG_hbj85cfMG8l1APkd3weaqljE0xO-dovHEV7JEu_imrYLutGjZrQ3GTRsKF5OUfjqVpvcwv1REuQqJfVkq-7KO6vTDagFn7bIQymziHkarjbE6t1x4H4K0fMaK7kyUamBBw6bP4S7NsKlGRkT_D9GepWKLotL1HX8MptzGhOrV-S1BBmO2taXcLF8Tz43Z-PlpUlBcSK9-mealMBAwVaymeSSIhg4vrW-VVphJJjywx5hfuUPOTERRBg');
    this.authService.refreshTokenWithoutLoadProfile()
      .then(data => {
        console.log('loginWithMockToken flow success');
        this.router.navigateByUrl('/tabs');
        this.loading = false;
        this.authService.loadProfile();
      });
  }
}
