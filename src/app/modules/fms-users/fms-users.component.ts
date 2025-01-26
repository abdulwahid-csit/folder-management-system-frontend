import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { RegisterComponent } from '../authentication/register/register.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-fms-users',
  templateUrl: './fms-users.component.html',
  styleUrls: ['./fms-users.component.scss'],
})
export class FmsUsersComponent implements OnInit {
  @ViewChild('resetPassword') resetPassword!: TemplateRef<any>;
  searchTerm: any;
  users: any;

  passwordForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  formData: any;

  constructor(
    private ls: LocalStoreService,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.passwordForm = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.get(controlName);
    return control
      ? control.hasError(validationType) && (control.dirty || control.touched)
      : false;
  }
  getAllUsers() {
    this.crudService
      .read('user/users', null, null, 1000, this.searchTerm)
      .subscribe(
        (res) => {
          this.users = res?.data;
          console.log('users: ', this.users);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

  modalRef!: BsModalRef;
  addUSer() {
    this.router.navigate(['layout/users/register-new-user']);
  }

  search() {
    this.getAllUsers();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid || this.passwordForm.hasError('mismatch')) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const formValue = this.passwordForm.value;
    const password = formValue.password;
    const new_password = formValue.confirmPassword;
    const userDetails = {
      ...this.formData,
      password: formValue.password,
    };

    if (password !== new_password) {
      console.log('Passwords do not match');

      return;
    }
    this.crudService
      .create('auth/password-recovery', { ...userDetails })
      .subscribe(
        (response) => {
          this.toast.success(
            'Password changed successfully',
            'password changing'
          );
          console.log('Password successfully changed', response);
          this.router.navigate(['/layout']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openResetModal(id: string) {
    this.currentUserId = id;
    this.modalRef = this.modalService.show(this.resetPassword, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {},
    });
  }
  isLoading = false;
  close() {
    this.modalService.hide();
  }

  currentUserId!: string;
  openDeleteModal(id: string) {
    this.currentUserId = id;
    const message = 'Are You want to delete this user?';
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteUser();
    });
  }

  deleteUser() {
    this.crudService.delete('user/user', this.currentUserId).subscribe(
      (x) => {
        this.close();
        this.toast.success('User deleted Successfully.');
        this.getAllUsers();
      },
      (e) => {
        console.log('error while deleting user.', e);
      }
    );
  }

  savePassword(){
    this.crudService.create('user/update-password', {
      userId: this.currentUserId,
      password: this.passwordForm.get('password')?.value,
    }).subscribe(res => {
      this.toast.success("Password updated successfully.");
      this.close();
    }, e => {
      console.log("Error while updating password: ", e);
    });
  };
}
