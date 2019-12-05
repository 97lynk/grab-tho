import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/dto/request';
import { Page } from 'src/app/dto/page';
import { imageHost } from 'src/app/util/file.util';
import { AlertController } from '@ionic/angular';
import { GarbageCollector } from 'src/app/util/garbage.collector';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit, OnDestroy {

  requests: Request[] = [];

  imageHost = imageHost;

  gc = new GarbageCollector('Repairer/Tabs/Jobs');

  filterStatuses = ['RECEIVE', 'QUOTE', 'ACCEPT', 'COMPLETE', 'FEEDBACK'];

  constructor(
    private requestService: RequestService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }

  ionViewWillEnter() {

  }

  loadData() {
    this.gc.collect('requestService.getJoinedRequestByRepairer',
      this.requestService.getJoinedRequestByRepairer(this.filterStatuses)
        .subscribe((data: Request[]) => {
          this.requests = data;
        })
    );
  }


  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Trạng thái yêu cầu',
      inputs: [
        {
          name: 'receivedStatus',
          type: 'checkbox',
          label: 'Đã xem',
          value: 'RECEIVE',
          checked: this.filterStatuses.includes('RECEIVE')
        },

        {
          name: 'quotedStatus',
          type: 'checkbox',
          label: 'Đã báo giá',
          value: 'QUOTE',
          checked: this.filterStatuses.includes('QUOTE')
        },

        {
          name: 'acceptedStatus',
          type: 'checkbox',
          label: 'Đã được chấp nhận',
          value: 'ACCEPT',
          checked: this.filterStatuses.includes('ACCEPT')
        },

        {
          name: 'completedStatus',
          type: 'checkbox',
          label: 'Đã hoàn thành',
          value: 'COMPLETE',
          checked: this.filterStatuses.includes('COMPLETE')
        },

        {
          name: 'feedbackStatus',
          type: 'checkbox',
          label: 'Đã đánh giá',
          value: 'FEEDBACK',
          checked: this.filterStatuses.includes('FEEDBACK')
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Đồng ý',
          handler: (data) => {
            // console.log('Confirm Ok ', data);
            this.filterStatuses = [...data];
            this.loadData();
          }
        }
      ]
    });

    await alert.present();
  }

}
