import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneratePassword } from 'js-generate-password';

@Component({
  selector: 'app-password-generator-form',
  imports: [ClipboardModule, ReactiveFormsModule],
  templateUrl: './password-generator-form.component.html',
  styleUrl: './password-generator-form.component.scss',
})
export class PasswordGeneratorFormComponent {
  generator = GeneratePassword;
  passwordForm = new FormGroup({
    passwordToCopy: new FormControl(''),
    length: new FormControl(4),
    uppercaseCheckbox: new FormControl(false),
    lowercaseCheckbox: new FormControl(false),
    numbersCheckbox: new FormControl(false),
    symbolsCheckbox: new FormControl(false),
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

  onSubmit() {
    const password: string = this.generator({
      length: this.passwordForm.value.length,
      uppercase: this.passwordForm.value.uppercaseCheckbox,
      lowercase: this.passwordForm.value.lowercaseCheckbox,
      numbers: this.passwordForm.value.numbersCheckbox,
      symbols: this.passwordForm.value.symbolsCheckbox,
    });

    this.passwordForm.patchValue({ passwordToCopy: password });

    console.log(this.passwordForm.value);
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
}
