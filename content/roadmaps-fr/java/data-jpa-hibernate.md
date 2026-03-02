---
title: Data - JPA et Hibernate
description: "Apprendre les bases JPA/Hibernate: mapping d'entites, lazy vs eager loading, piege N+1 et limites transactionnelles."
date: 2025-01-13
tags: [java, data, jpa, hibernate]
draft: false
readingTime: 15 min
---

## Pourquoi cette etape est importante

JPA/Hibernate accelere le developpement, mais un comportement SQL implicite mal maitrise peut provoquer de gros problemes de performance.

## Bases du mapping d'entites

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
}
```

Annotations centrales :

- `@Entity`, `@Table`
- `@Id`, `@GeneratedValue`
- annotations de relation (`@OneToMany`, `@ManyToOne`, etc.)

## Lazy vs eager loading

- `LAZY` : charge la relation seulement a l'acces
- `EAGER` : charge la relation immediatement

Recommendation par defaut : preferer `LAZY` et charger explicitement selon le besoin.

## Probleme N+1

Le N+1 arrive quand on charge une liste d'entites puis chaque relation individuellement.

Mitigations classiques :

- `JOIN FETCH`
- entity graphs
- projections pour les lectures

## Limites transactionnelles

Garder les transactions autour d'operations metier coherentes.

En Spring :

```java
@Transactional
public void processOrder(Long orderId) {
    // load, validate, update, persist
}
```

Ne pas laisser une transaction ouverte plus longtemps que necessaire.

## Conseils pratiques

- separer modele d'ecriture (entites) et modele de lecture (DTO/projections)
- logger le SQL en dev pour comprendre les requetes generees
- mesurer avant d'optimiser

## Erreurs frequentes

- eager loading partout par defaut
- exposer les entites directement dans les APIs publiques
- ignorer le timing flush/transaction
- absence de tests de comportement data

## A retenir

1. JPA accelere, mais SQL reste indispensable
2. Gerer la strategie de chargement de maniere intentionnelle
3. Surveiller N+1 et corriger avec un fetch explicite
4. Garder des transactions courtes et claires
