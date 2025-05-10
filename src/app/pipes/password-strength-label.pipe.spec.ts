import { PasswordStrengthLabelPipe } from './password-strength-label.pipe';

describe('PasswordStrengthLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordStrengthLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
