import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestService } from 'src/app/service/request.service';
import { GarbageCollector } from 'src/app/util/garbage.collector';
import { Repairer } from 'src/app/dto/repairer';
import { Page } from 'src/app/dto/page';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit, OnDestroy {

  gc = new GarbageCollector('Repairer/Tabs/Profile/Histories');

  requests: Request[] = [];

  @Input() repairer: Repairer;

  constructor(
    private requestService: RequestService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.gc.collect('requestService.getRequestOfRepairer', this.requestService.getRequestOfRepairer(this.repairer.id, ['COMPLETED', 'FEEDBACK', 'CLOSED'])
      .subscribe((data: Page<Request>) => this.requests = data.content));
  }

  close() {
    this.modalController.dismiss({
      status: 'CLOSE'
    });
  }

  ngOnDestroy(): void {
    this.gc.clearAll();
  }
}
