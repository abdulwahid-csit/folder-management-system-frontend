import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent {
  constructor(private fb: FormBuilder,) {

  }

  passwordForm!: FormGroup
  ngOnInit(): void {

    this.passwordForm = this.fb.group({

      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(): void {
    if (this.passwordForm.valid) {

    }
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {

      return;
    }
    console.log(this.passwordForm.value);
    ;
  }
}
