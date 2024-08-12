import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

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


        console.error('HTTP Error:', error);


        return throwError(error);
      })
    );
  }
}
