import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairerProfilePage } from './profile.page';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { TransactionHistoriesPage } from './transaction-histories/transaction-histories.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { LikesPage } from './likes/likes.page';
import { ReviewsPage } from './reviews/reviews.page';
import { ChangeAvatarPage } from './change-avatar/change-avatar.page';
import { ReviewsComponentModule } from '../repairer/private-profile/reviews/reviews.module';
import { HistoriesComponentModule } from '../repairer/private-profile/histories/histories.module';
import { SettingPage } from './setting/setting.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipeModule,
    ReviewsComponentModule,
    HistoriesComponentModule,
    RouterModule.forChild([{ path: '', component: RepairerProfilePage }])
  ],
  declarations: [
    RepairerProfilePage,
    EditProfilePage,
    TransactionHistoriesPage,
    LikesPage,
    ReviewsPage,
    ChangeAvatarPage,
    SettingPage],
  entryComponents: [
    EditProfilePage,
    TransactionHistoriesPage,
    LikesPage,
    ReviewsPage,
    ChangeAvatarPage,
    SettingPage]
})
export class RepairerProfilePageModule { }
