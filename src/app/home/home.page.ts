import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  ngOnInit(): void {
  }


  constructor(
    private navController: NavController) {
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
