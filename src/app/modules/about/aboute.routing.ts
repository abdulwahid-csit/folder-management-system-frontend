import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: "", component: AboutComponent },
];

export const AbouteRoutes = RouterModule.forChild(routes);
