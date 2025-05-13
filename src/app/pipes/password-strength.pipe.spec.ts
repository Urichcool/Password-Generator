import { PasswordStrengthPipe } from './password-strength.pipe';

describe('PasswordStrengthPipe', () => {
  let pipe: PasswordStrengthPipe;

  beforeEach(() => {
    pipe = new PasswordStrengthPipe();
  });

  it('should return 0 when all options are false or undefined', () => {
    expect(pipe.transform({
      uppercaseCheckbox: false,
      lowercaseCheckbox: false,
      numbersCheckbox: false,
      symbolsCheckbox: false
    })).toBe(0);

    expect(pipe.transform({
      uppercaseCheckbox: undefined,
      lowercaseCheckbox: undefined,
      numbersCheckbox: undefined,
      symbolsCheckbox: undefined
    })).toBe(0);
  });

  it('should return 1 when one checkbox is true', () => {
    expect(pipe.transform({
      uppercaseCheckbox: true,
      lowercaseCheckbox: false,
      numbersCheckbox: false,
      symbolsCheckbox: false
    })).toBe(1);
  });

  it('should return 2 when two checkboxes are true', () => {
    expect(pipe.transform({
      uppercaseCheckbox: true,
      lowercaseCheckbox: true,
      numbersCheckbox: false,
      symbolsCheckbox: false
    })).toBe(2);
  });

  it('should return 3 when three checkboxes are true', () => {
    expect(pipe.transform({
      uppercaseCheckbox: true,
      lowercaseCheckbox: true,
      numbersCheckbox: true,
      symbolsCheckbox: false
    })).toBe(3);
  });

  it('should return 4 when all checkboxes are true', () => {
    expect(pipe.transform({
      uppercaseCheckbox: true,
      lowercaseCheckbox: true,
      numbersCheckbox: true,
      symbolsCheckbox: true
    })).toBe(4);
  });
});