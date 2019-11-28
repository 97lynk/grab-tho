import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { RepairerService } from 'src/app/service/repairer.service';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { TransactionHistory } from 'src/app/dto/wallet';

@Component({
  selector: 'app-transaction-histories',
  templateUrl: './transaction-histories.page.html',
  styleUrls: ['./transaction-histories.page.scss'],
})
export class TransactionHistoriesPage implements OnInit, OnDestroy {

  gc = new GarbageCollector('Reapairer/Tabs/Profile/TransactionHistories');

  @Input() repairerId;

  histories: TransactionHistory[] = [];

  constructor(
    private repairerService: RepairerService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.gc.collect('repairerService.getTransactionHistories',
      this.repairerService.getTransactionHistories(this.repairerId)
        .subscribe((data: TransactionHistory[]) => this.histories = data))
  }

  ngOnDestroy() {
    this.gc.clearAll();
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

}
