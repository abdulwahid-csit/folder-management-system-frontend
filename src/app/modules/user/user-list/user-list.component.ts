import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CreateFolderComponent } from '../create-folder/create-folder.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchTerm = '';
  ngOnInit(): void {}
  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router) {}

  createFolder() {
    this.modalRef = this.modalService.show(CreateFolderComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
      },
    });
  }

  details(id: string | number){
    this.router.navigate(['layout/user/details', 1]);
  }
}
