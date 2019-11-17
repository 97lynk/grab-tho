import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { PipeModule } from 'src/app/pipe/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    RouterModule.forChild(routes)
  ],
  providers: [AsyncPipe],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
