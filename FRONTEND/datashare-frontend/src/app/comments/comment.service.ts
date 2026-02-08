/**
 * Comment Service
 * This service communicates with the backend API to:
 * - Add a comment
 * - List comments for a file
 * - Delete a comment
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  addComment(token: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${token}`, { content });
  }

  getComments(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${token}`);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
