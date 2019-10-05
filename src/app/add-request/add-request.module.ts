import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DescriptionRequestComponent } from './description-request/description-request.component';
import { GetMyLocationComponent } from './get-my-location/get-my-location.component';
import { FindRepairerComponent } from './find-repairer/find-repairer.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    RouterModule.forChild([
      { path: 'description', component: DescriptionRequestComponent },
      { path: 'my-location', component: GetMyLocationComponent },
      { path: 'find-repairer', component: FindRepairerComponent }
    ])
  ],
  declarations: [
    DescriptionRequestComponent,
    GetMyLocationComponent,
    FindRepairerComponent
  ]
})
export class AddRequestModule { }
