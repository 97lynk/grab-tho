import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  info: any;
  platform: any;
  platforms: any;

  ngOnInit(): void {
    this.getInfoPlatform();
  }

  async getInfoPlatform() {
    this.info = await Device.getInfo();
    this.info = JSON.stringify(this.info, null, 2);
    this.platform = Capacitor.platform;
    this.platforms = this.plt.platforms();
  }


  constructor(
    private plt: Platform,
    private navController: NavController) {
  }

  createRequestPage() {
    this.navController.navigateForward('requests/description');
  }
}
