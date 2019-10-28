import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RequestDetailPage } from './request-detail.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RatingModule } from 'ng-starrating';

const routes: Routes = [
  {
    path: '',
    component: RequestDetailPage
  }
];

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RequestDetailPage]
})
export class RequestDetailPageModule {}
