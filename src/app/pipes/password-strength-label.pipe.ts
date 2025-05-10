import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordStrengthLabel',
})
export class PasswordStrengthLabelPipe implements PipeTransform {
  transform(strength: number): string {
    switch (strength) {
      case 2:
        return 'Medium';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }
}
