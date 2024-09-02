import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';

interface RegisterUser{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
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

  signUp(body: RegisterUser): Observable<any>{
    // const body = {email,password,username};
    return this.http.post(`${environment.apiUrl}auth/signup`, body);
  }

  register(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

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

  verifyLink(endPoint: string, data: any): Observable<any> {
    return this.http.post(environment.apiUrl + endPoint, data);
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.error.errors[0]));
  }
}
