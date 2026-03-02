---
title: Backend - Essentials API
description: "Apprendre les fondamentaux backend API independants du framework: architecture en couches, configuration, validation et contrats d'erreur coherents."
date: 2025-01-14
tags: [java, backend, api, architecture]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Une API backend doit rester maintenable quand le produit grossit.
L'architecture et les contrats sont plus importants que le framework choisi.

## Architecture en couches (agnostique framework)

Base pratique:

- Couche transport: entree/sortie HTTP
- Couche application/service: regles metier
- Couche acces donnees: persistance

Chaque couche doit garder une responsabilite claire.

## DTOs et contrats

Expose des DTOs aux frontieres de l'API.
N'expose pas directement les modeles de persistance.

```java
public record CreateUserRequest(String username, String email) {}
public record UserResponse(Long id, String username, String email) {}
```

Cela evite de coupler l'API au modele de stockage.

## Strategie de validation

Valider tot, a la frontiere:

- champs obligatoires
- contraintes de format
- preconditions metier

```java
public record CreateUserRequest(String username, String email) {
    public void validate() {
        if (username == null || username.isBlank()) throw new IllegalArgumentException("username required");
        if (email == null || !email.contains("@")) throw new IllegalArgumentException("invalid email");
    }
}
```

## Contrat de gestion d'erreurs

Utiliser une forme d'erreur unique sur tous les endpoints.

```java
public record ErrorResponse(String code, String message, String requestId) {}
```

Benefices:

- handling client plus simple
- monitoring/alerting plus propre
- comportement API predictible

## Configuration et environnements

Externalise la config au lieu de la coder en dur:

- port
- URL base de donnees
- API keys/secrets
- feature flags

Environnements typiques:

- local
- staging
- production

## Logs et tracabilite

Inclure un request ID et des champs de contexte stables dans les logs.
Le debug production devient beaucoup plus rapide.

## Erreurs frequentes

- logique metier dans la couche transport
- validation dupliquee a plusieurs endroits
- formats d'erreur incoherents
- config d'environnement melangee au code source

## A retenir

1. Concevoir avec des frontieres de couches claires
2. Garder des contrats API explicites avec DTOs
3. Valider aux frontieres et uniformiser les erreurs
4. Garder une configuration externe et adaptee a l'environnement
