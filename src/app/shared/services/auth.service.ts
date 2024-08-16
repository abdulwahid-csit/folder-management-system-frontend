import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  storeTokens(accessToken: string, refreshToken: string, expiresIn: string) {

    const expiresInHours = parseInt(expiresIn, 10);
    const expiresInMillis = expiresInHours * 60 * 60 * 1000;


    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    const expiryTimestamp = new Date().getTime() + expiresInMillis;
    localStorage.setItem('token_expiry', expiryTimestamp.toString());
  }

  getAccessToken() {
    return localStorage.getItem('access_token');

  }


  logout() {
    localStorage.clear;
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
  
}
