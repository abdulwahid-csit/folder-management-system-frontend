import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '',
     loadChildren: () =>
      import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
   { path: '',
     loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
