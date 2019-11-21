import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GuideSlidesComponent } from './guide-slides.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule
    ],
    declarations: [GuideSlidesComponent],
    exports: [GuideSlidesComponent]
})
export class GuideSlidesModule { }
