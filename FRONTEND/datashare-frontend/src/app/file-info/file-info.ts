import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { NgIf, DatePipe, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommentListComponent } from '../comments/comment-list.component';


@Component({
  selector: 'app-file-info',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    JsonPipe,
    HttpClientModule,
    CommentListComponent 
  ],
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.scss']
})
export class FileInfo {

  fileInfo: any = null;
  token: string = '';
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef   // ✅ AJOUT ICI
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
    console.log("📡 Token reçu :", this.token);

    this.uploadService.getFileInfo(this.token).subscribe({
      next: (data: any) => {
        console.log("📦 FileInfo reçu :", data);
        this.fileInfo = data;
        this.loading = false;
        this.cdr.detectChanges();   // ✅ FORCE LA MISE À JOUR DU TEMPLATE
      },
      error: (err: any) => {
        console.log("❌ ERREUR API :", err);
        this.errorMessage = 'Impossible de charger les informations du fichier.';
        this.loading = false;
        this.cdr.detectChanges();   // ✅ FORCE LA MISE À JOUR DU TEMPLATE
      }
    });
  }

  download() {
    window.open(`http://localhost:3000/files/download/${this.token}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(`http://localhost:3000/files/download/${this.token}`);
    alert('Lien copié dans le presse‑papier');
  }
}
