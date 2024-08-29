import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {
  modalRef: BsModalRef | undefined;
  modalOpen: boolean | undefined;
  registerForm!: FormGroup;
  isFocused: boolean = false;
  isLoading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
    this.checkVerificationLink();
  }

  initialize() {
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      role: new FormControl({ value: '', disabled: true }, [Validators.required]),
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
    const control = this.registerForm.get(controlName);
    return control ? control.hasError(validationType) && (control.dirty || control.touched) : false;
  }

  checkVerificationLink() {
    this.route.paramMap.subscribe(params => {
      let token = params.get('id');
      if (token) {
        this.verifyLink(token).pipe(
          catchError(err => {
            console.error('Verification failed', err);
            this.router.navigate(['/login']);
            return of(null);
          })
        ).subscribe(response => {
          if (response && response.data) {
            this.populateForm(response.data);
          } else {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  cleanToken(token: string): string {
    return token.replace(/^"+|"+$/g, '').replace(/\\+/g, '');
  }

  verifyLink(token: string): Observable<any> {
    const endPoint = 'auth/verify-link';
    return this.authService.verifyLink(endPoint, { token });
  }

  populateForm(data: any) {
    this.registerForm.patchValue({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      username: data.username || '',
      phoneNumber: data.phoneNumber || '',
      email: data.email || '',
      role: data.role?.name || ''
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered invite-admin-moda modal-lg',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const rawToken = this.route.snapshot.queryParamMap.get('token') || '';
    const cleanedToken = this.cleanToken(rawToken);

    const formData = {
      first_name: this.registerForm.get('firstName')?.value,
      last_name: this.registerForm.get('lastName')?.value,
      username: this.registerForm.get('username')?.value,
      phone: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      timezone: 'UTC+05:00',
      token: cleanedToken
    };

    this.isLoading = true;

    this.authService.register('auth/register', formData).subscribe(
      (response: any) => {
        if (response.status_code === 201) {
          this.authService.signIn(formData.email, formData.password).subscribe(
            (loginResponse: any) => {
              if (loginResponse.status_code === 200) {
                const { access_token, refresh_token, access_token_expires, user } = loginResponse.data;
                this.authService.storeTokens(access_token, refresh_token, access_token_expires, user);
                this.router.navigate(['/layout']);
              } else {
                this.toast.error(loginResponse.message, "Login Error!");
              }
              this.isLoading = false;
            },
            error => {
              this.toast.error(error.error.message, "Login Error!");
              this.isLoading = false;
            }
          );
        } else {
          this.toast.error(response.message, "Registration Error!");
          this.isLoading = false;
        }
      },
      error => {
        this.toast.error(error.error.message, "Registration Error!");
        this.isLoading = false;
      }
    );
  }
}
