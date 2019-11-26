import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';

@Component({
  selector: 'app-transaction-histories',
  templateUrl: './transaction-histories.page.html',
  styleUrls: ['./transaction-histories.page.scss'],
})
export class TransactionHistoriesPage implements OnInit {

  constructor(
    private repairerService: RepairerService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

}
