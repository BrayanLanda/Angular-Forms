import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailService } from '../../../shared/validators/email.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validatorServices = inject(ValidatorsService);
  private emailValidator = inject(EmailService);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorServices.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorServices.emailPattern)]],
    username: ['', [Validators.required, this.validatorServices.cantBeStrider], [ this.emailValidator ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  }, {
    validators: [
      this.validatorServices.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  isValidField(field: string) {
    return this.validatorServices.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
