import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css'],
})
export class AddFileComponent implements OnInit {
  mode = '';
  isLoading = false;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  minDate = new Date();
  form!: FormGroup;
  @Input() title: any;
  @Input() contentType: any;
  @Input() folderId: any;
  @Output() event = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
    private crudSerice: CrudService,
    private toast: ToastrService,
    private fb: FormBuilder
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
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      totalMarks: new FormControl(null, [Validators.required]),
    });
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

  submit() {

    debugger
    if(this.form.invalid || !this.file){
      this.form.markAllAsTouched();
      this.toast.error('Please fill all the fields.');
      return;
    }

    console.log('Sending this data: ');
   let data = new FormData();
   data.append('name', this.form.get('name')?.value);
   data.append('description', this.form.get('description')?.value);
   data.append('file', this.file);
   data.append('contentType', this.contentType);
   data.append('folderId', this.folderId);
   data.append('totalMarks', this.form.get('totalMarks')?.value);

    console.log('Sending this data: ', this.form.get('totalMarks')?.value);

    // Call the create method
    this.crudSerice.createContent('folder/add-content', data).subscribe(
      (res) => {
        console.log('Response: ', res);
        this.toast.success(`${this.contentType} created successfully.`);
        this.event.emit(true);
        this.closeModal();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error: ', error);
        this.toast.error('Error creating content.');
      }
    );
  }

  closeModal() {
    this.modalService.hide();
  }
}
