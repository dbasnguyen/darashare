import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Sauvegarde du token JWT dans le navigateur
  save(token: string) {
    localStorage.setItem('token', token);
  }

  // Récupération du token
  get() {
    return localStorage.getItem('token');
  }

  // Suppression du token (déconnexion)
  clear() {
    localStorage.removeItem('token');
  }
}
