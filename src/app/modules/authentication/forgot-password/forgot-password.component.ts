import { Router } from '@angular/router';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private fb: FormBuilder, private router: Router) {

  }
  forgotForm!: FormGroup
  ngOnInit(): void {

    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.router.navigate(['/create/password']);
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
