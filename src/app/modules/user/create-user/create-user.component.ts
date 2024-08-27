import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

function numericValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && !/^[0-9]+$/.test(control.value)) {
    return { numeric: true };
  }
  return null;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss', '../../../css/custpm-dropdown-style.scss']
})
export class CreateUserComponent implements OnInit {
  @Input() mode: string = 'create';
  @Input() userData: any;
  @Output() successCall = new EventEmitter<void>();
  @Input() userId: number = 0;
  @Input() itemList: any;

  isPasswordVisible: boolean = false;
  userForm!: FormGroup;
  hidePassword = true;
  isFocused: boolean = false;
  roles: any[] = [];
  organization: any[] = [];
  isLoading: boolean = false;

  constructor(
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toast: ToastrService,
    public localStoreService: LocalStoreService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.fetchRoles();
    
    if(this.localStoreService.getUserRole().toLowerCase() === 'master'){
      this.fetchOrganization();
    }
  }

  initialize() {

    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      phone: [ '', [Validators.required, numericValidator]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      role: [null, Validators.required],
      organization: [null, Validators.required],
    });

    if (this.mode === 'update' && this.userData) {
      this.userForm.patchValue({
        firstName: this.userData.first_name || '',
        lastName: this.userData.last_name || '',
        username: this.userData.username || '',
        phone: this.userData.phone || '',
        email: this.userData.email || '',
        role: this.userData.roles || '',
        organization: this.userData.organization ? this.userData.organization.id : ''
      });
      this.userForm.get('email')?.disable();
      this.userForm.removeControl('password');
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  generatePassword(): void {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    this.userForm.get('password')?.setValue(password);
  }

  onSubmit(): void {
    if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
      this.userForm.patchValue({
        organization: this.localStoreService.getUserOrganization()
      });
    }

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formValue = { ...this.userForm.value };
    if (formValue.organization) {
      formValue.organization = Number(formValue.organization);
    }

    const endpoint = 'users';
    const apiMethod = this.mode === 'create'
      ? this.crudService.create(endpoint, formValue)
      : this.crudService.update(endpoint, this.userData?.id, formValue);

    this.isLoading = true;
    apiMethod.subscribe(
      (response: any) => {
        if (response.status_code === 200 || response.status_code === 201) {
          this.toast.success(response.message, 'Success!');
          this.successCall.emit();
          this.closeModal();
        } else {
          this.toast.error(response.message, 'Error!');
          this.isLoading = false;
        }
      },
      error => {
        this.toast.error(error.message || 'An error occurred', 'Error!');
        this.isLoading = false;
      }
    );
  }

  closeModal(): void {
    this.bsModalService.hide();
  }

  onValueChange(): void {
    const control = this.userForm.get('role');
    if (control?.value) {
      this.isFocused = false;
    }
  }

  fetchRoles(): void {
    this.crudService.read('access/roles')
      .subscribe(
        (response: any) => {
          if (response.status_code === 200) {
            this.roles = response.data.payload;
          } else {
            console.error('Failed to fetch roles:', response.message);
          }
        },
        error => {
          console.error('Error fetching roles:', error);
        }
      );
  }

  fetchOrganization(): void {
    this.crudService.read('organization')
      .subscribe(
        (response) => {
          this.organization = response.data.payload
        },
        error => {
          console.error('Error fetching roles:', error);
        }
      );
  }

  onChange(): void {
    const control = this.userForm.get('organization');
    if (control?.value) {
      this.isFocused = false;
    }
  }
}
