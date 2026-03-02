---
title: Concurrence - ExecutorService
description: Apprendre les pools de threads avec ExecutorService, Callable/Future et les patterns de graceful shutdown pour les services backend.
date: 2025-01-08
tags: [java, concurrency, executor, futures]
draft: false
readingTime: 13 min
---

## Pourquoi cette etape est importante

Creer des threads manuellement pour chaque tache ne passe pas a l'echelle.
`ExecutorService` apporte une concurrence controlee via des pools de threads.

## Pools de threads

Utilise un pool pour reutiliser les threads et limiter la consommation de ressources.

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
```

Choix typiques :

- pool fixe pour charge stable
- pool cache pour pics de petites taches
- pool planifie pour jobs periodiques

## Runnable vs Callable

- `Runnable` : pas de resultat
- `Callable<T>` : retourne un resultat et peut lever des exceptions verifiees

```java
Callable<Integer> task = () -> 21 * 2;
Future<Integer> future = pool.submit(task);
Integer value = future.get();
```

## Bases de `Future`

`Future` permet de :

- attendre la fin (`get()`)
- verifier l'etat (`isDone()`)
- annuler (`cancel(true)`)

Evite de bloquer partout avec `get()` ; utilise des timeouts.

```java
Integer value = future.get(1, TimeUnit.SECONDS);
```

## Graceful shutdown

Toujours fermer les executors proprement.

```java
pool.shutdown();
if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
    pool.shutdownNow();
}
```

Cela evite les fuites de ressources et les arrets JVM bloques.

## Erreurs frequentes

- ne jamais fermer le pool
- utiliser des pools non bornes en production
- bloquer longtemps dans des taches sans strategie de dimensionnement
- ignorer les exceptions des futures

## Regle pratique

Utilise `ExecutorService` comme outil de concurrence bas niveau par defaut quand tu as besoin d'un controle explicite du pool.

## A retenir

1. Preferer les pools aux threads ad-hoc
2. Utiliser `Callable/Future` pour les taches avec resultat
3. Mettre des timeouts sur les attentes bloquantes
4. Toujours implementer un graceful shutdown
