import { NgModule } from '@angular/core';
import { PostComponent } from 'src/app/post/post.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RepairerListComponent } from 'src/app/repairer-list/repairer-list.component.';
import { RatingModule } from 'ng-starrating';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        LazyLoadImageModule,
        PipeModule,
        RatingModule
    ],
    declarations: [PostComponent, RepairerListComponent],
    exports: [PostComponent, RepairerListComponent]
})
export class ShareModule { }
