# MAINTENANCE.md — Procédures de maintenance

## 1. Mise à jour des dépendances
- npm outdated
- npm update
- Vérification manuelle des breaking changes

## 2. Maintenance de la base de données
- Sauvegarde régulière via pg_dump
- Migration via scripts SQL
- Vérification des index

## 3. Surveillance
- Logs NestJS
- Analyse des erreurs
- Suivi des temps de réponse

## 4. Procédure en cas de bug
1. Reproduire
2. Isoler
3. Corriger
4. Ajouter un test
5. Déployer

## 5. Risques à surveiller
- Dépendances obsolètes
- Tokens JWT trop longs
- Fichiers volumineux
