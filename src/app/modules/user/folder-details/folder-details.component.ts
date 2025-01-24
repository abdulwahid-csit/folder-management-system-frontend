import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AddFileComponent } from '../add-file/add-file.component';
import { FilesDetailsComponent } from '../files-details/files-details.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss'],
})
export class FolderDetailsComponent implements OnInit {
  modalRef!: BsModalRef;
  filterData = [1];
  id: any;
  searchTerm!: string;
  form!: FormGroup;
  @ViewChild('addCustomFile') addCustomFile!: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router,
    private crudSerice: CrudService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('id');
      this.getFolder();
    });
    this.initForm();
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

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      totalMarks: new FormControl(null, [Validators.required]),
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

  isControlHasError(controlName: any, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
  file!: File;
  OnFileChange(event: any) {
    this.file = event.target.files[0];
    console.log('File: ', this.file);
  }

  isLoading = false;
  submit() {
    this.isLoading = true;
    console.log('Sending this data: ');
    let data = new FormData();
    data.append('name', this.form.get('name')?.value);
    data.append('description', this.form.get('description')?.value);
    data.append('file', this.file);
    data.append('folderId', this.id);

    console.log('Sending this data: ', this.form.get('totalMarks')?.value);

    // Call the create method
    this.crudSerice.createContent('folder/add-custom-file', data).subscribe(
      (res) => {
        console.log('Response: ', res);
        this.toast.success(
          `${this.form.get('name')?.value} created successfully.`
        );
        this.getFolder();
        this.closeModal();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error: ', error);
        this.toast.error('Error creating content.');
      }
    );
  }

  closeModal() {
    this.modalService.hide();
  }

  addCustomFiles() {
    this.modalRef = this.modalService.show(this.addCustomFile, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getFolder();
    });
  }
}
