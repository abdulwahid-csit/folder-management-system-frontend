import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: "", component: ReportComponent },
  {path: "**", component: NotFoundComponent}
];

export const ReportRoutes = RouterModule.forChild(routes);
