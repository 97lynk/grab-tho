import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VDateTimePipe } from './vdate-time.pipe';


@NgModule({
    declarations: [VDateTimePipe],
    imports: [CommonModule],
    exports: [VDateTimePipe]
})

export class PipeModule { }
