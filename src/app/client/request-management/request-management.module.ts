import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestManagementPage } from './request-management.page';
import { AgmCoreModule } from '@agm/core';
import { CompleteItem } from './complete-item/complete.item';
import { ClosedItem } from './closed-item/closed.item';
import { AcceptedItem } from './accepted-item/accepted.item';
import { RecentItem } from './recent-item/recent.item';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    PipeModule,
    RouterModule.forChild([{ path: '', component: RequestManagementPage }])
  ],
  declarations: [RequestManagementPage,
    RecentItem, CompleteItem, ClosedItem, AcceptedItem,
  ]
})
export class RequestManagementModule { }
