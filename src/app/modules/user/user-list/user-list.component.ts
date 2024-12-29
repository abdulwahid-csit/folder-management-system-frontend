import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  searchTerm = '';

  ngOnInit(): void {
    this.getFolders();
  }
  modalRef!: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private crudService: CrudService,
    private toast: ToastrService
  ) {}

  createFolder(id?: string) {
    this.modalRef = this.modalService.show(CreateFolderComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        id: id,
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getFolders();
    });
  }

  details(id: string | number) {
    this.router.navigate(['layout/user/details', id]);
  }

  folders: any;
  getFolders() {
    this.crudService
      .read('folder/folders', null, null, 10, this.searchTerm)
      .subscribe(
        (res) => {
          this.folders = res?.folders;
          console.log('Folders: ', this.folders);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }

  deleteFolder(id: string) {
    this.crudService.delete('folder/delete', id).subscribe(
      (res) => {
        this.toast.success('Todo deleted successfully.');
        this.getFolders();
        this.closeModel();
      },
      (error) => {
        console.log('error: ', error);
        this.closeModel();
      }
    );
  }
  deleteModalId: any;
  openDeleteModal(id: string, message?: string) {
    this.deleteModalId = id;
    message = 'Are You want to delete this folder?';
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteFolder(this.deleteModalId);
    });
  }

  closeModel(){
    this.modalService.hide();
  }


  editFolder(){

  }
}
