import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestManagementPage } from './request-management.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    RouterModule.forChild([{ path: '', component: RequestManagementPage }])
  ],
  declarations: [RequestManagementPage]
})
export class RequestManagementModule { }
