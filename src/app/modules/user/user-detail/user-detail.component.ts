import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  constructor(private modalService: BsModalService, private crudService: CrudService, private route: ActivatedRoute, private bsModalService: BsModalService, private fb: FormBuilder,) { }
  modalRef: any;
  userData: any;
  userId: number = 0;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  modalOpen: boolean = false;
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }
  openUpdateModal() {
    const initialState = { itemList: this.userData, title: 'Edit', organizationId: this.userId };
    this.modalRef = this.modalService.show(CreateUserComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        userData: this.userData
      }
    });

  }
  deleteModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg custom-delete-user-modal',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }
  passwordForm!: FormGroup

  ngOnInit(): void {
    this.initialize();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUserDetails(userId);
    }

  }
  initialize() {
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  fetchUserDetails(id: any) {
    // this.userId = +id; 
    this.crudService.read('users', +id).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.userData = response.data;

      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }

  passwordModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  onSubmit(): void {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      return;
    }

    const { password } = this.passwordForm.value;
    const userId = this.userData?.id;

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    this.crudService.update('users', userId, { password }).subscribe(
      response => {
        console.log('Password updated successfully', response);
        this.closeModal();
      },
      error => {
        console.error('Error updating password:', error);
      }
    );
  }


  onCancel(): void {
    this.passwordForm.reset();
    this.bsModalService.hide();
  }

  getRole(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  getPermissions(value: any) {
    if (value && typeof value === 'object') {
      return value.name;
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { 'mismatch': true } : null;
  }
}
