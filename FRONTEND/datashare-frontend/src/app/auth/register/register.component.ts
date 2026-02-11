import { Component, ChangeDetectorRef } from '@angular/core';  // Ajout pour REFRESH ANGULAR
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef   // <-- Injection pour refresh ecran 
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    // --- VALIDATIONS ---
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.cdr.detectChanges();  // Ajout pour REFRESH ANGULAR
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      this.cdr.detectChanges();  // Ajout pour REFRESH ANGULAR
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
      this.cdr.detectChanges();  // Ajout pour REFRESH ANGULAR
      return;
    }

    // --- APPEL API ---
    this.http
      .post('http://localhost:3000/auth/register', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Compte créé avec succès !';
          this.cdr.detectChanges(); // Ajout pour REFRESH ANGULAR

          setTimeout(() => this.router.navigate(['/login']), 1500);
        },

        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'Cet email est déjà utilisé.';
          } else if (err.status === 400) {
            this.errorMessage = 'Requête invalide.';
          } else {
            this.errorMessage =
              'Une erreur est survenue. Veuillez réessayer.';
          }

          this.cdr.detectChanges();   // <-- Mise à jour immédiate
        },
      });
  }
}
