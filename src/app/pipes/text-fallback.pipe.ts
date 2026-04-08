import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFallback',
  standalone: false,
})

// Pipe to provide fallback text for empty or null values
export class TextFallbackPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: string): string {
    return value && value.trim().length > 0 ? value : fallback;
  }
}
