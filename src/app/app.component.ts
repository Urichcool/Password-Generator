import { Component } from '@angular/core';
import { PasswordGeneratorFormComponent } from './pages/main/components/password-generator-form/password-generator-form.component';

@Component({
  selector: 'app-root',
  imports: [PasswordGeneratorFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Password-generator';
}
