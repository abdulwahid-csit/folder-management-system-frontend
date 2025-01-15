import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class profileRoutingModule{};
