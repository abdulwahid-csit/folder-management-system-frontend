import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Intercept HTTP requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add new headers
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json', // Example header
        'Authorization': `Bearer ${this.getToken()}` // Example header with token
      }
    });

    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }

  // Retrieve the token from local storage or any other secure place
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
