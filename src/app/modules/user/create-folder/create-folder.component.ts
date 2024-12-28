import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() event = new EventEmitter<any>;
  mode = '';
  isLoading = false;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  minDate = new Date();
  form!: FormGroup;


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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('form invalid')
      return;
    }
    this.crudService.create('folder/add-folder', this.form.value).subscribe(
      (res) => {
        console.log('response: ', res);
        this.event.emit();
        this.toast.success('Folder created successfully.')
        this.closeModal();
      },
      (error) => {
        console.log('error: ', error);
        this.closeModal();
      }
    );
  }

  closeModal() {
    this.modalService.hide();
  }
}
