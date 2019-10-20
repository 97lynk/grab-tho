import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
  imports: [
    PipeModule,
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: HomePage },
    ])
  ],
  declarations: [HomePage],
  providers: []
})
export class HomeModule { }
