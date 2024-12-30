import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const  httpCallObservable = new Observable<ValidationErrors|null>((subscribe) => {
        if(email === 'brayan@gmail.com'){
          subscribe.next({ emailTaken: true });
          subscribe.complete();
        }

        subscribe.next(null);
        subscribe.complete();
    });

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(200)
  //   )
  // }
}
