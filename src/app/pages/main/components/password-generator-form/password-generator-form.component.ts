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
  clipboard = inject(Clipboard);

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
  }
}
