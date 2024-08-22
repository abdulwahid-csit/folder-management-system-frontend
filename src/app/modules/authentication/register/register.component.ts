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
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
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
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { email, password, userName } = this.registerForm.value;
    this.isLoading = true;
    this.authService.signUp(email, password, userName).subscribe((response: any) => {
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
