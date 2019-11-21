import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { HomePage } from './home.page';
import { RequestItem } from './request-item/request.item';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ShareModule } from 'src/app/util/share.module';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    LazyLoadImageModule,
    ShareModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage, RequestItem]
})
export class HomeModule { }
