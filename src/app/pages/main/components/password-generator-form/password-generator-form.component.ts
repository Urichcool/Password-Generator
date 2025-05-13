import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthPipe } from '../../../../pipes/password-strength.pipe';
import { PasswordStrengthLabelPipe } from '../../../../pipes/password-strength-label.pipe';
import { CopyToClipboardDirective } from '../../../../directives/copy-to-clipboard.directive';
import { PasswordGenerateService } from '../../../../services/password-generate.service';

@Component({
  selector: 'app-password-generator-form',
  imports: [
    ClipboardModule,
    ReactiveFormsModule,
    NgClass,
    PasswordStrengthPipe,
    PasswordStrengthLabelPipe,
    NgStyle,
    CopyToClipboardDirective,
  ],
  templateUrl: './password-generator-form.component.html',
  styleUrl: './password-generator-form.component.scss',
})
export class PasswordGeneratorFormComponent {
  generator = inject(PasswordGenerateService);
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

  checkboxOptions: { label: string; controlName: string }[] = [
    { label: 'Include Uppercase Letters', controlName: 'uppercaseCheckbox' },
    { label: 'Include Lowercase Letters', controlName: 'lowercaseCheckbox' },
    { label: 'Include Numbers', controlName: 'numbersCheckbox' },
    { label: 'Include Symbols', controlName: 'symbolsCheckbox' },
  ];

  onCopied(success: boolean) {
    if (success) {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }

  onChange() {
    this.passwordForm.patchValue({ passwordToCopy: '' });
  }

  async onSubmit() {
    const password = await this.generator.generatePassword({
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
}