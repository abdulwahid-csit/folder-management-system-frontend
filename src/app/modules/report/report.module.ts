import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutes } from './report.routing';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutes,
    NgxChartsModule
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
