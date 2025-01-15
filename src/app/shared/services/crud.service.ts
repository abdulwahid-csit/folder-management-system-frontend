import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStoreService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${endpoint}`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private getHeadersformultipartformdata(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
  }
  createContent(endpoint: string, data: any) {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

  read(
    endpoint: string,
    id?: number | null | string,
    status?: boolean | null,
    limit?: number | null,
    search?: string | null
  ): Observable<any | any[]> {
    let url = `${this.apiUrl}${endpoint}`;

    // If an ID is provided, add it to the URL
    if (id) {
      url += `?id=${id}`;
    }

    let params = new URLSearchParams();

    if (status !== undefined && status !== null) {
      params.set('status', String(status));
    }

    if (limit !== undefined && limit !== null) {
      params.set('limit', String(limit));
    }

    if (search !== undefined && search !== null && search !== '') {
      params.set('search', search);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.http
      .get<any | any[]>(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // update(endpoint: string, id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}${endpoint}/${id}`, data, { headers: this.getHeaders() })
  //     .pipe(catchError(this.handleError));
  // }
  update(
    endpoint: string,
    id?: number | string,
    data?: any,
    path?: string
  ): Observable<any> {
    let url = `${this.apiUrl}${endpoint}/${id}`;
    if (path) {
      url += `/${path}`;
    }
    return this.http
      .put(url, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string, id: number | string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error));
  }

  downloadFile(fileName: string) {
    const fileUrl = `${this.apiUrl}folder/downloadFile/${fileName}`;

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file:', error);
      }
    );
  }
}
