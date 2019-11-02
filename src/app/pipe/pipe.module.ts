import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VDateTimePipe } from './vdate-time.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';


@NgModule({
    declarations: [VDateTimePipe, TruncateTextPipe],
    imports: [CommonModule],
    exports: [VDateTimePipe, TruncateTextPipe]
})

export class PipeModule { }
