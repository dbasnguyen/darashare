import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, DatePipe, NgClass, CommonModule } from '@angular/common';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, NgClass],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {

  files: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;

    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:3000/files/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.files = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger votre historique.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteFile(file: any) {
    const confirmDelete = confirm(
      `Voulez-vous vraiment supprimer le fichier "${file.originalName}" ?`
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    this.http.delete(`http://localhost:3000/files/${file.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.loadHistory(),
      error: () => alert('Erreur lors de la suppression du fichier.'),
    });
  }

  deleteAll() {
    const confirmDelete = confirm(
      "Voulez-vous vraiment supprimer TOUS vos fichiers ?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    this.http.delete('http://localhost:3000/files/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.loadHistory(),
      error: () => alert('Erreur lors de la suppression de tous les fichiers.'),
    });
  }

  downloadFile(f: any) {

  // CAS 1 : fichier protégé → redirection vers la page Download
  if (f.passwordProtected) {
    window.location.href = `http://localhost:4200/download/${f.downloadToken}`;
    return;
  }

  // CAS 2 : fichier non protégé → téléchargement direct via POST
  this.uploadService.downloadFile(f.downloadToken).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = f.originalName;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err: any) => {
      console.error(err);
      alert('Erreur lors du téléchargement.');
    }
  });
}


  copyLink(f: any) {
    const link = `http://localhost:4200/download/${f.downloadToken}`;
    navigator.clipboard.writeText(link);
    alert("Lien copié !");
  }

  getStatusLabel(file: any): string {
    return file.isExpired ? 'Expiré' : 'Valide';
  }

  getStatusClass(file: any): string {
    return file.isExpired ? 'status-expired' : 'status-valid';
  }
}
