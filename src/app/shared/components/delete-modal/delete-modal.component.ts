import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Output() deleteData = new EventEmitter();
  @Input() description: string = '';
  @Input() isLoading: boolean = false;
  
  constructor(private modalService: BsModalService) {}

  closeModal(): void {
    this.modalService.hide();
  }

  delete(){
    this.deleteData.emit();
  }
}
