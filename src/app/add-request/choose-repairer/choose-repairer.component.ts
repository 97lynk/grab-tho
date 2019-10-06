import { Component, OnInit } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { ModalController } from '@ionic/angular';
import { RepairerPage } from '../repairer-modal/repairer.page';
import { scaleUpLeave, scaleUpEnter } from './custom-animation';

@Component({
  selector: 'app-choose-repairer',
  templateUrl: './choose-repairer.component.html',
  styleUrls: ['./choose-repairer.component.scss']
})
export class ChooseRepairerComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  // zoomConfig: ZoomControlOptions = {
  //   position: ControlPosition.TOP_LEFT,
  //   style: ZoomControlStyle.SMALL
  // };

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.presentModal();
  }

  async presentModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: RepairerPage,
      cssClass: 'repaier-info-modal',
      backdropDismiss: true,
      enterAnimation: scaleUpEnter,
      leaveAnimation: scaleUpLeave
    });

    return await modal.present();
  }

}