import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { DescriptionRequestComponent } from './description-request/description-request.component';
import { GetMyLocationComponent } from './get-my-location/get-my-location.component';
import { DonePage } from './done/done.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProcessingModal } from './processing-modal/processing.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      { path: 'description', component: DescriptionRequestComponent },
      { path: 'my-location', component: GetMyLocationComponent },
      { path: 'done', component: DonePage },
    ])
  ],
  declarations: [
    DescriptionRequestComponent,
    GetMyLocationComponent,
    DonePage, ProcessingModal
  ],
  entryComponents: [ProcessingModal]
})
export class AddRequestModule { }
