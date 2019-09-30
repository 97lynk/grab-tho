import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { AddRequestComponent } from '../add-request/add-request.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: Tab1Page },
      { path: 'add-request', component: AddRequestComponent }
    ])
  ],
  declarations: [Tab1Page, AddRequestComponent],
  providers: [
    // {provide: Camera, useClass: CameraMock},
    ]
})
export class Tab1PageModule { }
