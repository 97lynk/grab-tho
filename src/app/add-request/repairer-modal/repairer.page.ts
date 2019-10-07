import { Component, OnInit } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'repairer',
    templateUrl: './repairer.page.html',
})
export class RepairerPage implements OnInit {

    constructor(public modalController: ModalController) { }

    ngOnInit() {
    }


    dismiss() {
        this.modalController.dismiss(
            { lat: 10.7605046, lng: 106.6749102 }
        );
    }
}
