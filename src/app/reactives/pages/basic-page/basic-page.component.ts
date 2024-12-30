import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.myForm
  }

  isValidFiled(field: string){
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo ${errors['minlenght'].requiredLenght} caracteres`
      }
    }

    return '';
  }

  onSave(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0
    });
  }
}
