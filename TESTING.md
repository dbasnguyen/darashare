# TESTING.md — Plan de tests et couverture

## 1. Objectifs
Garantir la stabilité, la fiabilité et l’absence de régressions sur les fonctionnalités critiques :
- Authentification
- Upload de fichiers
- Téléchargement sécurisé
- Suppression
- Historique

## 2. Types de tests
### 2.1 Tests unitaires
- AuthService
- FilesService
- Hash bcrypt
- Vérification expiration
- Vérification propriétaire

### 2.2 Tests d’intégration
- Upload multipart
- Download POST + Blob
- Routes protégées par JWT

### 2.3 Tests End-to-End (E2E)
- Parcours complet utilisateur :
  1. Register
  2. Login
  3. Upload
  4. Download
  5. Delete

## 3. Couverture
- Objectif : 70% minimum
- Rapport généré via Jest

## 4. Résultats
- Tests exécutés avec succès
- Aucun bug bloquant détecté

## 5. Conclusion
La plateforme est stable, testée et prête pour démonstration.
