import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutes } from './report.routing';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutes
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
