import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/files';

  constructor(private http: HttpClient) {}

  // ============================================================
  // 📤 UPLOAD — Avec mot de passe optionnel
  // ============================================================
  uploadFile(file: File, days: number, password?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('expirationDays', days.toString());

    if (password && password.trim().length > 0) {
      formData.append('password', password);
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/upload`, formData, { headers });
  }

  // ============================================================
  // 📥 INFO — Métadonnées d’un fichier
  // ============================================================
  getFileInfo(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/info/${token}`);
  }

  // ============================================================
  // 📥 DOWNLOAD — POST + password → Blob
  // ============================================================
  downloadFile(token: string, password?: string): Observable<Blob> {
    return this.http.post(
      `${this.apiUrl}/download/${token}`,
      { password: password || null },
      { responseType: 'blob' }
    );
  }
}
