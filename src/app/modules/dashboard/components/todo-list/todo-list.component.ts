import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  mode = '';
  isLoading = false;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  minDate = new Date();
  form!: FormGroup;
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
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      reminderDate: new FormControl(null),
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('This form value: ', this.form.value);
    this.crudSerice
      .create('todo/add-todo', this.form.value)
      .subscribe((res) => {
        this.toast.success('To-do created successfully.');
        this.event.emit();
        this.closeModal();
      });
  }

  closeModal() {
    this.modalService.hide();
  }
}
