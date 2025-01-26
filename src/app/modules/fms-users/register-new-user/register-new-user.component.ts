import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent implements OnInit {
 @Input() isAdmin: Boolean = false;
  registerForm!: FormGroup;
  hidePassword = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      isAdmin: [false],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W+)(?!.*\s).*/
          ),
        ],
      ],
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
    this.crudService.create('user/users', this.registerForm.value).subscribe(res => {
      this.isLoading = false;
      console.log("User added: ", res);
      this.toast.success("User added successfully.")
      this.router.navigate(['/layout/users'])
    }, error => {
      this.isLoading = false;
      console.log('errror');
      this.toast.error('Email already exists');
    })
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
