import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,) {

  }

  registerForm!: FormGroup
  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(): void {
    if (this.registerForm.valid) {

    }
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {

      return;
    }
    console.log(this.registerForm.value);
    ;
  }
}
