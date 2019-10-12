import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { RepairerPage } from '../repairer-modal/repairer.page';
import { showEnter, slideDownLeave } from './custom-animation';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-choose-repairer',
  templateUrl: './choose-repairer.component.html',
  styleUrls: ['./choose-repairer.component.scss']
})
export class ChooseRepairerComponent implements OnInit {

  hcmc = { lat: 10.8230989, lng: 106.6296638 };
  origin = { lat: 10.8734763, lng: 106.7357881 };
  destination = null;
  agmHeight = window.innerHeight - 200;

  markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png',
      label: 'iiii'
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      infoWindow:
        `<h4>Anh Nguyễn Văn Thanh<h4>`
    },
  };

  zoomConfig: ZoomControlOptions = {
    position: ControlPosition.TOP_RIGHT,
    style: ZoomControlStyle.SMALL
  };


  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private platform: Platform) {
  }

  ngOnInit() {
    this.presentModal();
    this.getMyLocation();
    // this.platform.ready().then((readySource) => {
    //   alert('Width: ' + this.platform.width() + ' Height: ' + this.platform.height() + '  '
    //   + screen.height + ' ' + screen.availHeight);
    // });
  }

  getMyLocation() {

    Geolocation.getCurrentPosition().then((pos: GeolocationPosition) => {
      this.origin = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      console.log(pos);
    }, (err: PositionError) => {
      console.log('error : ' + err.message);
    });
  }

  async presentModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: RepairerPage,
      cssClass: 'repaier-info-modal',
      backdropDismiss: true,
      showBackdrop: true,
      enterAnimation: showEnter,
      leaveAnimation: slideDownLeave
    });

    modal.onDidDismiss().then(modalData => {
      console.log('data', modalData);
      if (modalData.data != null) {
        this.destination = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
      }

    });

    return await modal.present();
  }

  goBack() {
    this.navController.navigateBack('/requests/find-repairer');
  }

}
