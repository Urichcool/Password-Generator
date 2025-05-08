import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneratePassword } from 'js-generate-password';

@Component({
  selector: 'app-password-generator-form',
  imports: [ClipboardModule, ReactiveFormsModule, NgClass],
  templateUrl: './password-generator-form.component.html',
  styleUrl: './password-generator-form.component.scss',
})
export class PasswordGeneratorFormComponent {
  generator = GeneratePassword;
  passwordForm: FormGroup<{
    passwordToCopy: FormControl<string>;
    length: FormControl<number>;
    uppercaseCheckbox: FormControl<boolean>;
    lowercaseCheckbox: FormControl<boolean>;
    numbersCheckbox: FormControl<boolean>;
    symbolsCheckbox: FormControl<boolean>;
  }> = new FormGroup({
    passwordToCopy: new FormControl('', { nonNullable: true }),
    length: new FormControl(4, { nonNullable: true }),
    uppercaseCheckbox: new FormControl(false, { nonNullable: true }),
    lowercaseCheckbox: new FormControl(false, { nonNullable: true }),
    numbersCheckbox: new FormControl(false, { nonNullable: true }),
    symbolsCheckbox: new FormControl(false, { nonNullable: true }),
  });
  clipboard = inject(Clipboard);
  copied: boolean = false;



  copyToClipboard(text: string) {
    if (text) {
      this.clipboard.copy(text);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }

  onChange(){
    this.passwordForm.patchValue({ passwordToCopy: "" });
  }

  onSubmit() {
    const password: string = this.generator({
      length: this.passwordForm.value.length,
      uppercase: this.passwordForm.value.uppercaseCheckbox,
      lowercase: this.passwordForm.value.lowercaseCheckbox,
      numbers: this.passwordForm.value.numbersCheckbox,
      symbols: this.passwordForm.value.symbolsCheckbox,
    });

    this.passwordForm.patchValue({ passwordToCopy: password });
  }

  onRangeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value =
      ((Number(input.value) - Number(input.min)) /
        (Number(input.max) - Number(input.min))) *
      100;
    input.style.background = `linear-gradient(to right, #A4FFAF ${value}%, #18171F ${value}%)`;
    this.passwordForm.value.length = Number(input.value);
  }

  passwordStrengthNumber(values: {
    uppercaseCheckbox: boolean | undefined;
    lowercaseCheckbox: boolean | undefined;
    numbersCheckbox: boolean | undefined;
    symbolsCheckbox: boolean | undefined;
  }) {
    let counter: number = 0;
    const valuesArray: (boolean | undefined)[] = Object.values(values);
    for (let i = 0; i < valuesArray.length; i += 1) {
      if (valuesArray[i]) {
        counter += 1;
      }
    }
    return counter;
  }

  passwordStrengthText(strength: number) {
    if (strength >= 2 && strength < 4) {
      return 'medium';
    }
    if (strength === 4) {
      return 'strong';
    }
    return 'weak';
  }
}
