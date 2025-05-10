import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordStrength',
})
export class PasswordStrengthPipe implements PipeTransform {
  transform(value: {
    uppercaseCheckbox: boolean | undefined;
    lowercaseCheckbox: boolean | undefined;
    numbersCheckbox: boolean | undefined;
    symbolsCheckbox: boolean | undefined;
  }): number {
    let strength = 0;
    if (value.uppercaseCheckbox) strength++;
    if (value.lowercaseCheckbox) strength++;
    if (value.numbersCheckbox) strength++;
    if (value.symbolsCheckbox) strength++;
    return strength;
  }
}
