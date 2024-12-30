import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  public newFavorite: FormControl = new FormControl('', Validators.required)

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Game One', Validators.required],
      ['Hi Game', Validators.required]
    ])
  })

  isValidFiled(field: string){
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onDeleteFavorites( index: number) :void{
    this.favoriteGames.removeAt(index);
  }

  onAddFavorite(): void{
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    )

    this.newFavorite.reset();
  }

  onSubmit():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();
  }

}
