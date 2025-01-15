import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddFileComponent } from '../add-file/add-file.component';

@Component({
  selector: 'app-files-details',
  templateUrl: './files-details.component.html',
  styleUrls: ['./files-details.component.scss'],
})
export class FilesDetailsComponent implements OnInit {
  @Input() folderId: any;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private cdr: ChangeDetectorRef
  ) {}
  modalRef!: BsModalRef;
  filterData: any = [];
  id: any;
  searchTerm!: string;
  contentType!: string;
  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      this.id = res['id'];
      this.contentType = res['contentType'];
      console.log('contentType: ', this.contentType);
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
  isDataFetced = false;
  title: any;
  btnTitle: any;

  getFolder() {
    this.crudService.read('folder/folders', this.id).subscribe(
      (res) => {
        this.folder = res?.folders;
        switch (this.contentType) {
          case 'assignments': {
            this.filterData = this.folder[0].assignments;
            this.title = 'Assignments';
            this.btnTitle = 'Add Assignment';
            console.log('Filter data', this.filterData);
            break;
          }
          case 'quizzes': {
            this.filterData = this.folder[0].quizzes;
            this.title = 'Quizzes';
            this.btnTitle = 'Add Quiz';
            break;
          }
          case 'lectures': {
            this.filterData = this.folder[0].lectures;
            this.title = 'Lectures';
            this.btnTitle = 'Add lecture';
            break;
          }
          case 'midExame': {
            this.filterData = this.folder[0].midExame;
            this.title = 'Mid Term Exames';
            this.btnTitle = 'Add exam';
            break;
          }
          case 'finalExam': {
            this.filterData = this.folder[0].finalExam;
            this.title = 'Final Term Exames';
            this.btnTitle = 'Add exam';
            break;
          }
        }
        console.log('Folder is=============: ', this.folder);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  addFile(title: string, folderId?: string) {
    this.modalRef = this.modalService.show(AddFileComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        title: title,
        folderId: this.id,
        contentType: this.contentType,
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getFolder();
    });
  }

  downloadFile(fileName: string) {
    this.crudService.downloadFile(fileName);
  }
}
