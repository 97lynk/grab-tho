import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GuideSlidesComponent } from './guide-slides.component';
import { NotificationPageModule } from '../notification/notification.module';
import { NotificationPage } from '../notification/notification.page';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        NotificationPageModule
    ],
    declarations: [GuideSlidesComponent],
    exports: [GuideSlidesComponent]
})
export class GuideSlidesModule { }
