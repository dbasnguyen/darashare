# 📦 DataShare — Backend API (NestJS + PostgreSQL)

DataShare est une API backend permettant l’upload et le téléchargement sécurisé de fichiers via un lien temporaire.  
Le projet utilise **NestJS**, **TypeORM**, **PostgreSQL**, **JWT**, et **Multer** pour la gestion des fichiers.

---

## 🚀 Fonctionnalités principales

### 🔐 Authentification (JWT)
- Inscription : `POST /auth/register`
- Connexion : `POST /auth/login`
- Génération d’un token JWT
- Protection des routes via `JwtAuthGuard`

### 📤 Upload de fichiers
- Upload via `POST /files/upload`
- Accessible uniquement aux utilisateurs authentifiés
- Stockage physique dans `/uploads`
- Sauvegarde des métadonnées en base

### 📥 Téléchargement sécurisé
- Téléchargement via token unique : `GET /files/download/:token`
- Expiration automatique du lien (24h)
- Vérification du token + expiration

---

## 🗄️ Modèle de données

### **User**
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| email | string | Unique, utilisé pour le login |
| password | string | Hashé (bcrypt) |
| files | relation | OneToMany → File |
| created_at | date | Auto |
| updated_at | date | Auto |

### **File**
| Champ | Type | Description |
|-------|------|-------------|
| id | number | Identifiant unique |
| filename | string | Nom stocké physiquement |
| originalName | string | Nom d’origine |
| mimeType | string | Type MIME |
| size | number | Taille en octets |
| owner | relation | ManyToOne → User |
| tags | string[] | Optionnel |
| downloadToken | string | Token unique |
| downloadTokenExpiresAt | date | Expiration du lien |
| createdAt | date | Auto |
| updatedAt | date | Auto |

---

## 🛠️ Technologies utilisées

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Multer**
- **JWT**
- **bcrypt**
- **Node.js**

---

## ⚙️ Installation & Démarrage

### 1️⃣ Cloner le projet
```bash
git clone <url-du-repo>
cd datashare/backend

### 2️⃣ Installer les dépendances
```bash
npm install

### 3️⃣ Configurer les variables d’environnement
## Créer un fichier .env :

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=datashare
JWT_SECRET=super-secret-key
PORT=3000

4️⃣ Lancer le backend
npm run start:dev
Le backend démarre sur :
👉 http://localhost:3000


src/
 ├── auth/
 │    ├── auth.controller.ts
 │    ├── auth.service.ts
 │    ├── auth.module.ts
 │    └── strategies/jwt.strategy.ts
 │
 ├── users/
 │    ├── user.entity.ts
 │    ├── users.service.ts
 │    └── users.module.ts
 │
 ├── files/
 │    ├── file.entity.ts
 │    ├── files.service.ts
 │    ├── files.controller.ts
 │    └── files.module.ts
 │
 ├── app.module.ts
 └── main.ts

uploads/   ← stockage physique des fichiers



