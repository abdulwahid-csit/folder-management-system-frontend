import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutes } from './report.routing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutes,
    NgxChartsModule,
    FormsModule
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
