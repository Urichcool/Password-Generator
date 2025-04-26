import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-password-generator-form',
  imports: [ClipboardModule],
  templateUrl: './password-generator-form.component.html',
  styleUrl: './password-generator-form.component.scss',
})
export class PasswordGeneratorFormComponent {
  passwordToCopy: string = '';
  rangeValue: number = 4;
  clipboard = inject(Clipboard);

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
  }

  onRangeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value =
      ((Number(input.value) - Number(input.min)) /
        (Number(input.max) - Number(input.min))) *
      100;
    input.style.background = `linear-gradient(to right, #A4FFAF ${value}%, #18171F ${value}%)`;
    this.rangeValue = Number(input.value);
  }
}
