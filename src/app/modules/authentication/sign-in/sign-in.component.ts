import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ,
    private route: ActivatedRoute
  ) {

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
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password).subscribe((response: any) => {
        if (response.status_code === 200) {
          console.log('Login successful:',);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/layout';

          // Navigate to the intended URL or default to '/layout'
          this.router.navigateByUrl(returnUrl);
          const { access_token, refresh_token, access_token_expires } = response.data;
          this.authService.storeTokens(access_token, refresh_token, access_token_expires);
          this.router.navigate(['/layout']);
        } else {
          console.error('Login failed:', response.message);
        }
      }, error => {

        console.error('HTTP error:', error);
      });

    }
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) {

      return;
    }
    console.log(this.signInForm.value);
    ;
  }
}
