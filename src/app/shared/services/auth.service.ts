import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStoreService: LocalStoreService
  ) {
  }

  storeTokens(accessToken: string, refreshToken: string, expiresIn: string, user: string) {

    const expiresInHours = parseInt(expiresIn, 10);
    const expiresInMillis = expiresInHours * 60 * 60 * 1000;
    const expiryTimestamp = new Date().getTime() + expiresInMillis;

    this.localStoreService.setItem('access_token', accessToken);
    this.localStoreService.setItem('refresh_token', refreshToken);
    this.localStoreService.setItem('token_expiry', expiryTimestamp.toString());
    this.localStoreService.setItem('user', user);

  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}auth/signin`, body);
  }

  // signUp(email:string, password:string, username:string): Observable<any>{
  //   const body = {email,password,username};
  //   return this.http.post(`${environment.apiUrl}api/v1/auth/signup`, body);
  // }

  getMember(): Observable<any> {
    return this.http.get(`${environment.apiUrl}member`,);
  }


  getMemberById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}member/${id}`,);
  }

  getMemberUpdate(id: number | string, memberData: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}member/${id}`, memberData );
  }
  getUserRole(): string {

    const userRole = 'Admin';
    return userRole;
  }

}
