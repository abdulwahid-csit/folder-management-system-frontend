import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [
        Validators.required,
        Validators.pattern("^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W+)(?!.*\s).*/)
      ]],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.hasError(validationType) && (control.dirty || control.touched) : false;
  }

  getPasswordErrors(): { [key: string]: boolean } {
    const errors: { [key: string]: boolean } = {
      required: false,
      minlength: false,
      uppercase: false,
      lowercase: false,
      digit: false,
      special: false
    };

    const passwordControl = this.registerForm.get('password');
    if (!passwordControl) return errors;

    const password = passwordControl.value;

    if (passwordControl.hasError('required')) {
      errors['required'] = true;
    }
    if (passwordControl.hasError('minlength')) {
      errors['minlength'] = true;
    }
    if (password && !/[A-Z]/.test(password)) {
      errors['uppercase'] = true;
    }
    if (password && !/[a-z]/.test(password)) {
      errors['lowercase'] = true;
    }
    if (password && !/\d/.test(password)) {
      errors['digit'] = true;
    }
    if (password && !/\W/.test(password)) {
      errors['special'] = true;
    }

    return errors;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // const {firstName, lastName,  email, password, userName } = this.registerForm.value;
    // let data = {
    //   firstName: firstName, lastName: lastName, email: email, password: password, username: userName
    // }
    this.isLoading = true;
    this.authService.signUp(this.registerForm.value).subscribe((response: any) => {
      if (response.status_code === 201) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/layout';
        this.router.navigateByUrl(returnUrl);
        const { access_token, refresh_token, access_token_expires, user } = response.data;
        this.authService.storeTokens(access_token, refresh_token, access_token_expires, user);
        this.router.navigate(['/layout']);
      } else {
        this.toast.error(response.message, "Error!");
      }
      this.isLoading = false;
    }, error => {
      this.toast.error(error.error.message, "Error!");
      this.isLoading = false;
    });
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
