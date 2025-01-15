import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AbouteRoutes } from './aboute.routing';

@NgModule({
  imports: [
    CommonModule,
    AbouteRoutes
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
