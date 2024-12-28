import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DataTableComponent,
    PaginationComponent,
    DeleteModalComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [DataTableComponent, NotFoundComponent],
  providers: [BsDatepickerConfig],
})
export class SharedModule {}
