---
title: Concurrence - CompletableFuture
description: Apprendre les pipelines asynchrones en Java avec CompletableFuture, les patterns de composition et la gestion robuste des erreurs.
date: 2025-01-09
tags: [java, concurrency, completablefuture, async]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Beaucoup de flux backend appellent plusieurs services et ne doivent pas bloquer un thread de requete a chaque etape.
`CompletableFuture` permet une composition non bloquante et des pipelines plus clairs.

## Tache async de base

```java
CompletableFuture<String> userFuture = CompletableFuture.supplyAsync(() -> fetchUserName(42));
String name = userFuture.join();
```

`join()` attend et remonte les erreurs en exceptions non verifiees.

## Transformer et chaîner

```java
CompletableFuture<String> greeting = CompletableFuture
    .supplyAsync(() -> "briac")
    .thenApply(String::toUpperCase)
    .thenApply(name -> "hello " + name);
```

- `thenApply` : transformation synchrone du resultat precedent
- `thenCompose` : chaine un autre futur asynchrone (evite les futurs imbriques)

## Composer plusieurs taches asynchrones

```java
CompletableFuture<User> user = CompletableFuture.supplyAsync(() -> loadUser(1));
CompletableFuture<List<Order>> orders = CompletableFuture.supplyAsync(() -> loadOrders(1));

CompletableFuture<UserDashboard> dashboard = user.thenCombine(
    orders,
    UserDashboard::new
);
```

## Gestion d'erreurs

```java
CompletableFuture<String> safe = CompletableFuture
    .supplyAsync(this::callRemote)
    .exceptionally(ex -> "fallback");
```

Handlers utiles :

- `exceptionally(...)`
- `handle(...)`
- `whenComplete(...)`

## Timeouts

```java
CompletableFuture<String> result = CompletableFuture
    .supplyAsync(this::callRemote)
    .orTimeout(2, TimeUnit.SECONDS)
    .exceptionally(ex -> "timeout-fallback");
```

## Erreurs frequentes

- bloquer trop tot avec `join()` partout
- melanger I/O bloquante lourde avec le common pool par defaut
- oublier les chemins d'erreur dans les chaines composees
- creer des chaines trop complexes sans etapes nommees

## A retenir

1. Utiliser `CompletableFuture` pour la composition async, pas seulement l'execution async
2. Preferer `thenCompose`/`thenCombine` pour des pipelines clairs
3. Gerer explicitement timeouts et erreurs
4. Garder les chaines lisibles et observables
