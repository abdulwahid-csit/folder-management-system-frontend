import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStoreService } from '../shared/services/local-store.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private localStoreService: LocalStoreService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {

          errorMessage = `Client-side error: ${error.error.message}`;
        } else {

          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request. Please check your input.';
              break;
            case 401:
              if(error.error.message === "Your account is not active. Please contact support for further assistance."){
                this.localStoreService.removeItem();
                this.router.navigate(['']);
                break;
              }
              errorMessage = 'Unauthorized. Please log in again.';
              break;
            case 403:
              errorMessage = 'Forbidden. You do not have permission.';
              break;
            case 404:
              errorMessage = 'Not Found. The requested resource could not be found.';
              break;
            case 500:
              errorMessage = 'Internal Server Error. Please try again later.';
              break;
            case 502:
              errorMessage = 'Bad Gateway. Please try again later.';
              break;
            case 503:
              errorMessage = 'Service Unavailable. Please try again later.';
              break;
            case 504:
              errorMessage = 'Gateway Timeout. Please try again later.';
              break;
            default:
              errorMessage = `Unexpected error: ${error.message}`;
              break;
          }
        }


        // this.snackBar.open(errorMessage, 'Close', {
        //   duration: 5000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top'
        // });


        // console.error('HTTP Error:', error);


        return throwError(error);
      })
    );
  }
}
