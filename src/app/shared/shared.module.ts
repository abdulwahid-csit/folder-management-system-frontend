import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
// import { InlineSVGModule } from 'ng-inline-svg';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DataTableComponent,
    PaginationComponent
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
