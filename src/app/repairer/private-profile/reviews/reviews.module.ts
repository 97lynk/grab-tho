import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RatingModule } from 'ng-starrating';
import { ReviewsComponent } from './reviews.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    LazyLoadImageModule,
    RatingModule,
  ],
  declarations: [ReviewsComponent],
  exports: [ReviewsComponent]
})
export class ReviewsComponentModule { }
