import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private fb: FormBuilder,) {

  }

  signInForm!: FormGroup
  ngOnInit(): void {

    this.signInForm = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.signInForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(): void {
    if (this.signInForm.valid) {

    }
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) {

      return;
    }
    console.log(this.signInForm.value);
    ;
  }
}
