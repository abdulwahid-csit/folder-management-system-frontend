import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild('shareForm') shareForm!: TemplateRef<any>;
  searchTerm = '';
  shareFolderForm!: FormGroup;
  ngOnInit(): void {
    this.getFolders();
    this.initForm();
  }
  modalRef!: BsModalRef;

  initForm() {
    this.shareFolderForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      folderId: new FormControl(''),
    });
    this.getSharedFolders();
  }

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
        folderId: id,
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getFolders();
    });
  }

  folderId!: string;
  shareFolder(folderId: string) {
    this.folderId = folderId;
    this.modalRef = this.modalService.show(this.shareForm, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
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
        this.toast.success('Folder deleted successfully.');
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

  closeModel() {
    this.modalService.hide();
  }

  editFolder() {}
  isLoading = false;
  submitShareFolder() {
    if(this.shareFolderForm.invalid){
      this.shareFolderForm.markAllAsTouched;
      this.toast.error('Please enter a valid email address.');
      return;
    }
    let input = {
      email: this.shareFolderForm.get('email')?.value,
      folderId: this.folderId
    }
    this.crudService.create('folder/share-folder', input).subscribe(
      (res) => {
        console.log('response => ', res);
        this.closeModal();
        this.toast.success('Folder Shared successfully.');
      },
      (error) => {
        this.toast.error('User not found');
      }
    );
  }

  closeModal() {
    this.modalService.hide();
  }


   sharedFolders: any[] = [];
    getSharedFolders() {
      this.crudService
        .read('fyp/shared-folders', null, undefined, 5)
        .subscribe(
          (res) => {
            this.sharedFolders = res?.data;
            console.log('sharedFolders: ', this.sharedFolders);
          },
          (error) => {
            console.log('error: ', error);
          }
        );
    }
}
