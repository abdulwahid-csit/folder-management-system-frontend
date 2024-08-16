import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]  // Added email validation
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.router.navigate(['/create/password']);
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  onControlBlur(controlName: string): void {
    const control = this.forgotForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }


  onSendResetLink(){
    if(this.forgotForm.invalid){
      this.forgotForm.markAllAsTouched();
      return;
    }
    console.log("Form Submitted");
  }
}
