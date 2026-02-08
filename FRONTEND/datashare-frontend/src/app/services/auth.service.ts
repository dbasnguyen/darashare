import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // --- US04 : Connexion ---
  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  // --- US03 : Création de compte ---
  register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, { email, password });
  }

  // --- Stockage du JWT ---
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // --- Vérifier si connecté ---
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // --- Extraire l’email depuis le JWT ---
  getEmail(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || '';
    } catch {
      return '';
    }
  }

  // --- Déconnexion ---
  logout() {
    localStorage.removeItem('token');
  }
}
