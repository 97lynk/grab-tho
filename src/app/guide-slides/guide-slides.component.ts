import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'c-guide-slides',
  templateUrl: './guide-slides.component.html',
  styleUrls: ['./guide-slides.component.scss'],
})
export class GuideSlidesComponent implements OnInit {


  constructor(
    public authService: AuthService,
    private navController: NavController
  ) {

  }

  ngOnInit() { }

  clickLogo() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isClient()) {
        this.navController.navigateRoot('/tabs/home');
      } else {
        this.navController.navigateRoot('/r/tabs/home');
      }
    }
  }
}
