import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss'],
})
export class FolderDetailsComponent implements OnInit {
  constructor(private modalService: BsModalService) {}
  modalRef!: BsModalRef;
  filterData = [1];
  ngOnInit() {}

  openDeleteModal(message: string) {
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
  }
}
