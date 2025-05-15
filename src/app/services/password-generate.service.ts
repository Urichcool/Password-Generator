import { Injectable } from '@angular/core';
import generatePassword from 'generate-password-browser';


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
    return generatePassword.generate(options);
  }
}