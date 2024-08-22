import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {

  }
  hidePassword = true;
  isPasswordVisible: boolean = false;
  signInForm!: FormGroup
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],

    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.signInForm.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  onControlBlur(controlName: string): void {
    const control = this.signInForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }
  
  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;
    this.isLoading = true;
    this.authService.signIn(email, password).subscribe((response: any) => {
      if (response.status_code === 200) {
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
}
