import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { LegendOptions } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { data } from '../../../shared/services/data/data'
import { CreateUserComponent } from '../../user/create-user/create-user';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { CreateFolderComponent } from '../../user/create-folder/create-folder.component';
import { TodoDetailsComponent } from '../../application/todo-details/todo-details.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('scheduleForm') scheuldeForm!: TemplateRef<any>;
  userName: string = '';
  todoCounts: any;
  form!: FormGroup;

  constructor(
    private localStoreService: LocalStoreService,
    private crudService: CrudService,
    private modalService: BsModalService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.localStoreService.getUserName();
    this.getTodoCounts();
    this.getFolders();
    this.getSchedules();
    this.getSharedFolders();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      reminderDate: new FormControl(new Date()),
    });
  }

  getTodoCounts() {
    this.crudService.read('todo/todo-counts').subscribe((res) => {
      this.todoCounts = res;
      console.log('todo counts: ', this.todoCounts);
    });
  }

  modalRef!: BsModalRef;

  openTodoList(isSchedule = false) {
    this.modalRef = this.modalService.show(TodoListComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
        isSchedule,
      },
    });

    this.modalRef?.content?.event.subscribe(() => {
      this.getTodoCounts();
      this.getSchedules();
    });
  }

  todoData: any;

  openTodoDetailsList(title: string, status?: string) {
    this.modalRef = this.modalService.show(TodoDetailsComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        title: title,
        data: this.todoData,
        status: status,
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getTodoCounts();
    });
  }

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

  folders: any;

  getFolders() {
    this.crudService.read('folder/folders', null, undefined, 5).subscribe(
      (res) => {
        this.folders = res?.folders;
        console.log('Folders: ', this.folders);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  details(id: string | number) {
    this.router.navigate(['layout/folders/details', id]);
  }

  sharedFolders: any[] = [];
  getSharedFolders() {
    this.crudService
      .read('folder/shared-folders', null, undefined, 5)
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

  closeModal() {
    this.modalService.hide();
  }

  isLoading = false;
  submit() {
    console.log('this form', this.form.value);
  }

  addSchedule() {
    this.modalRef = this.modalService.show(this.scheuldeForm, {
      class: 'modal modal-dialog modal-dialog-centered modal-lg',
      // backdrop: 'static',
      // keyboard: false,
    });
  }

  schedules: any;
  getSchedules() {
    this.crudService.read('schedule/schedules').subscribe((res) => {
      this.schedules = res?.schedules;
      console.log('Schedules are: ', this.todoCounts);
    });
  }

  currentUserId!: string;
  openDeleteModal(id: string) {
    this.currentUserId = id;
    const message = 'Are You want to delete this user?';
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteSchedule();
    });
  }

  deleteSchedule() {
    this.crudService.delete('schedule/delete-schedule', this.currentUserId).subscribe(
      (x) => {
        this.closeModal();
        this.toast.success('Schedule deleted Successfully.');
        this.getSchedules();
      },
      (e) => {
        console.log('error while deleting user.', e);
      }
    );
  }
}
