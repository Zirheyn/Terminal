---
title: Concurrence - Threads et synchronisation
description: Comprendre le cycle de vie des threads Java, la synchronisation, les verrous et les race conditions avec des exemples pratiques.
date: 2025-01-07
tags: [java, concurrency, threads, synchronization]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Les services backend traitent plusieurs requetes en parallele.
Sans bases solides en concurrence, l'etat partage devient incoherent et produit des bugs non deterministes.

## Cycle de vie d'un thread

Un thread passe generalement par :

- new
- runnable/running
- blocked ou waiting
- terminated

```java
Thread t = new Thread(() -> System.out.println("worker"));
t.start();
```

## Exemple de race condition

Une race condition arrive quand plusieurs threads modifient un etat partage sans coordination.

```java
class Counter {
    int value = 0;

    void increment() {
        value++; // non atomique
    }
}
```

Deux threads peuvent lire la meme valeur et ecraser la mise a jour de l'autre.

## `synchronized`

Utilise `synchronized` pour proteger les sections critiques.

```java
class SafeCounter {
    private int value = 0;

    synchronized void increment() {
        value++;
    }

    synchronized int get() {
        return value;
    }
}
```

Cela garantit qu'un seul thread entre dans la methode synchronisee a la fois.

## Verrous (`ReentrantLock`)

Les verrous donnent plus de controle que `synchronized`.

```java
Lock lock = new ReentrantLock();

lock.lock();
try {
    // section critique
} finally {
    lock.unlock();
}
```

Utilise les locks quand tu as besoin de `tryLock()` ou d'equite de verrouillage.

## Visibilite et atomicite

- `volatile` : garantie de visibilite lecture/ecriture, mais pas d'atomicite complete
- `AtomicInteger` : operations atomiques sans lock explicite pour des compteurs simples

```java
AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();
```

## Erreurs frequentes

- partager des objets mutables sans synchronisation
- verrouiller trop de code (goulet de performance)
- oublier `unlock()` avec un lock
- penser que ces bugs seront faciles a reproduire

## A retenir

1. Comprendre les race conditions et le risque de l'etat mutable partage
2. Utiliser `synchronized` ou des verrous sur les sections critiques
3. Preferer les classes atomiques pour les compteurs simples
4. Garder un design thread-safe explicite et minimal
