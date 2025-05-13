import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordGenerateService {
  async generatePassword(options: {
    length: number | undefined;
    uppercase: boolean | undefined;
    lowercase: boolean | undefined;
    numbers: boolean | undefined;
    symbols: boolean | undefined;
  }): Promise<string> {
    const { GeneratePassword } = await import('js-generate-password');
    return String(GeneratePassword(options));
  }
}