import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule],
  templateUrl: './download.html',
  styleUrls: ['./download.scss']
})
export class Download implements OnInit {

  token: string | null = null;
  downloadLink = '';
  loading = false;
  errorMessage = '';
  fileInfo: any = null;

  needsPassword = false;
  password = '';
  wrongPassword = false;
  downloading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) this.checkFile();
  }

  checkFile() {
    this.loading = true;
    this.errorMessage = '';
    this.fileInfo = null;

    this.uploadService.getFileInfo(this.token!).subscribe({
      next: (info) => {
        this.fileInfo = info;
        this.needsPassword = info.passwordProtected;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Le fichier est introuvable ou expiré.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToDownload() {
    if (!this.downloadLink.includes('/download/')) {
      alert("Lien invalide.");
      return;
    }
    const token = this.downloadLink.split('/download/')[1].trim();
    this.router.navigate(['/download', token]);
  }

  download() {
    if (!this.token) return;

    this.downloading = true;
    this.wrongPassword = false;
    this.errorMessage = '';

    this.uploadService.downloadFile(this.token, this.password).subscribe({
      next: (blob) => {
        this.downloading = false;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileInfo.filename || this.fileInfo.originalName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloading = false;

        if (err.status === 401) {
          this.wrongPassword = true;
          this.errorMessage = 'Mot de passe incorrect';
        } else if (err.status === 410) {
          this.errorMessage = 'Le lien a expiré';
        } else if (err.status === 404) {
          this.errorMessage = 'Fichier introuvable';
        } else {
          this.errorMessage = 'Erreur lors du téléchargement';
        }
      }
    });
  }
}
