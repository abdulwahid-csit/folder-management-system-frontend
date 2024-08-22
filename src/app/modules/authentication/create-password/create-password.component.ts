import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder, private crudservice: CrudService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { 'mismatch': true } : null;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.get(controlName);
    return control ? control.hasError(validationType) && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {

    if (this.passwordForm.invalid || this.passwordForm.hasError('mismatch')) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const formValue = this.passwordForm.value;
    const password = formValue.password;
    const confirmPassword = formValue.confirmPassword;

    if (password !== confirmPassword) {
      console.log('Passwords do not match');

      return;
    }
    this.crudservice.create('auth/change-password', { newpassword: password }).subscribe(
      (response) => {
        this.toast.success("Password changed successfully","password changing")
          console.log('Password successfully changed', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
