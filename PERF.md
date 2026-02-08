# PERF.md — Analyse de performance

## 1. Objectif
Évaluer la performance des endpoints critiques :
- Upload
- Download

## 2. Méthodologie
Tests réalisés avec k6.

## 3. Résultats
### Upload
- Temps moyen : 120–180 ms
- Aucun timeout

### Download
- Temps moyen : 80–120 ms
- Aucun timeout

## 4. Logs
- Logs structurés NestJS activés
- Analyse des erreurs : aucune critique

## 5. Optimisations possibles
- Compression Gzip
- CDN pour les fichiers
- Mise en cache des métadonnées
