import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { TodoListComponent } from '../../dashboard/components/todo-list/todo-list.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent {
  isLoading = false;
  @Input() title: string = '';
  data: any[] = [];
  @Input() status: any = true;
  @Output() event = new EventEmitter<any>();
  modalRef!: BsModalRef;
  searchTerm: string = '';

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getTodos();
  }

  closeModal() {
    this.modalService.hide();
  }

  getTodos() {
    this.crudService.read('todo/todo').subscribe(
      (res) => {
        console.log('res: -> ', res.todos);
        this.data = res.todos;
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  changeStatus(id: string) {
    this.crudService.create('todo/complete-todo', { id: id }).subscribe(
      (res) => {
        this.toast.success('Todo status changed to completed.');
        this.getTodos();
        this.event.emit(true);
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  deleteTodo(id: string) {
    this.crudService.delete('todo/todo', id).subscribe(
      (res) => {
        this.toast.success('Todo deleted successfully.');
        this.getTodos();
        this.event.emit(true);
        this.closeModal();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  id: any;
  openDeleteModal(message: string, id?: string) {
    this.id = id;
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-dialog modal-dialog-centered modal-md common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        description: message,
      },
    });
    this.modalRef.content?.deleteData.subscribe(() => {
      this.deleteTodo(this.id);
    });
  }

  createTodo() {
    this.modalRef = this.modalService.show(TodoListComponent, {
      class: 'modal-dialog modal-dialog-centered modal-lg common_modal_shadow',
      backdrop: 'static',
      keyboard: false,
      initialState: {
        mode: 'update',
      },
    });

    this.modalRef?.content?.event.subscribe(() => {
      this.getTodos();
    });
  }
}
