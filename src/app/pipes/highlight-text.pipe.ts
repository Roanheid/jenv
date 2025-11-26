import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  // wrap text to hightlight with span
  transform(value: string, highlightText: string): string {
    if (!highlightText) return value;
    const re = new RegExp('(' + highlightText + ')', 'igm');
    return value.replace(re, '<span class="highlighted-text">$1</span>');
  }
}
