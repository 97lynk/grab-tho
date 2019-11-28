import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RatingModule } from 'ng-starrating';
import { AgmDirectionModule } from 'agm-direction';
import { RequestDetailPage } from './request-detail/request-detail.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ShareModule } from 'src/app/util/share.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    PipeModule,
    AgmDirectionModule,
    AgmCoreModule,
    RatingModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      { path: '', component: RequestDetailPage }
    ]),
    ShareModule
  ],
  declarations: [
    RequestDetailPage
  ]
})
export class RequestDetailModule { }
