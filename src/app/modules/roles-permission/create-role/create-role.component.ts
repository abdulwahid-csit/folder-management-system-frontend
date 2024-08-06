import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() userData: any;
  rolesForm: FormGroup;
  constructor(private bsModalService: BsModalService, private fb: FormBuilder, private modalService: BsModalService) { }
  modalRef: any;

  modalOpen: boolean = false;

  ngOnInit(): void {
    if (this.mode === 'update' && this.userData) {
      this.rolesForm.patchValue(this.userData);
      this.rolesForm.removeControl('password');
    }
    this.rolesForm = this.fb.group({

      description: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
    })
  }
  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.rolesForm.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  onSubmit(): void {
    this.rolesForm.markAllAsTouched(); 
    if (this.rolesForm.invalid) {
      return;  
    }

    console.log(this.rolesForm.value);
    this.rolesForm.reset();
    this.bsModalService.hide();
  }

  onCancel(): void {
    this.rolesForm.reset();
    this.bsModalService.hide();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }
}
