import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'settings', component:SettingsComponent},
  {path:'add-todo', component:TodoListComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
