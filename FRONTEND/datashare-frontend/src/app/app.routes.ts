import { Routes } from '@angular/router';

// Auth pages
import { Login } from './auth/login/login';
import { RegisterComponent } from './auth/register/register.component';

// Main pages
import { Home } from './home/home';
import { Upload } from './dashboard/upload/upload';
import { HistoryComponent } from './history/history.component';

// Download pages
import { Download } from './download/download/download';

// Error pages
import { Error } from './error/error/error';
import { NotFound } from './not-found/not-found';

// Guard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  // -------------------------
  // AUTHENTIFICATION
  // -------------------------
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },

  // -------------------------
  // PAGES PRINCIPALES
  // -------------------------
  { path: 'home', component: Home },
  { path: 'upload', component: Upload, canActivate: [authGuard] },

  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.component').then(m => m.HistoryComponent),
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always'
  },

  // -------------------------
  // TÉLÉCHARGEMENT
  // -------------------------

  // 1) Page SANS token → champ "Collez votre lien"
  { path: 'download', component: Download },

  // 2) Page AVEC token → infos du fichier
  {
    path: 'download/:token',
    component: Download,
    runGuardsAndResolvers: 'always'
  },

  // Page intermédiaire FileInfo
  {
    path: 'fichier/:token',
    loadComponent: () =>
      import('./file-info/file-info').then(m => m.FileInfo)
  },

  // -------------------------
  // ERREURS
  // -------------------------
  { path: 'error', component: Error },

  // -------------------------
  // REDIRECTION PAR DÉFAUT
  // -------------------------
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // -------------------------
  // 404
  // -------------------------
  { path: '**', component: NotFound }
];
