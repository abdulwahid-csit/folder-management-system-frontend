import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent {
  constructor(private modalService: BsModalService, private bsModalService: BsModalService,) { }
  modalRef: any;
  userData: any;
  modalOpen: boolean = false;
  openUpdateModal() {
    this.modalRef = this.modalService.show(CreateRoleComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        userData: this.userData
      }
    });
  }
  closeModal(): void {
    this.modalRef?.hide();
    this.modalOpen = false;
  }
  deleteModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered modal-lg custom-delete-user-modal',
      backdrop: 'static',
      keyboard: false,

    });
    this.modalOpen = true;
  }
}
