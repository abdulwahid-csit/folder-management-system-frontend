import { Component, HostListener } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userName: string = '';
  todoCounts: any

  constructor(
    private localStoreService: LocalStoreService,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.localStoreService.getUserName();
    this.getTodoCounts();
    this.getFolders();
  }

  getTodoCounts(){
    this.crudService.read('todo/todo-counts').subscribe(res => {
      this.todoCounts = res;
      console.log('todo counts: ', this.todoCounts);
    });
  }

  modalRef!: BsModalRef;

  openTodoList() {
    this.modalRef = this.modalService.show(TodoListComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
      },
    });

    this.modalRef?.content?.event.subscribe(() => {
      this.getTodoCounts();
    })
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
        status: status
      },
    });
    this.modalRef.content?.event.subscribe(() => {
      this.getTodoCounts();
    })
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
    })
  }

  folders: any

  getFolders(){
     this.crudService.read('folder/folders', null, undefined, 5).subscribe((res) => {
       this.folders = res?.folders;
       console.log('Folders: ', this.folders);
     }, error => {
      console.log('error: ', error);
     });
  }

  details(id: string | number) {
    this.router.navigate(['layout/user/details', id]);
  }
}
