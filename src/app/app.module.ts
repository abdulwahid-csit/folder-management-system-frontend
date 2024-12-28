import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthInterceptor } from './interceptors/auth';
import { ErrorInterceptor } from './interceptors/error';
import {ToastrModule} from 'ngx-toastr';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { CustomStorageEngine } from './shared/services/custom-storage.engine';
import { OrganizationState } from './modules/organization/state/organization.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    // AuthenticationModule,
    NgSelectModule,
    // NgxsLoggerPluginModule.forRoot(),
    // NgxsReduxDevtoolsPluginModule.forRoot()
    NgxsModule.forRoot([OrganizationState]),
    NgxsStoragePluginModule.forRoot({
      keys: ['organizations']
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true,
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,  multi: true },
    { provide: STORAGE_ENGINE, useClass: CustomStorageEngine }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
