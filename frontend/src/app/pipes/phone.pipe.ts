import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})

// pipe to transform phone numbers into 10 digits separated by dashes
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
      if (!value) return '';

      const digits = value.replace(/\D/g, '');
      const phone = digits.slice(-10);

      if (phone.length !== 10) { return value; }

      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
}
