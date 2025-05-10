import { Clipboard } from '@angular/cdk/clipboard';
import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input('appCopyToClipboard') contentToCopy: string = '';
  @Output() copied = new EventEmitter<boolean>();

  clipboard = inject(Clipboard);

  @HostListener('click')
  copyText() {
    if (this.contentToCopy) {
      const success = this.clipboard.copy(this.contentToCopy);
      this.copied.emit(success);
    }
  }
}
