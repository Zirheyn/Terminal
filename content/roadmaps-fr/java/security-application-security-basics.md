---
title: Securite - Bases de la securite applicative
description: "Apprendre les fondamentaux de securite API independants du framework: authentification, autorisation, strategies token/session et durcissement des endpoints."
date: 2025-01-15
tags: [java, security, api, auth]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

La securite est un sujet d'architecture, pas un patch de fin de projet.
Des frontieres de securite faibles creent des incidents couteux en production.

## AuthN vs AuthZ

- Authentification (AuthN): qui appelle?
- Autorisation (AuthZ): que peut faire cet appelant?

Les deux sont indispensables pour securiser une API.

## Approche token vs session

Base session:

- etat conserve cote serveur
- simple pour applications web
- necessite un stockage session scalable

Base token:

- requetes stateless avec token signe
- frequent pour APIs et services distribues
- demande une validation stricte et gestion d'expiration

## Checklist de durcissement endpoint

- politique deny-by-default
- routes publiques explicites seulement
- validation des entrees et limites de payload
- rate limiting sur endpoints sensibles
- politique CORS stricte quand necessaire

## Gestion des mots de passe et secrets

- ne jamais stocker des credentials en clair
- utiliser un hash fort a sens unique pour les mots de passe
- externaliser et faire tourner les secrets
- ne pas logger les champs sensibles

## Strategie de reponse d'erreur

Renvoyer des erreurs d'auth generiques pour ne pas exposer d'informations internes.
Exemple: contrat clair `401/403` sans details sensibles.

## Modele d'acces pratique

Placer les verifications role/permission au plus proche des operations metier:

- role pour acces grossier (admin, member)
- permission pour actions fines (read:invoice, write:invoice)

## Erreurs frequentes

- melanger partout auth et logique metier
- endpoints laisses publics par erreur
- pas de politique d'expiration token/session
- pas de piste d'audit pour actions sensibles

## A retenir

1. Separer clairement identite (AuthN) et permissions (AuthZ)
2. Choisir token ou session selon les contraintes d'architecture
3. Durcir les endpoints avec une logique deny-by-default
4. Traiter secrets, credentials et logs d'auth comme des actifs critiques
