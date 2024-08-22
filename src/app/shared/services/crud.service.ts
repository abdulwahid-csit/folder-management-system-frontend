import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  read(endpoint: string, id?: number): Observable<any | any[]> {
    let url = `${this.apiUrl}${endpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<any | any[]>(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${endpoint}/${id}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.error.errors[0]));
  }
}
