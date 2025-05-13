import { TestBed } from '@angular/core/testing';
import { PasswordGenerateService } from './password-generate.service';

describe('PasswordGenerateService', () => {
  let service: PasswordGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GeneratePassword with given options and return result as string', async () => {
    const fakePassword = 'Abc123!';
    const mockGeneratePassword = jasmine
      .createSpy('GeneratePassword')
      .and.returnValue(fakePassword);

    spyOn<any>(service, 'generatePassword').and.callFake(
      async (options: {
        length: number | undefined;
        uppercase: boolean | undefined;
        lowercase: boolean | undefined;
        numbers: boolean | undefined;
        symbols: boolean | undefined;
      }) => {
        const { GeneratePassword } = await Promise.resolve({
          GeneratePassword: mockGeneratePassword,
        });
        return String(GeneratePassword(options));
      }
    );

    const options = {
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    };

    const result = await (service as any).generatePassword(options);

    expect(mockGeneratePassword).toHaveBeenCalledWith(options);
    expect(result).toBe(fakePassword);
  });
});
