import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { showEnter, slideDownLeave } from '../custom-animation';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { RepairerModal } from '../repairer-modal/repairer.page';
import { ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { RepairerService } from 'src/app/service/repairer.service';
import { History } from 'src/app/dto/history';
import { Repairer } from 'src/app/dto/repairer';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-choose-repairer',
  templateUrl: './repairer-info.page.html',
  styleUrls: ['./repairer-info.page.scss']
})
export class RepairerInfo implements OnInit {

  hcmc = { lat: 10.8230989, lng: 106.6296638 };
  origin = { lat: 10.8734763, lng: 106.7357881 };
  destination = null;
  agmHeight = window.innerHeight - 200;
  modal: HTMLIonModalElement;
  quoted: History = null;
  repairer: Repairer;
  histories: History[];

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
    private location: PlatformLocation,
    private repairerService: RepairerService,
    private route: ActivatedRoute) {
  }

  ngOnInit() { }

  ionViewWillEnter() {
    const { repairerId, requestId } = this.route.snapshot.params;
    this.repairerService.getARepairerWithHistories(requestId, repairerId)
      .subscribe((data: { histories: History[], repairer: Repairer }) => {
        this.histories = data.histories;
        this.histories.forEach(h => {
          if (h.status === 'QUOTE') {
            this.quoted = h;
            return;
          }
        });
        this.histories.sort((a, b) => (+new Date(b.createAt) - +new Date(a.createAt)));

        this.repairer = data.repairer;
        this.presentModal();
      });
    this.getMyLocation();
    this.location.onPopState(() => this.modal.dismiss());
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
    this.modal = await this.modalController.create({
      component: RepairerModal,
      cssClass: 'repaier-info-modal',
      backdropDismiss: true,
      showBackdrop: true,
      enterAnimation: showEnter,
      leaveAnimation: slideDownLeave,
      componentProps: {
        histories: this.histories,
        repairer: this.repairer,
        quoted: this.quoted
      }
    });

    this.modal.onDidDismiss().then(modalData => {
      if (modalData.data != null) {
        this.destination = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
      }

    });

    return await this.modal.present();
  }

  goBack() {
    this.navController.back();
  }

}
