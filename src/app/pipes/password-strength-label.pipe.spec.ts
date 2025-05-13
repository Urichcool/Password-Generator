import { PasswordStrengthLabelPipe } from './password-strength-label.pipe';

describe('PasswordStrengthLabelPipe', () => {
  let pipe: PasswordStrengthLabelPipe;

  beforeEach(() => {
    pipe = new PasswordStrengthLabelPipe();
  });

  it('should return "Weak" when strength is 0', () => {
    expect(pipe.transform(0)).toBe('Weak');
  });

  it('should return "Weak" when strength is 1', () => {
    expect(pipe.transform(1)).toBe('Weak');
  });

  it('should return "Medium" when strength is 2', () => {
    expect(pipe.transform(2)).toBe('Medium');
  });

  it('should return "Medium" when strength is 3', () => {
    expect(pipe.transform(3)).toBe('Medium');
  });

  it('should return "Strong" when strength is 4', () => {
    expect(pipe.transform(4)).toBe('Strong');
  });

  it('should return "Weak" for unexpected values', () => {
    expect(pipe.transform(-1)).toBe('Weak');
    expect(pipe.transform(5)).toBe('Weak');
    expect(pipe.transform(100)).toBe('Weak');
  });
});