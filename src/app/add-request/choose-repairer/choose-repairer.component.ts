import { Component, OnInit } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { ModalController } from '@ionic/angular';
import { RepairerPage } from '../repairer-modal/repairer.page';
import { scaleUpLeave, scaleUpEnter } from './custom-animation';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-choose-repairer',
  templateUrl: './choose-repairer.component.html',
  styleUrls: ['./choose-repairer.component.scss']
})
export class ChooseRepairerComponent implements OnInit {

  hcmc = { lat: 10.8230989, lng: 106.6296638 };

  origin = { lat: 10.8734763, lng: 106.7357881 };
  destination = null;

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
    position: ControlPosition.TOP_LEFT,
    style: ZoomControlStyle.SMALL
  };

  constructor(public modalController: ModalController, private geolocation: Geolocation) { }

  ngOnInit() {
    this.presentModal();
    this.getMyLocation();
  }

  getMyLocation() {

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {

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
      enterAnimation: scaleUpEnter,
      leaveAnimation: scaleUpLeave
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

}
