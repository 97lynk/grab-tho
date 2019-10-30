import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RepairerInfo } from './repairer-info/repairer-info.page';
import { RepairerList } from './repairer-list/repairer-list.page.';
import { RepairerModal } from './repairer-modal/repairer.page';
import { RatingModule } from 'ng-starrating';
import { AgmDirectionModule } from 'agm-direction';
import { RequestDetailPage } from './request-detail/request-detail.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
      { path: '', component: RequestDetailPage },
      { path: 'repairers', component: RepairerList },
      { path: 'repairers/:repairerId', component: RepairerInfo }
    ])
  ],
  declarations: [
    RequestDetailPage,
    RepairerInfo, RepairerList, RepairerModal
  ],
  entryComponents: [
    RepairerModal
  ]
})
export class RequestDetailModule { }
