import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivateProfilePage } from './private-profile.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RatingModule } from 'ng-starrating';
import { ReviewsComponentModule } from './reviews/reviews.module';
import { HistoriesComponentModule } from './histories/histories.module';

const routes: Routes = [
  {
    path: '',
    component: PrivateProfilePage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    LazyLoadImageModule,
    RatingModule,
    ReviewsComponentModule,
    HistoriesComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivateProfilePage]
})
export class PrivateProfilePageModule { }
