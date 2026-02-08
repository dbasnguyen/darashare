# SECURITY.md — Analyse de sécurité

## 1. Objectifs
Garantir la confidentialité, l’intégrité et la sécurité des données.

## 2. Mécanismes de sécurité
- Hash bcrypt pour les mots de passe utilisateurs
- Hash bcrypt pour les mots de passe fichiers
- JWT pour toutes les routes privées
- Vérification stricte du propriétaire
- Validation DTO systématique
- CORS configuré
- Aucun mot de passe en clair
- Aucun GET pour les fichiers protégés

## 3. Audit de sécurité
Commande exécutée :
npm audit

## 4. Résultats
- Vulnérabilités corrigées automatiquement
- Vulnérabilités restantes analysées et jugées non critiques pour un MVP local

## 5. Recommandations futures
- Passage à HTTPS
- Stockage S3 avec signatures temporaires
- Rotation des clés JWT
