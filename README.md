# DataShare  
Application web de partage de fichiers sécurisée  
**Frontend : Angular**  
**Backend : NestJS**  
**Base de données : PostgreSQL**

---

## 📌 1. Présentation du projet

DataShare est une application web permettant :

- l’authentification sécurisée des utilisateurs  
- le téléversement de fichiers  
- la génération de liens de téléchargement  
- la protection optionnelle par mot de passe  
- la gestion de l’historique des fichiers  
- le téléchargement sécurisé via token  

L’objectif est de proposer une expérience simple, fluide et sécurisée pour partager des fichiers.

---

## 📌 2. Architecture globale

### 🟦 Frontend (Angular)
- Composants : Login, Register, Upload, Download, History, Home  
- Services : AuthService, UploadService  
- Routing : /login, /register, /upload, /download/:token, /history  

### 🟦 Backend (NestJS)
- Modules : AuthModule, UsersModule, FilesModule  
- Controllers : AuthController, FilesController  
- Services : AuthService, UsersService, FilesService  
- Sécurité : JWT Guard, bcrypt, ValidationPipe  

### 🟦 Base de données (PostgreSQL)
Tables utilisées :
- `users`
- `files`

Relation :  
`User (1) ---- (N) File`

---

## 📌 3. Installation et exécution

### 🟦 Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### 🟦 Frontend

```bash
cd FRONTEND/datashare-frontend
npm install
ng serve
```

L’application sera disponible sur :  
👉 http://localhost:4200

---

## 📌 4. Scripts SQL

Les scripts se trouvent dans `/scripts` :

- `init_db.sql`  
- `create_tables.sql`  
- `seed_admin.sql` (optionnel)

---

## 📌 5. Documentation API

### 🔹 Auth

**POST /auth/register**  
Créer un utilisateur.

**POST /auth/login**  
Retourne un JWT.

### 🔹 Files

**POST /files/upload**  
Upload multipart + options.

**GET /files/info/:token**  
Métadonnées du fichier.

**POST /files/download/:token**  
Téléchargement sécurisé.

**GET /files/my**  
Liste des fichiers de l’utilisateur.

**DELETE /files/:id**  
Supprimer un fichier.

---

## 📌 6. Sécurité

- Hash bcrypt pour tous les mots de passe  
- JWT obligatoire pour toutes les routes privées  
- Vérification stricte du propriétaire  
- Validation DTO systématique  
- Aucun fichier protégé accessible en GET  
- Vérification d’expiration des tokens  

---

## 📌 7. Tests & Qualité

Tests réalisés :

- Unitaires : AuthService, FilesService  
- Intégration : Upload, Download  
- E2E : Parcours complet utilisateur  
- Couverture > 70 %  

Fichiers associés :

- TESTING.md  
- SECURITY.md  
- PERF.md  
- MAINTENANCE.md  

---

## 📌 8. Utilisation de l’IA

L’IA a été utilisée :

- pour générer des squelettes de composants  
- pour accélérer la mise en place du flux US05 (téléchargement sécurisé)  
- sous supervision humaine stricte  

Toutes les contributions IA ont été revues, corrigées et validées manuellement.

---

## 📌 9. Auteur

**Nguyen Quang**  
DBA & Développeur Web Fullstack (Angular / NestJS)
