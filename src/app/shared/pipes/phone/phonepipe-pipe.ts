import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phoneFormat'})
export class PhonePipe implements PipeTransform {
   transform(value: string | number | null | undefined): string {
    if (!value) return '';

    const digits = value.toString().replace(/\D/g, '');

    // Expecting 10 digits: 1234567890 → 1234-567-890
    if (digits.length !== 10) {
      return value.toString(); // fallback
    }

    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1--$2--$3');
  }
}

