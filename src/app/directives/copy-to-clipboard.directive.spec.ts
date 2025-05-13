import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import { Clipboard } from '@angular/cdk/clipboard';
import { By } from '@angular/platform-browser';

@Component({
  template: `<button
    [appCopyToClipboard]="textToCopy"
    (copied)="onCopied($event)"
  >
    Copy
  </button>`,
  imports: [CopyToClipboardDirective],
})
class TestComponent {
  textToCopy = 'Test123!';
  copiedResult: boolean | null = null;

  onCopied(success: boolean) {
    this.copiedResult = success;
  }
}

describe('CopyToClipboardDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let clipboardSpy: jasmine.SpyObj<Clipboard>;

  beforeEach(() => {
    clipboardSpy = jasmine.createSpyObj('Clipboard', ['copy']);

    TestBed.configureTestingModule({
      imports: [TestComponent], //
      providers: [{ provide: Clipboard, useValue: clipboardSpy }],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should call clipboard.copy with the correct content on click', () => {
    clipboardSpy.copy.and.returnValue(true);
    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button'));

    buttonDe.triggerEventHandler('click');
    expect(clipboardSpy.copy).toHaveBeenCalledWith('Test123!');
  });

  it('should emit copied event with true when copy succeeds', () => {
    clipboardSpy.copy.and.returnValue(true);
    const buttonDe = fixture.debugElement.query(By.css('button'));

    buttonDe.triggerEventHandler('click');
    expect(fixture.componentInstance.copiedResult).toBeTrue();
  });

  it('should emit copied event with false when copy fails', () => {
    clipboardSpy.copy.and.returnValue(false);
    const buttonDe = fixture.debugElement.query(By.css('button'));

    buttonDe.triggerEventHandler('click');
    expect(fixture.componentInstance.copiedResult).toBeFalse();
  });

  it('should not call clipboard.copy or emit if contentToCopy is empty', () => {
    fixture.componentInstance.textToCopy = '';
    fixture.detectChanges();

    const buttonDe = fixture.debugElement.query(By.css('button'));
    buttonDe.triggerEventHandler('click');

    expect(clipboardSpy.copy).not.toHaveBeenCalled();
    expect(fixture.componentInstance.copiedResult).toBeNull();
  });
});
