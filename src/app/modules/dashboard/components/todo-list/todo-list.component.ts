import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isSchedule: any;
  mode = '';
  isLoading = false;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();
  minDate = new Date();
  form!: FormGroup;
  scheduleForm!: FormGroup;
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
    this.initScheduleForm();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      reminderDate: new FormControl(new Date()),
    });
  }

  initScheduleForm() {
    this.scheduleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startTime: new FormControl('09:00', [Validators.required]),
      endTime: new FormControl('18:00', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('active', [Validators.required]),
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
        this.event.emit(true);
        this.closeModal();
      });
  }

  closeModal() {
    this.modalService.hide();
  }

  generateTimeArray(): string[] {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const time = `${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`;
        times.push(time);
      }
    }

    return times;
  }

  submitSchedule(){
    if(this.scheduleForm.invalid){
      this.toast.error("Please fill all fields.");
      return;
    }

    this.crudSerice
      .create('schedule/add-schedule', this.scheduleForm.value)
      .subscribe((res) => {
        this.toast.success('To-do created successfully.');
        this.event.emit(true);
        this.closeModal();
      });
  };
}
