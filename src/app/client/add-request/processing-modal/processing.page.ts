import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'c-processing',
  templateUrl: './processing.page.html'
})
export class ProcessingModal implements OnInit {

  id = '';

  value = 0.0;
  buffer = 0.0;
  iconName = 'list';

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private storageService: StorageService,
    private requestService: RequestService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.updateProgessBar(0.0, 0.1, 'list');
    this.requestService.postRequest(this.updateProgessBar)
      .then((data: Request) => {
        console.log('Post a request success ', data);
        this.updateProgessBar(1.0, 1.0, 'cloud-upload');
      }).catch(error => {
        console.log('Failed to post request ', error);
      });
  }

  updateProgessBar = (value: number, buffer: number, iconName: string) => {
    this.value = value;
    this.buffer = buffer;
    this.iconName = iconName;
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.params.id;
  }


  close() {
    this.modalController.dismiss();
  }
}
