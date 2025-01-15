import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  isLoading: boolean = false;
  isFomDisabled = true;
  environment = environment;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private ls: LocalStoreService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.getUserDetails(this.ls.getItem('user').id);
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      desegnation: [''],
      department: [''],
      id: [this.ls.getItem('user').id],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[A-Z a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [null, [Validators.required]],
    });
    this.registerForm.disable();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.get(controlName);
    return control
      ? control.hasError(validationType) && (control.dirty || control.touched)
      : false;
  }

  getPasswordErrors(): { [key: string]: boolean } {
    const errors: { [key: string]: boolean } = {
      required: false,
      minlength: false,
      uppercase: false,
      lowercase: false,
      digit: false,
      special: false,
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
    let input = new FormData();
    input.append('firstName', this.registerForm.get('firstName')?.value);
    input.append('id', this.registerForm.get('id')?.value);
    input.append('lastName', this.registerForm.get('lastName')?.value);
    input.append('username', this.registerForm.get('username')?.value);
    input.append('email', this.registerForm.get('email')?.value);
    input.append('phone', this.registerForm.get('phone')?.value);
    input.append('department', this.registerForm.get('department')?.value);
    input.append('desegnation', this.registerForm.get('desegnation')?.value);
    input.append('file', this.file);

    this.crudService.createContent('auth/user', input).subscribe(
      (response: any) => {
        if (response.status_code == 201 || response.status_code == 200) {
          this.toast.success('User records updated successfully.');
          this.getUserDetails(this.ls.getItem('user').id);
          this.ls.setItem('user', response?.user);
          this.registerForm.disable();
          this.isFomDisabled = true;
          this.file = null;
        } else {
          this.toast.error(response.message, 'Error!');
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log('Error: ', error);
        this.toast.error(error.error.message, 'Error!');
        this.isLoading = false;
      }
    );
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

  getUserDetails(id?: string) {
    this.crudService.read('auth/details', id).subscribe(
      (response) => {
        this.registerForm.patchValue(response.user);
        console.log('user: ', response.user);
        this.profilePicture = response.user?.profile_picture;
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
  profilePicture: string = '';
  file: any;
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  openFile(): void {
    const fileInput = document.getElementById(
      'profile-image-input'
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.click(); 
    }
  }
}
