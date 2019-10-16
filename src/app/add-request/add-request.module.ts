import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DescriptionRequestComponent } from './description-request/description-request.component';
import { GetMyLocationComponent } from './get-my-location/get-my-location.component';
// import { FindRepairerComponent } from '../negotiate/find-repairer/find-repairer.component';
// import { ChooseRepairerComponent } from '../negotiate/choose-repairer/choose-repairer.component';
// import { RepairerPage } from './repairer-modal/repairer.page';
import { RatingModule } from 'ng-starrating';
import { AgmDirectionModule } from 'agm-direction';
import { DonePage } from './done/done.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    RouterModule.forChild([
      { path: 'description', component: DescriptionRequestComponent },
      { path: 'my-location', component: GetMyLocationComponent },
      { path: 'done', component: DonePage },
    ])
  ],
  declarations: [
    DescriptionRequestComponent,
    GetMyLocationComponent,
    DonePage,
  ],
})
export class AddRequestModule { }
