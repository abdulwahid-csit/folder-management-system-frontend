import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private crudService: CrudService
  ) {}
  hidePassword = true;
  isPasswordVisible: boolean = false;
  signInForm!: FormGroup;
  ngOnInit(): void {
    this.getTodos();
    this.signInForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.signInForm.get(controlName);
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onControlBlur(controlName: string): void {
    const control = this.signInForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  onSubmit(): void {
    // this.router.navigate(['/layout/dashboard'])
    // return;
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;
    this.isLoading = true;
    this.authService.signIn(email, password).subscribe(
      (response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          this.toast.success('Login successfully.');
          const returnUrl =
            this.route.snapshot.queryParamMap.get('returnUrl') || '/layout';
          this.router.navigateByUrl(returnUrl);
          const { access_token, refresh_token, access_token_expires, user } =
            response;
          this.authService.storeTokens(
            access_token,
            refresh_token,
            access_token_expires,
            user
          );
          this.router.navigate(['/layout']);
        } else {
          // this.toast.error(response.message, "Error!");
        }
        this.isLoading = false;
      },
      (error) => {
        this.toast.error(error.error.message, 'Error!');
        console.log('here is the error', error);
        this.isLoading = false;
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  getTodos() {
    this.crudService.read('todo/todo').subscribe(
      (res) => {
        this.router.navigate(['/layout']);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
}
