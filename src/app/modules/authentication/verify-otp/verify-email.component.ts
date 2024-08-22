import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  otpForm!: FormGroup;
  formData: any;

  constructor(private fb: FormBuilder,
    private crudservice: CrudService,
    private router: ActivatedRoute,
  private route:Router) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
       this.formData = params;
      console.log('Received form data:', this.formData);
      // Use the formData as needed
    });
    this.otpForm = this.fb.group({
      code0: ['', [Validators.required, Validators.maxLength(1)]],
      code1: ['', [Validators.required, Validators.maxLength(1)]],
      code2: ['', [Validators.required, Validators.maxLength(1)]],
      code3: ['', [Validators.required, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Validators.maxLength(1)]],
      code5: ['', [Validators.required, Validators.maxLength(1)]]
    });
  }

  onInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 1) {
      input.value = value.slice(0, 1);
    }

    if (input.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onSubmit(): void {

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
    }
    else {
          const otpCode = Object.values(this.otpForm.value).join('');
          const otpJson = { otp: otpCode, ...this.formData };
          console.log('6-Digit OTP Code:', otpCode);
              this.crudservice.create('auth/verify-otp', otpJson).subscribe(
        (response) => {

          this.route.navigate(['/create/password'], { queryParams: otpJson });
        },
        (error) => {
                console.log(error);
        }
      )
    }
  }

}
