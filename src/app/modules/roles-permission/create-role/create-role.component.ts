import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss','../../../css/custpm-dropdown-style.scss']
})
export class CreateRoleComponent implements OnInit {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() userData: any;
  @Output() successCall = new EventEmitter();
  rolesForm!: FormGroup;
  permissions: { id: number, name: string }[] = [];
  selectedPermissions: Set<number> = new Set();
  modalRef?: BsModalRef;
  permissionModalRef?: BsModalRef;
  isLoading: boolean = false;
  isFocused: boolean = false;
  currentPage: number = 1;
  isFetching: boolean = false;
  organization: any[] = [];
  isSecondModalShow = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private crudService: CrudService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    public localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchPermissions(1);

    if(this.localStoreService.getUserRole().toLowerCase() === 'master'){
      this.fetchOrganization();
    }

    if (this.mode === 'update' && this.userData) {
      this.rolesForm.patchValue({
        name: this.userData.name,
        description: this.userData.description,
        organization: this.userData.organization ? this.userData.organization.id : ''
      });
      this.selectedPermissions = new Set(this.userData.permissions.map((p: any) => p.id));
    }
  }

  initializeForm() {
    this.rolesForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      permissions: [null],
      organization: [null, this.mode === 'create' ? Validators.required : null],
    });
  }

  fetchPermissions(page: number) {
    let urlData = `access/permissions?page=${page}&limit=10`;
    if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
      urlData += `&organization=${this.localStoreService.getUserOrganization()}`;
    }

    this.crudService.read(urlData).subscribe((response: any) => {
      if (response.status_code === 200) {
        // this.permissions = response.data.payload;
        this.permissions = [...this.permissions, ...response.data.payload];
        this.currentPage++;
      }
    }, error => {
      console.error('HTTP error:', error);
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.rolesForm.controls[controlName];
    return control?.hasError(validationType) && (control.dirty || control.touched);
  }

  openModal(template: TemplateRef<any>): void {
    this.isSecondModalShow = true;
    this.permissionModalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });

    this.permissionModalRef.onHidden?.subscribe(() => {

    });
  }

  onSubmit(): void {
    if(this.localStoreService.getUserRole().toLowerCase() !== 'master'){
      this.rolesForm.patchValue({
        organization: this.localStoreService.getUserOrganization()
      });
    }

    if (this.rolesForm.invalid) {
      this.rolesForm.markAllAsTouched();
      return;
    }

    const permissionsArray = Array.from(this.selectedPermissions);
    const formData = {
      ...this.rolesForm.value,
      permissions: permissionsArray,
    };

    this.isLoading = true;
    if (this.mode === 'create') {
      this.crudService.create('access/roles', formData).subscribe(response => {
        if (response.status_code === 200) {
          this.toastr.success('Role created successfully!', 'Success');
          this.successCall.emit();
        } else {
          this.toastr.error(response.message, 'Error');
        }
        this.isLoading = false;
      }, error => {
        this.toastr.error(error.message, 'Error');
        this.isLoading = false;
      });
    } else if (this.mode === 'update') {
      if (this.userData?.id) {
        this.crudService.update('access/roles', this.userData.id, formData).subscribe(response => {
          if (response.status_code === 200) {
            this.toastr.success('Role updated successfully!', 'Success');
            this.successCall.emit();
          } else {
            this.toastr.error(response.message, 'Error');
          }
          this.isLoading = false;
        }, error => {
          this.toastr.error(error.message, 'Error');
          this.isLoading = false;
        });
      } else {
        this.toastr.error('No valid user ID found for update', 'Error');
        this.isLoading = false;
      }
    }

    this.rolesForm.reset();
    this.closeModal();
  }


  onCancel(): void {
    this.isSecondModalShow = false;
    this.rolesForm.reset();
    this.closeModal();
  }

  togglePermission(permissionId: number) {
    if (this.selectedPermissions.has(permissionId)) {
      this.selectedPermissions.delete(permissionId);
    } else {
      this.selectedPermissions.add(permissionId);
    }
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedPermissions.has(permissionId);
  }

  saveChanges(): void {
    this.permissionModalRef?.hide();
  }

  cancelPermissionModal(): void {
    this.permissionModalRef?.hide();
  }

  onChange(): void {
    const control = this.rolesForm.get('organization');
    if (control?.value) {
      this.isFocused = false;
    }
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

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const scrollOffset = event.target.scrollTop + event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;

    if (scrollOffset >= scrollHeight - 1 && !this.isFetching) {
      this.fetchPermissions(this.currentPage);
    }
  }

  handleSecondModalShow(){
    this.isSecondModalShow = false;
  }
}
