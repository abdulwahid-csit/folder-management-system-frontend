import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  constructor(private modalService: BsModalService, private bsModalService: BsModalService, private fb: FormBuilder,) { }
  modalRef: any;
  userData: any;
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
  delateModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }
  passwordForm!: FormGroup

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.compose([Validators.required])],

    })
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

    console.log(this.passwordForm.value);
    this.passwordForm.reset();
    this.bsModalService.hide();
  }

  onCancel(): void {
    this.passwordForm.reset();
    this.bsModalService.hide();
  }
}
