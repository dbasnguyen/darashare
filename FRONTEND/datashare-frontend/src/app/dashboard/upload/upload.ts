import { Component, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.scss'],
  imports: [
    NgIf,
    FormsModule,
    RouterLink
  ]
})
export class Upload {

  selectedFile: File | null = null;
  expirationDays = 7;

  // ⭐ Nouveau : mot de passe optionnel
  password: string = '';

  isLoading = false;
  isUploaded = false;

  errorMessage = '';
  token = '';
  expiresAt = '';

  constructor(
    private uploadService: UploadService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('UPLOAD COMPONENT INIT');
    this.resetForm();
  }

  resetForm() {
    this.selectedFile = null;
    this.expirationDays = 7;
    this.password = '';   // ⭐ reset du mot de passe
    this.isLoading = false;
    this.isUploaded = false;
    this.errorMessage = '';
    this.token = '';
    this.expiresAt = '';
    this.cdr.detectChanges();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.cdr.detectChanges();
    }
  }

  send() {
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier.';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.isUploaded = false;
    this.errorMessage = '';
    this.token = '';
    this.expiresAt = '';
    this.cdr.detectChanges();

    console.log('Sending file...');

    // ⭐ Envoi du mot de passe au service
    this.uploadService.uploadFile(
      this.selectedFile,
      this.expirationDays,
      this.password   // ⭐ NOUVEAU
    )
    .subscribe({
      next: (response: any) => {
        this.isLoading = false;

        console.log('Backend response received:', response);

        if (!response || !response.downloadUrl || !response.expiresAt) {
          this.errorMessage = 'Réponse invalide du serveur.';
          this.cdr.detectChanges();
          return;
        }

        this.token = response.downloadUrl.split('/').pop()!;
        this.expiresAt = new Date(response.expiresAt).toLocaleString();
        this.isUploaded = true;

        console.log('SUCCESS: isUploaded =', this.isUploaded);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de l’envoi du fichier.';
        console.log('Backend error:', err);
        this.cdr.detectChanges();
      }
    });
  }

  copyLink() {
    const url = `http://localhost:4200/download/${this.token}`;
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse‑papier');
  }

  refreshPage() {
    window.location.reload();
  }

}
