import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairerProfilePage } from './profile.page';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { TransactionHistoriesPage } from './transaction-histories/transaction-histories.page';
import { ReviewsComponentModule } from '../private-profile/reviews/reviews.module';
import { HistoriesComponentModule } from '../private-profile/histories/histories.module';
import { HistoriesPage } from './histories/histories.page';
import { ReviewsPage } from './reviews/reviews.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReviewsComponentModule,
    HistoriesComponentModule,
    RouterModule.forChild([{ path: '', component: RepairerProfilePage }])
  ],
  declarations: [
    RepairerProfilePage,
    EditProfilePage,
    TransactionHistoriesPage,
    HistoriesPage,
    ReviewsPage],
  entryComponents: [
    EditProfilePage,
    TransactionHistoriesPage,
    HistoriesPage,
    ReviewsPage]
})
export class RepairerProfilePageModule { }
