import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnChanges {
  isLoading = false;
  @Input() title: string = 'Pending Tasks';
  @Input() data: any;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  closeModal() {
    this.modalService.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.data
  }
}
