import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RatingModule } from 'ng-starrating';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoriesComponent } from './histories/histories.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    // children: [
    //   {
    //     path: 'reviews',
    //     loadChildren: './reviews/reviews.module#ReviewsModule'
    //   }
    // ]
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
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage, ReviewsComponent, HistoriesComponent]
})
export class ProfilePageModule { }
