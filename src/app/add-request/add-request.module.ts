import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DescriptionRequestComponent } from './description-request/description-request.component';
import { GetMyLocationComponent } from './get-my-location/get-my-location.component';
import { FindRepairerComponent } from './find-repairer/find-repairer.component';
import { ChooseRepairerComponent } from './choose-repairer/choose-repairer.component';
import { RepairerPage } from './repairer-modal/repairer.page';
import { RatingModule } from 'ng-starrating';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule, AgmDirectionModule,
    RatingModule,
    RouterModule.forChild([
      { path: 'description', component: DescriptionRequestComponent },
      { path: 'my-location', component: GetMyLocationComponent },
      { path: 'find-repairer', component: FindRepairerComponent },
      { path: 'repairer/:id', component: ChooseRepairerComponent }
    ])
  ],
  declarations: [
    DescriptionRequestComponent,
    GetMyLocationComponent,
    FindRepairerComponent,
    ChooseRepairerComponent,
    RepairerPage
  ],
  entryComponents: [RepairerPage]
})
export class AddRequestModule { }
