import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordGeneratorFormComponent } from './password-generator-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorFormComponent;
  let fixture: ComponentFixture<PasswordGeneratorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable generate button when no options selected', () => {
    const generateButton = fixture.debugElement.query(
      By.css('.password-generate-button')
    ).nativeElement;
    expect(generateButton.disabled).toBeTrue();
  });

  it('should enable generate button when at least one option is selected', () => {
    component.passwordForm.patchValue({ uppercaseCheckbox: true });
    fixture.detectChanges();
    const generateButton = fixture.debugElement.query(
      By.css('.password-generate-button')
    ).nativeElement;
    expect(generateButton.disabled).toBeFalse();
  });

  it('should display password strength label', () => {
    component.passwordForm.patchValue({
      uppercaseCheckbox: true,
      lowercaseCheckbox: true,
      numbersCheckbox: true,
      symbolsCheckbox: true,
    });
    fixture.detectChanges();

    const strengthLabel = fixture.debugElement.query(
      By.css('.strength-level-text')
    ).nativeElement;
    expect(strengthLabel.textContent.trim().length).toBeGreaterThan(0);
    expect(strengthLabel.style.opacity).toBe('1');
  });

  it('should update length on range input', () => {
    const rangeInput = fixture.debugElement.query(
      By.css('.range-input')
    ).nativeElement;
    rangeInput.value = 12;
    rangeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.passwordForm.value.length).toBe(12);
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call onChange when form changes', () => {
    spyOn(component, 'onChange');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('change', null);
    expect(component.onChange).toHaveBeenCalled();
  });

  it('should call onCopied when copy button emits', () => {
    spyOn(component, 'onCopied');
    const button = fixture.debugElement.query(By.css('.copy-button'));
    button.triggerEventHandler('copied', true);
    expect(component.onCopied).toHaveBeenCalledWith(true);
  });
});
