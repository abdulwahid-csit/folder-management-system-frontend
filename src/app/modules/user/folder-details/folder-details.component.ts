import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddFileComponent } from '../add-file/add-file.component';
import { FilesDetailsComponent } from '../files-details/files-details.component';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss'],
})
export class FolderDetailsComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router
  ) {}
  modalRef!: BsModalRef;
  filterData = [1];
  id: any;
  searchTerm!: string;
  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('id');
      this.getFolder();
    });
  }

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

  folder: any;
  getFolder() {
    this.crudService.read('folder/folders', this.id).subscribe(
      (res) => {
        this.folder = res?.folders;
        console.log('Folder is: ', this.folder);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  addFile(title: string, folderId: string, contentType: string) {
    this.modalRef = this.modalService.show(AddFileComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        title: title,
        folderId: this.id,
        contentType: contentType,
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getFolder();
    });
  }

  onRowClick(folderId: string, contentType: string) {
    this.router.navigate(['/layout/user/file-details'], {
      queryParams: { id: folderId, contentType: contentType },
    });

    // {
    //   this.modalRef = this.modalService.show(FilesDetailsComponent, {
    //     class:
    //       'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
    //     backdrop: 'static',
    //     keyboard: false,
    //     initialState: {
    //       // mode: 'update',
    //       folderId: folderId,
    //       contentType: contentType,
    //     },
    //   });
    //   this.modalRef.content?.event.subscribe(() => {
    //     this.getFolder();
    //   });
    // }
  }
}
