import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  public person = {
    gerder: 'F',
    wantNotifications: false
  }

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field: string){
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave() {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
  }

}
