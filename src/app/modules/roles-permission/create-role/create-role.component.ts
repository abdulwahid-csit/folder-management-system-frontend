import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() userData: any;
  rolesForm!: FormGroup;
  permissions: { id: number, name: string }[] = [];
  selectedPermissions: Set<number> = new Set();
  modalRef?: BsModalRef;
  permissionModalRef?: BsModalRef;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private crudService: CrudService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchPermissions();
    console.warn(this.userData);

    if (this.mode === 'update' && this.userData) {
      this.rolesForm.patchValue({
        name: this.userData.name,
        description: this.userData.description,
        organization: this.userData.organization.id
      });
      this.selectedPermissions = new Set(this.userData.permissions.map((p: any) => p.id));
    }
  }

  initializeForm() {
    this.rolesForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      permissions: [null,],
      organization: [1, Validators.required]
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

  closeModal(): void {
    this.bsModalRef.hide();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.rolesForm.controls[controlName];
    return control?.hasError(validationType) && (control.dirty || control.touched);
  }

  openModal(template: TemplateRef<any>): void {
    this.permissionModalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });

    this.permissionModalRef.onHidden?.subscribe(() => {

    });
  }

  onSubmit(): void {
    if (this.rolesForm.invalid) {
      this.rolesForm.markAllAsTouched();
      return;
    }

    const permissionsArray = Array.from(this.selectedPermissions);


    const formData = {
      ...this.rolesForm.value,
      permissions: permissionsArray,
      // organization: Number(this.rolesForm.value.organization.id)
    };

    if (this.mode === 'create') {
      this.crudService.create('access/roles', formData).subscribe(response => {
        if (response.status_code === 200) {
          console.log('Role created successfully:', response);
          this.toastr.success('Role created successfully!', 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      }, error => {
        console.error('Error creating role:', error);
        this.toastr.error(error.error.message, 'Error');
      });
    } else if (this.mode === 'update') {
      if (this.userData?.id) {
        this.crudService.update('access/roles', this.userData.id, formData).subscribe(response => {
          if (response.status_code === 200) {
            console.log('Role updated successfully:', response);
            this.toastr.success('Role updated successfully!', 'Success');
          } else {
            this.toastr.error(response.message, 'Error');
          }
        }, error => {
          console.error('Error updating role:', error);
          this.toastr.error(error.error.message, 'Error');
        });
      } else {
        this.toastr.error('No valid user ID found for update', 'Error');
      }
    }

    this.rolesForm.reset();
    this.closeModal();
  }

  onCancel(): void {
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
}
