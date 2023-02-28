import { Injectable } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  form : FormGroup = new FormGroup({
    $id : new FormControl(null),
    name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', Validators.email),
    dob : new FormControl(''),
    course : new FormControl(''),
    gender : new FormControl('M')
  });
  constructor() { }

  initializeFormGroup() : void{
    this.form.setValue({
      $id : null,
      name : '',
      email : '',
      dob : '',
      course : '',
      gender : 'M'
    })
  }
}
