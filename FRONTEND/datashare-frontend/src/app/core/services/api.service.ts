import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

 upload(file: File, days: number) {
  const form = new FormData();
  form.append('file', file);
  form.append('days', days.toString());

  const token = localStorage.getItem('token');

  return this.http.post(
    `${environment.apiUrl}/files/upload`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}


  history() {
    return this.http.get(`${environment.apiUrl}/files/history`);
  }

  download(token: string) {
    return this.http.get(`${environment.apiUrl}/files/download/${token}`, {
      responseType: 'blob'
    });
  }
}
