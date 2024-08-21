import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  modalRef: BsModalRef | null = null;
  userData: any;
  userId: number = 0;
  userIdToDelete?: number;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  passwordForm!: FormGroup;
  permissions: {
    slug: any; id: number, name: string 
}[] = [];
  selectedPermissions: Set<number> = new Set();
  permissionModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialize();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = +userId;
      this.fetchUserDetails(this.userId);
    }
    this.fetchPermissions();
  }

  initialize() {
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
 

  fetchUserDetails(id: any) {
    this.crudService.read('users', +id).subscribe((response: any) => {
      if (response.status_code === 200 || response.status_code === 201) {
        this.userData = response.data;
        this.selectedPermissions = new Set(
          this.userData.permissions.map((perm: any) => {
            return this.permissions.find(p => p.slug === perm.slug)?.id;
          }).filter((id: undefined) => id !== undefined)
        );
      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }


  fetchPermissions() {
    this.crudService.read('access/permissions').subscribe((response: any) => {
      if (response.status_code === 200) {
        this.permissions = response.data.payload;
      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.fetchPermissions(); 
    this.permissionModalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false
    });
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

  userDeleteModal(): void {
    if (!this.userData?.id) {
      console.error('No user data available for deletion.');
      return;
    }
    this.userIdToDelete = this.userData.id;
    const initialState = { description: 'Please confirm you really want to delete the user. After clicking yes, the user will be deleted permanently.' };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog-centered custom-delete-user-modal modal-lg',
      backdrop: 'static',
      keyboard: false,
      initialState,
    });

    this.modalRef.content.deleteData.subscribe(() => {
      this.confirmDelete();
    });
  }

  confirmDelete(): void {
    if (this.userIdToDelete != null) {
      this.crudService.delete('users', this.userIdToDelete).subscribe(
        () => {
          this.closeModal();
          this.router.navigate(['/layout/user']);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  passwordModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.controls[controlName];
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  onSubmit(): void {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      return;
    }

    const new_password = this.passwordForm.value.password;
    const userId = this.userData?.id;

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    this.crudService.update('users/change-password', userId, { new_password }).subscribe(
      response => {
        this.closeModal();
      },
      error => {
        console.error('Error updating password:', error);
      }
    );
  }

  onCancel(): void {
    this.closeModal()
    this.passwordForm.reset();
  }

  getRole(value: any) {
    return value && typeof value === 'object' ? value.name : '';
  }

  getPermissions(value: any) {
    return value && typeof value === 'object' ? value.name : '';
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

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedPermissions.has(permissionId);
  }

  togglePermission(permissionId: number) {
    if (this.selectedPermissions.has(permissionId)) {
      this.selectedPermissions.delete(permissionId);
    } else {
      this.selectedPermissions.add(permissionId);
    }
  }

  saveChanges(): void {
    const permissionsToSave: number[] = Array.from(this.selectedPermissions)
      .filter((permissionId): permissionId is number => typeof permissionId === 'number'); 

    if (!this.userData?.id) {
      console.error('User ID is not available');
      return;
    }
    this.crudService.update('users', this.userData.id, { permissions: permissionsToSave }).subscribe(
      response => {
        this.permissionModalRef?.hide();
        this.fetchUserDetails(this.userId); 
      },
      error => {
        console.error('Error updating permissions:', error);
      }
    );
  }

  cancelPermissionModal(): void {
    this.permissionModalRef?.hide();
  }
}
