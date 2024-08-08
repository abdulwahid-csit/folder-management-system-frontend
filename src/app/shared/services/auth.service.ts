import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  storeTokens(accessToken: string, refreshToken: string, expiresIn: string) {
    // Convert expiresIn to a number of milliseconds
    const expiresInHours = parseInt(expiresIn, 10);
    const expiresInMillis = expiresInHours * 60 * 60 * 1000;

    // Store tokens in local storage
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    // Store the expiry timestamp in local storage
    const expiryTimestamp = new Date().getTime() + expiresInMillis;
    localStorage.setItem('token_expiry', expiryTimestamp.toString());
  }


  // Remove tokens from cookies
  clearTokens() {
    localStorage.clear;
  }

  signIn(email:string, password:string): Observable<any>{
    const body= {email,password};
    return this.http.post(`${environment.apiUrl}/signin`, body );
  }
  // signUp(email:string, password:string, username:string): Observable<any>{
  //   const body = {email,password,username};
  //   return this.http.post(`${environment.apiUrl}/signup`, body);
  // }
}
