import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
// import { InlineSVGModule } from 'ng-inline-svg';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
// import { DeleteModalComponent } from './delete-modal/delete-modal.component'
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DataTableComponent,
    PaginationComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    DataTableComponent,
  ]
})
export class SharedModule { }
