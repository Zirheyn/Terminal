---
title: Java fonctionnel - Streams
description: Apprendre les Streams Java avec map, filter, reduce, collectors, et des regles pratiques pour ne pas en abuser.
date: 2025-01-04
tags: [java, functional, streams, collections]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Les Streams permettent d'exprimer clairement les transformations de donnees, surtout pour le filtrage, l'agregation et le reporting.
Bien utilises, ils reduisent le boilerplate. Mal utilises, ils degradent la lisibilite.

## Modele mental d'un pipeline Stream

Un pipeline Stream a trois parties :

1. Source (`List`, `Set`, tableau, etc.)
2. Operations intermediaires (`filter`, `map`, `sorted`)
3. Operation terminale (`collect`, `forEach`, `count`, `reduce`)

```java
List<String> names = List.of("alice", "bob", "anna");

List<String> result = names.stream()
    .filter(n -> n.startsWith("a"))
    .map(String::toUpperCase)
    .toList();

System.out.println(result); // [ALICE, ANNA]
```

## `map`, `filter`, `reduce`

- `filter` : garde les elements correspondants
- `map` : transforme chaque element
- `reduce` : combine les elements en un seul resultat

```java
int total = List.of(10, 20, 30).stream()
    .filter(n -> n >= 20)
    .reduce(0, Integer::sum);

System.out.println(total); // 50
```

## Collectors

Les collectors servent a construire le resultat final d'un pipeline.

```java
Map<String, Long> countByRole = List.of("admin", "user", "admin").stream()
    .collect(Collectors.groupingBy(r -> r, Collectors.counting()));

System.out.println(countByRole); // {admin=2, user=1}
```

Collectors utiles :

- `toList()` / `toSet()`
- `groupingBy(...)`
- `partitioningBy(...)`
- `joining(...)`
- `counting()`, `summingInt(...)`

## Eviter la sur-utilisation des Streams

Les Streams ne sont pas toujours le meilleur choix.
Prefere des boucles quand :

- la logique est tres stateful
- plusieurs effets de bord sont necessaires
- debugger une longue chaine est plus difficile qu'une boucle claire

## Erreurs frequentes

- effets de bord dans `map`/`filter`
- chaines trop longues avec intention peu claire
- streams dans des boucles chaudes sans mesure de performance
- croire que le parallel stream est toujours plus rapide

## Regle pratique

Utilise les Streams pour des transformations declaratives.
Utilise des boucles pour un controle de flux complexe et mutable.

## A retenir

1. Penser en pipeline : source -> transformation -> terminal
2. Maitriser `map`, `filter`, `reduce`, `collect`
3. Garder le code stream court et lisible
4. Ne pas forcer les Streams quand une boucle est plus claire
