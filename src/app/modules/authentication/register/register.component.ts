import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  isPasswordVisible: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],  
      password: [null, Validators.compose([Validators.required])],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
   
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle form submission here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onControlBlur(controlName: string): void {
    const control = this.registerForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
