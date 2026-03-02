---
title: Bases du langage - Contrôle de flux
description: Maîtriser le contrôle de flux en Java avec des exemples clairs sur if/else, switch, boucles, break, continue et return.
date: 2024-12-24
tags: [java, language-basics, control-flow]
draft: false
readingTime: 11 min
---

## Pourquoi le contrôle de flux est essentiel

Le contrôle de flux définit comment ton programme prend des décisions et répète des actions.
Quand il est clair, ton code devient plus lisible, plus testable et plus robuste.

## `if`, `else if`, `else`

Utilise `if` quand le comportement dépend d'une condition.

```java
int score = 72;

if (score >= 90) {
    System.out.println("Excellent");
} else if (score >= 70) {
    System.out.println("Good");
} else if (score >= 50) {
    System.out.println("Average");
} else {
    System.out.println("Needs work");
}
```

### Bonnes pratiques

- Garder des conditions simples
- Préférer les retours anticipés pour éviter l'imbrication
- Extraire les conditions complexes dans des méthodes nommées

## `switch`

`switch` est utile pour faire plusieurs choix à partir d'une seule valeur.

### Switch classique

```java
String role = "ADMIN";

switch (role) {
    case "ADMIN":
        System.out.println("Full access");
        break;
    case "EDITOR":
        System.out.println("Edit access");
        break;
    case "VIEWER":
        System.out.println("Read-only access");
        break;
    default:
        System.out.println("Unknown role");
}
```

### Switch expression moderne (recommandé)

```java
String role = "EDITOR";

String access = switch (role) {
    case "ADMIN" -> "full";
    case "EDITOR" -> "edit";
    case "VIEWER" -> "read";
    default -> "none";
};

System.out.println(access);
```

Cette forme est souvent plus sûre et plus concise.

## Boucles : `for`, `while`, `do-while`

### Boucle `for`

À utiliser quand le nombre d'itérations est connu.

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Iteration " + i);
}
```

### Boucle `while`

À utiliser quand la répétition dépend d'une condition testée avant chaque tour.

```java
int attempts = 0;
while (attempts < 3) {
    System.out.println("Try #" + attempts);
    attempts++;
}
```

### Boucle `do-while`

À utiliser quand le bloc doit s'exécuter au moins une fois.

```java
int n = 0;
do {
    System.out.println("Runs at least once");
    n++;
} while (n < 1);
```

## `break`, `continue`, `return`

Ces mots-clés permettent de piloter précisément l'exécution.

### `break`

Arrête immédiatement la boucle (ou le switch) courant.

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}
```

### `continue`

Ignore l'itération en cours et passe à la suivante.

```java
for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        continue;
    }
    System.out.println("Odd: " + i);
}
```

### `return`

Quitte immédiatement la méthode en cours.

```java
public static String classify(int age) {
    if (age < 0) {
        return "invalid";
    }
    if (age < 18) {
        return "minor";
    }
    return "adult";
}
```

## Patterns de contrôle de flux lisibles

### 1. Guard clauses

Utilise des retours anticipés pour gérer rapidement les cas invalides.

```java
public static double divide(double a, double b) {
    if (b == 0) {
        throw new IllegalArgumentException("b must not be zero");
    }
    return a / b;
}
```

### 2. Éviter l'imbrication profonde

Des `if` imbriqués nuisent à la lisibilité.
Refactorise les conditions ou découpe en petites méthodes.

### 3. Choisir la bonne boucle

- `for` : nombre d'itérations connu
- `while` : condition de répétition
- `do-while` : au moins une exécution garantie

## Erreurs fréquentes à éviter

- Oublier `break` dans un switch classique et provoquer un fall-through non voulu
- Créer une boucle infinie en oubliant d'actualiser la variable de boucle
- Abuser de `continue` et rendre la logique difficile à suivre
- Écrire des conditions booléennes trop complexes sans parenthèses ni méthodes d'aide

## Mini exemple pratique

```java
public static void processOrders(int[] orders) {
    for (int order : orders) {
        if (order <= 0) {
            continue; // ignorer les IDs invalides
        }
        if (order == 999) {
            break; // marqueur d'arrêt d'urgence
        }
        System.out.println("Processing order " + order);
    }
}
```

Cet exemple combine conditions, `continue` et `break` dans un cas réaliste.

## À retenir

Le contrôle de flux est le squelette d'un code Java lisible.
Écris des conditions explicites, choisis la bonne boucle, et garde un flux d'exécution prévisible pour les mainteneurs.
