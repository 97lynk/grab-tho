import { Component, OnInit } from '@angular/core';
import { AuthService } from '../util/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username = '572338133504702';
  password = 'tuan';
  loading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.registerSubscriber().subscribe(profile => {
      this.router.navigateByUrl('/tabs');
    });
  }

  login() {
    this.loading = true;
    this.authService.loginWithUsernameAndPassword(this.username, this.password)
      .then(value => {
        console.log('OAuth2: login sucess ', value);
        this.loading = false;
        this.error = null;
        this.router.navigateByUrl('/tabs');
      })
      .catch(error => {
        console.log('OAuth2: login failed ', error);
        this.error = error.error.error_description;
        this.loading = false;
      });
  }

  loginWithFacebook() {
    this.loading = true;
    this.error = null;
    this.authService.loginWithFacebook()
      .then(data => {
        console.log('Fb login flow success');
        this.loading = false;
      }).catch(error => {
        console.log('Fb login flow failed', error);
        this.loading = false;
      });
  }


}
