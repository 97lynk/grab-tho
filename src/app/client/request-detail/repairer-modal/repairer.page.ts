import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Repairer } from 'src/app/dto/repairer';
import { History } from 'src/app/dto/history';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';

@Component({
    selector: 'repairer',
    templateUrl: './repairer.page.html',
})
export class RepairerModal implements OnInit {

    @Input() histories: History[];
    @Input() repairer: Repairer;
    @Input() quoted: History = null;

    constructor(
        public modalController: ModalController,
        private requestService: RequestService,
        private router: Router) {
    }

    ngOnInit() {
    }


    dismiss() {
        this.modalController.dismiss(
            { lat: 10.7605046, lng: 106.6749102 }
        );
    }

    accept() {
        this.requestService.acceptRepairerForRequest(this.quoted.requestId, this.quoted.repairerId)
            .subscribe(data => {
                console.log('accept ', data);
                this.modalController.dismiss();
            });
    }
}
