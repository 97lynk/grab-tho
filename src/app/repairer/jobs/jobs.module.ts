import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobsPage } from './jobs.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [
  {
    path: '',
    component: JobsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JobsPage]
})
export class JobsPageModule { }
