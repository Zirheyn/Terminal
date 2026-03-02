---
title: Java fonctionnel - Optional
description: Apprendre quand et comment utiliser Optional en Java pour gerer le null-safe flow, map/flatMap/orElse et les bonnes pratiques aux frontieres d'API.
date: 2025-01-05
tags: [java, functional, optional, null-safety]
draft: false
readingTime: 12 min
---

## Pourquoi cette etape est importante

`null` est une source frequente de bugs en production. `Optional` permet de modeliser explicitement l'absence d'une valeur et d'eviter des `NullPointerException` cachees.

## Idee centrale

`Optional<T>` signifie : la valeur peut etre presente ou absente.

```java
Optional<String> token = Optional.of("abc");
Optional<String> missing = Optional.empty();
```

Utilisation :

- `of(...)` si la valeur est garantie non nulle
- `ofNullable(...)` si la valeur peut etre nulle
- `empty()` pour l'absence de valeur

## Operations courantes

```java
Optional<String> email = Optional.ofNullable("briac@example.com");

String domain = email
    .map(e -> e.substring(e.indexOf("@") + 1))
    .orElse("unknown");

System.out.println(domain); // example.com
```

- `map` : transforme si present
- `flatMap` : chaine des appels qui renvoient deja un Optional
- `orElse` / `orElseGet` : valeur de secours
- `orElseThrow` : echec explicite

## `map` vs `flatMap`

La difference cle est la forme du type de retour.

- `map` applique une fonction `T -> R` et retourne `Optional<R>`
- `flatMap` applique une fonction `T -> Optional<R>` et retourne `Optional<R>` (aplati)

Si le mapper renvoie deja un `Optional`, `map` cree un niveau imbrique.

```java
Optional<User> user = findUser("briac");

Optional<Optional<String>> wrong = user.map(u -> findCityByUser(u.id()));
Optional<String> correct = user.flatMap(u -> findCityByUser(u.id()));
```

Pourquoi :

- avec `map`, Java enveloppe encore le resultat, donc `Optional<Optional<String>>`
- avec `flatMap`, Java evite ce double enveloppement et renvoie un seul `Optional<String>`

Utilise `map` quand le mapper renvoie une valeur simple :

```java
Optional<User> user = findUser("briac");
Optional<String> username = user.map(User::username);
```

Utilise `flatMap` quand le mapper renvoie deja un `Optional` :

```java
Optional<User> user = findUser("briac");
Optional<String> city = user.flatMap(u -> findCityByUser(u.id()));
```

## Bonnes pratiques aux frontieres d'API

Bien :

- retourner `Optional<T>` pour les methodes de recherche (`findById`)

A eviter :

- des champs `Optional` dans les entites/DTO
- `Optional` en parametre de methode dans la plupart des cas

## `orElse` vs `orElseGet`

`orElse` evalue toujours son argument.
`orElseGet` evalue la valeur de secours seulement si necessaire.

```java
String value = optional.orElseGet(() -> expensiveFallback());
```

Prefere `orElseGet` si le fallback est couteux.

## Erreurs frequentes

- utiliser `Optional.get()` sans verifier la presence
- envelopper tout dans Optional (sur-conception)
- retourner `null` au lieu de `Optional.empty()`

## A retenir

1. Utiliser Optional pour modeliser explicitement l'absence
2. Composer avec `map` et `flatMap`
3. Utiliser `orElseGet`/`orElseThrow` de maniere intentionnelle
4. Garder Optional aux frontieres d'API/recherche, pas partout
