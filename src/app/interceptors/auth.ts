import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStoreService } from '../shared/services/local-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private localStoreService: LocalStoreService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }
    });


    return next.handle(authReq);
  }


  private getToken(): string | null {
    return this.localStoreService.getItem('access_token');
  }
}
