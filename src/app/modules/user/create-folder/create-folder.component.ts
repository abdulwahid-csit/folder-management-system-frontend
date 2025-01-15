import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: [
    './create-folder.component.css',
    '../../../css/custpm-dropdown-style.scss',
  ],
})
export class CreateFolderComponent implements OnInit {
  @Output() event = new EventEmitter<any>();
  @Input() folderId: any;
  id: any;
  isLoading = false;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  minDate = new Date();
  form!: FormGroup;
  folder: any;
  isEditMode = false;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private toast: ToastrService
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.initForm();
    if (this.folderId) {
      this.getFolderById();
      this.isEditMode = true;;
    }
  }

  initForm() {
    this.form = new FormGroup({
      batchNo: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
      semester: new FormControl('', [Validators.required]),
      session: new FormControl('', [Validators.required]),
      timing: new FormControl('', [Validators.required]),
    });
  }

  getFolderById() {
    this.crudService.read('folder/folders', this.id).subscribe(
      (res) => {
        this.folder = res?.folders;
        console.log('Folders: ', this.folder);
        this.form.patchValue(this.folder[0]);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('form invalid');
      return;
    }

    let apiCall: any;
    if(this.isEditMode){
      apiCall = this.crudService.update('folder/update-folder', this.folderId, this.form.value);
    }else{
      apiCall =  this.crudService.create('folder/add-folder', this.form.value);
    }
   apiCall.subscribe(
     (res: any) => {
       console.log('response: ', res);
       this.event.emit();
       if(this.isEditMode){
         this.toast.success('Folder created successfully.');
       }else{
        this.toast.success('Folder updated successfully.');
       }
       this.closeModal();
     },
     (error: any) => {
       console.log('error: ', error);
       this.closeModal();
     }
   );
  }

  closeModal() {
    this.modalService.hide();
  }
}
