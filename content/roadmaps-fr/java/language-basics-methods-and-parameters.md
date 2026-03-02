---
title: Bases du langage - Méthodes et paramètres
description: Comprendre les signatures de méthodes Java, le pass-by-value et l'overloading avec des exemples clairs et concrets.
date: 2024-12-25
tags: [java, language-basics, methods, parameters]
draft: false
readingTime: 11 min
---

## Pourquoi les méthodes sont essentielles

Les méthodes sont l'unité de base de la réutilisation en Java.
Un bon design de méthodes améliore la lisibilité, les tests et la maintenabilité.

## Qu'est-ce qu'une méthode

Une méthode est un bloc de code nommé qui peut recevoir des entrées (paramètres), exécuter une logique et retourner une valeur.

```java
public static int add(int a, int b) {
    return a + b;
}
```

Éléments de cette méthode :

- `public` -> modificateur d'accès
- `static` -> appartient à la classe, pas à une instance
- `int` -> type de retour
- `add` -> nom de la méthode
- `(int a, int b)` -> liste des paramètres

## Signatures de méthodes

En Java, la signature d'une méthode comprend :

- le nom de la méthode
- les types de paramètres (et leur ordre)

Le type de retour **ne fait pas partie** de la signature.

### Exemple

```java
void log(String msg) {}
void log(int code) {}
```

Ces signatures sont différentes car les paramètres diffèrent.

Ceci est **invalide** :

```java
int parse(String value) { return 1; }
// double parse(String value) { return 1.0; } // invalide : même signature
```

Changer uniquement le type de retour ne crée pas une nouvelle signature.

## Paramètres en Java

Les paramètres sont des variables locales créées lors de l'appel de la méthode.

```java
public static double applyDiscount(double price, double rate) {
    return price - (price * rate);
}
```

### Bonne pratique de nommage

- préférer des noms explicites (`unitPrice`, `discountRate`) plutôt que (`a`, `b`)
- limiter le nombre de paramètres
- regrouper les données liées dans un objet si la liste devient trop longue

## Comportement pass-by-value (très important)

Java est toujours en **pass-by-value**.

Ce qui varie, c'est la valeur copiée :

- pour les primitifs : la valeur primitive est copiée
- pour les objets : la référence vers l'objet est copiée

### Exemple avec un primitif

```java
public static void increment(int x) {
    x++;
}

int n = 5;
increment(n);
System.out.println(n); // 5 (inchangé)
```

`x` est une copie de `n`, donc modifier `x` ne modifie pas `n`.

### Exemple avec une référence d'objet

```java
class User {
    String name;
    User(String name) { this.name = name; }
}

public static void rename(User user) {
    user.name = "Alice";
}

User u = new User("Bob");
rename(u);
System.out.println(u.name); // Alice
```

La référence est copiée, mais les deux références pointent vers le même objet.
Modifier l'état de l'objet est visible à l'extérieur.

### Réaffecter la référence du paramètre

```java
public static void reset(User user) {
    user = new User("New");
}

User u = new User("Bob");
reset(u);
System.out.println(u.name); // Bob
```

La réaffectation de `user` ne modifie que la copie locale.

## Overloading de méthodes

L'overloading consiste à définir plusieurs méthodes du même nom avec des signatures de paramètres différentes.

```java
public static int sum(int a, int b) {
    return a + b;
}

public static double sum(double a, double b) {
    return a + b;
}

public static int sum(int a, int b, int c) {
    return a + b + c;
}
```

### Pourquoi c'est utile

- API plus propre avec un nom cohérent
- souplesse pour différents types d'entrées
- meilleure ergonomie côté appel

### Règles d'overloading

Tu dois modifier au moins l'un des éléments suivants :

- nombre de paramètres
- types de paramètres
- ordre des paramètres (si types différents)

Changer uniquement les noms de paramètres ou le type de retour ne suffit pas.

## Conseils de design pratique

### 1. Garder des méthodes focalisées

Une méthode doit faire une chose claire.
Si elle cumule plusieurs responsabilités, découpe-la.

### 2. Préférer les retours explicites

Quand c'est possible, retourne une valeur au lieu de multiplier les effets de bord.

### 3. Valider les entrées à la frontière

```java
public static int divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("b must not be zero");
    }
    return a / b;
}
```

### 4. Éviter les booléens ambigus en paramètres

Un appel comme `save(user, true, false)` est peu lisible.
Préfère un objet d'options ou des méthodes explicites.

## Erreurs fréquentes à éviter

- confondre signature et type de retour
- croire que Java est en pass-by-reference
- surcharger excessivement et rendre l'API ambiguë
- écrire des méthodes longues sans objectif clair

## Mini exemple

```java
public class PriceService {
    public static double total(double price, int quantity) {
        return price * quantity;
    }

    public static double total(double price, int quantity, double discountRate) {
        double raw = total(price, quantity);
        return raw - (raw * discountRate);
    }
}
```

Cet exemple combine signatures claires, overloading et comportement prévisible.

## À retenir

Pour les fondamentaux des méthodes :

1. La signature détermine l'unicité de la méthode
2. Les paramètres Java sont toujours passés par valeur
3. L'overloading est utile s'il améliore la lisibilité de l'API

Ces règles sont indispensables avant de passer à l'OOP avancée et aux patterns d'architecture.
