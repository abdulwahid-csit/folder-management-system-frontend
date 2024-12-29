import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnChanges {
  isLoading = false;
  @Input() title: string = '';
  @Input() data: any;
  @Input() status: any = true;
  @Output() event = new EventEmitter<any>();

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

  ngOnChanges(changes: SimpleChanges): void {
    this.crudService.read('todo/todo', null, this.status).subscribe(
      (res) => {
        console.log('res: -> ', res.todos);
        this.data = res.todos;
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  getTodos() {
    this.crudService.read('todo/todo', null, this.status).subscribe(
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

  deleteTodo(id: string){
     this.crudService.delete('todo/todo', id).subscribe(
       (res) => {
         this.toast.success('Todo deleted successfully.');
         this.getTodos();
         this.event.emit(true);
       },
       (error) => {
         console.log('error: ', error);
       }
     );
  };
}
