import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

    transform(text: string, lengthCharacter: number = -1, ellipsis: boolean = false): string {

        if (!text) { return ''; }

        if (lengthCharacter === -1) { lengthCharacter = text.length; }

        if (text.length < lengthCharacter) { ellipsis = false; }

        text = text.slice(0, lengthCharacter);
        return text + (ellipsis ? '...' : '');
    }

}
