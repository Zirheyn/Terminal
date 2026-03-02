---
title: Delivery - Docker et CI/CD
description: Apprendre a containeriser une app Java et construire des pipelines CI/CD pratiques avec des strategies de deploiement sures.
date: 2025-01-18
tags: [java, delivery, docker, cicd]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Livrer un logiciel de facon fiable est aussi important que l'ecrire.
Docker et la CI/CD rendent les builds reproductibles et les deploiements plus surs.

## Containeriser l'application

Pattern Dockerfile typique Java :

```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Utilise des images runtime legeres et controle la taille finale.

## Essentiels d'un pipeline CI

Un pipeline de base doit executer :

1. verifications lint/format
2. tests unitaires
3. build du package
4. tests d'integration optionnels
5. build et publication d'image

Echouer rapidement sur les quality gates.

## CD et strategie de deploiement

Strategies courantes :

- rolling update
- blue/green
- canary

### Rolling update

On remplace progressivement les anciennes instances par les nouvelles.
Le trafic continue pendant la mise a jour, sans coupure totale.

Points forts:

- simple a mettre en place sur la plupart des plateformes
- peu de ressources supplementaires necessaires

Limite:

- rollback parfois plus lent, car l'ancien et le nouveau se melangent pendant la transition

### Blue/Green

On maintient deux environnements complets:

- `blue` = version actuelle en production
- `green` = nouvelle version prete

Quand `green` est valide, on bascule tout le trafic d'un coup.

Points forts:

- rollback tres rapide (on repointe vers `blue`)
- risque reduit pendant la bascule

Limite:

- cout infra plus eleve (double environnement)

### Canary

On envoie d'abord une petite part de trafic (ex: 5%) vers la nouvelle version.
Si les metriques restent bonnes, on augmente progressivement (20%, 50%, 100%).

Points forts:

- detection precoce des regressions reelles
- impact limite en cas de probleme

Limite:

- demande une bonne observabilite (logs, metriques, alertes) et un routage fin du trafic

Commence simple, puis ajoute un deploiement progressif selon les besoins.

## Gestion des environnements

Conserver secrets et config hors des images.
Utiliser un secret store de plateforme ou la gestion de secrets CI.

## Erreurs frequentes

- deploiement depuis des machines developpeur
- absence de quality gates avant mise en prod
- tags d'image mutables sans tracabilite
- pas de strategie de rollback

## A retenir

1. Build une fois, deployer de facon coherente
2. Automatiser tests et packaging en CI
3. Utiliser une strategie de rollout sure en CD
4. Garder un deploiement observable et reversible
