import { Component } from '@angular/core';
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
export class Register {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    this.http
      .post('http://localhost:3000/auth/register', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Compte créé avec succès !';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Impossible de créer le compte.';
        },
      });
  }
}
