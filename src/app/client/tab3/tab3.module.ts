import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {MessagingService} from '../../service/message.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Ionic4DatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  providers: [MessagingService, AsyncPipe],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
