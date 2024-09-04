import { Component, TemplateRef, OnInit, HostListener } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  modalRef: BsModalRef | null = null;
  userData: any;
  userId: number = 0;
  isLoading: boolean = false;
  userIdToDelete?: number;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  passwordForm!: FormGroup;
  isFocused!: boolean;
  userStatus: string = '';
  currentPage: number = 1;
  isFetching: boolean = false;
  permissions: {
    slug: any; id: number, name: string, is_editable: boolean, is_selected:boolean
  }[] = [];
  selectedPermissions: Set<number> = new Set();
  permissionModalRef?: BsModalRef;
  firstFivePermissions: any[] = [];
  totalPermissions: any[] = [];
  isDropdownVisible = false;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    public localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    this.initialize();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = +userId;
      this.fetchUserDetails(this.userId);
      this.fetchPermissions(this.userId, 1);
    }
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
        console.log("User data: ", this.userData);
        this.userStatus = response.data.status;
        this.splitPermissions();
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

  fetchPermissions(userId: number, page: number) {
    let urlData = `access/permissions/user/${userId}?page=${page}&limit=10`;
    if (this.localStoreService.getUserRole().toLowerCase() !== 'master') {
      urlData += `&organization=${this.localStoreService.getUserOrganization()}`;
    }

    this.crudService.read(urlData).subscribe((response: any) => {
      console.log('Permissions response:', response); 
      if (response.status_code === 200) {
        this.permissions = [...this.permissions, ...response.data.payload];
        this.currentPage++;
      }

    }, error => {
      console.error('HTTP error:', error);
    });
  }



  openModal(template: TemplateRef<any>): void {
    this.fetchPermissions(this.userId, this.currentPage);
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

    this.modalRef.content.successCall.subscribe(() => {
      this.fetchUserDetails(this.userId);
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

  getPasswordErrors(): { [key: string]: boolean } {
    const errors: { [key: string]: boolean } = {
      required: false,
      minlength: false,
      uppercase: false,
      lowercase: false,
      digit: false,
      special: false
    };

    const passwordControl = this.passwordForm.get('password');
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
    this.closeModal();
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
    const permission = this.permissions.find(p => p.id === permissionId);
    if (permission?.is_editable) {
      if (this.selectedPermissions.has(permissionId)) {
        this.selectedPermissions.delete(permissionId);
      } else {
        this.selectedPermissions.add(permissionId);
      }
    }
  }

  saveChanges(): void {
    if (!this.userData?.id) {
      console.error('User ID is not available');
      return;
    }
    const permissionIdsToSave = Array.from(this.selectedPermissions)
      .filter(id => typeof id === 'number'); 
    const permissionsPayload = permissionIdsToSave;

    this.crudService.update('users', this.userData.id, { permissions: permissionsPayload }).subscribe(
      response => {
        this.permissionModalRef?.hide();
        this.fetchUserDetails(this.userId);
      },
      error => {
        console.error('Error updating permissions:', error);
      }
    );
  }


  verifyEmail(id: string) {
    this.crudService.create('users/verify-user', { userId: id }).subscribe(response => {
      console.log("Response from email verification api. ", response);
      if (response.status_code === 200) {
        this.toast.success(response.message);
        this.fetchUserDetails(id);
      }
    });
  }

  cancelPermissionModal(): void {
    this.permissionModalRef?.hide();
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  splitPermissions() {
    this.firstFivePermissions = [];
    this.totalPermissions = [];
    if (this.userData?.permissions.length > 5) {
      this.firstFivePermissions = this.userData?.permissions.map((record: any, index: number) => index < 5 ? record : null).filter((record: null) => record !== null);
      this.totalPermissions = this.userData?.permissions.map((record: any, index: number) => index >= 5 && index < 10 ? record : null).filter((record: null) => record !== null);
    } else {
      this.firstFivePermissions = this.userData?.permissions;
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const scrollOffset = event.target.scrollTop + event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;

    if (scrollOffset >= scrollHeight - 1 && !this.isFetching) {
      this.fetchPermissions(this.userId, this.currentPage); 
    }
  }
}
