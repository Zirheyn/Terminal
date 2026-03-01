---
title: Singularities AI
description: Interface Ollama local-first pour des conversations multi-modèles sécurisées, avec gestion des rôles et personnalisation avancée.
tags: [ai, llm, ollama, nuxt, spring-boot, postgres, self-hosted]
stack: [nuxt, spring-boot, postgresql]
year: 2025
active: false
cover: /projects/singularities.webp
links:
  repo: https://github.com/Singularities-AI/singularities-ai
---

## Contexte du projet

Singularities AI est né d’un besoin concret : intégrer des fonctionnalités LLM sans exposer des données internes à des APIs externes.

Le projet mise sur une exécution local-first, un contrôle d’accès clair, et une expérience suffisamment simple pour des équipes non spécialisées.

Singularities AI est une plateforme web self-hosted qui permet de travailler avec des modèles IA textuels de manière sécurisée, personnalisable et orientée production.

## Positionnement produit

Singularities AI est pensé comme un espace de travail IA opérationnel, pas seulement comme une interface de chat de démonstration.

### Disponible aujourd’hui

- **Configuration simple** : mise en place rapide avec un modèle de configuration clair et des paramètres flexibles
- **Chat avec l’IA** : conversations naturelles avec des modèles propulsés par Ollama
- **Agents** : automatisation de tâches et de workflows avec des rôles d’agents dédiés
- **Contexte personnalisé** : instructions globales ou par conversation pour adapter le comportement des modèles
- **Conversations multi-modèles** : bascule et comparaison des sorties dans un même workflow
- **Restriction par domaine** : limitation de l’accès aux environnements de confiance
- **Support multilingue** : pensé pour des équipes internationales
- **Design responsive** : expérience fluide sur desktop, tablette et mobile

### Bientôt disponible

- **Local RAG** : recherche et génération à partir de sources locales uniquement
- **Permissions granulaires** : contrôle fin des accès par fonctionnalité et par rôle
- **Recherche web** : enrichissement en temps réel avec une chaîne de données contrôlée

## Architecture

La plateforme est organisée en quatre couches :

1. **Espace frontend** : une application Nuxt pour les interfaces chat, compte et administration
2. **Couche API/sécurité** : un backend Spring Boot pour l’authentification, les permissions et l’orchestration
3. **Couche d’inférence** : Ollama pour l’exécution locale des modèles
4. **Couche données** : PostgreSQL pour la persistance applicative

Cette architecture sépare les responsabilités et facilite le durcissement en production.

## Sécurité et exploitation

Singularities AI est construit autour de la confidentialité et de la maîtrise du déploiement :

- Exécution locale des LLM pour limiter l’exposition des données
- Authentification centralisée et gestion des rôles côté API
- Configuration adaptée aux infrastructures privées
- Code source source-available pour audit et extension
- Approche orientée entreprise autour de la sécurité et de la souveraineté des données

## État actuel

Le projet évolue activement avec une priorité claire : stabilité, contrôles orientés entreprise, et livraison incrémentale de nouvelles fonctionnalités.

Besoin d’un plan entreprise ou de fonctionnalités sur mesure ? Contactez l’équipe.

## Prochaines étapes

- Livrer le Local RAG pour les workflows de connaissance privée
- Déployer les permissions granulaires pour les équipes enterprise
- Ajouter la recherche web avec contrôle de la chaîne de données
- Continuer le durcissement du déploiement et de l’observabilité

## Liens externes

- Repository : [singularities-ai](https://github.com/Singularities-AI/singularities-ai)
