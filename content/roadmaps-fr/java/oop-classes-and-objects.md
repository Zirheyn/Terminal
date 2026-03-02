---
title: POO - Classes et objets
description: Comprendre ce qu'est la POO en Java et maîtriser classes, objets, champs, constructeurs, membres instance/static et encapsulation.
date: 2024-12-26
tags: [java, oop, classes, objets, encapsulation]
draft: false
readingTime: 12 min
---

## Qu'est-ce que la POO en Java

La POO (Programmation Orientée Objet) est une façon de concevoir le code autour d'**objets** qui combinent :

- l'état (les données)
- le comportement (les méthodes)

En Java, la POO permet d'organiser le code en composants compréhensibles avec des responsabilités claires.

Au lieu d'un flux procédural unique, tu modélises des entités métier (User, Order, Product) et les actions qu'elles exposent.

## Classes et objets

Une **classe** est un modèle.
Un **objet** est une instance créée à partir de ce modèle.

```java
class User {
    String name;
    int age;

    void greet() {
        System.out.println("Hi, I am " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        User u = new User(); // création d'objet
        u.name = "Briac";
        u.age = 28;
        u.greet();
    }
}
```

`User` est la classe, `u` est une instance.

## Champs et constructeurs

### Champs

Les champs stockent l'état de l'objet.

```java
class Product {
    String id;
    String name;
    double price;
}
```

### Constructeurs

Un constructeur initialise l'objet au moment de sa création.
Il porte le même nom que la classe et n'a pas de type de retour.

```java
class Product {
    String id;
    String name;
    double price;

    Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
```

L'usage de `this` permet d'assigner clairement les paramètres aux champs.

### Overloading de constructeurs

Tu peux définir plusieurs constructeurs avec des signatures différentes.

```java
class Product {
    String id;
    String name;
    double price;

    Product(String id, String name) {
        this(id, name, 0.0);
    }

    Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
```

## Membres instance vs static

### Membres d'instance

Ils appartiennent à chaque objet séparément.

```java
class Counter {
    int value = 0; // champ d'instance

    void increment() { // méthode d'instance
        value++;
    }
}
```

Chaque instance a sa propre valeur `value`.

### Membres static

Ils appartiennent à la classe, et sont partagés entre toutes les instances.

```java
class Counter {
    static int created = 0;
    int value = 0;

    Counter() {
        created++;
    }

    static int getCreatedCount() {
        return created;
    }
}
```

Utilise `static` pour des utilitaires de classe ou des compteurs globaux, pas pour l'état propre à un objet.

## Encapsulation

L'encapsulation consiste à protéger l'état interne et contrôler l'accès via des méthodes.
En pratique :

- champs privés
- accès/évolution via méthodes métier (getters/setters ou méthodes de domaine)

```java
class BankAccount {
    private double balance;

    BankAccount(double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance must be >= 0");
        }
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be > 0");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            throw new IllegalArgumentException("Invalid withdraw amount");
        }
        balance -= amount;
    }
}
```

Cette approche protège les invariants et évite les états invalides.

## Bonnes habitudes POO dès le début

1. Donner une responsabilité claire par classe
2. Mettre les champs en `private` par défaut
3. Préférer des méthodes métier (`deposit`) plutôt que des setters bruts si des règles existent
4. Utiliser les constructeurs pour garantir un état initial valide
5. Réserver `static` aux vrais besoins partagés

## Erreurs fréquentes des débutants

- Champs publics modifiables partout
- Classes utilisées comme simples conteneurs sans comportement
- Abus de `static` pour des données d'instance
- Constructeurs qui laissent créer des objets invalides

## Petit exemple complet

```java
class Task {
    private final String title;
    private boolean done;

    Task(String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        this.title = title;
        this.done = false;
    }

    public String getTitle() { return title; }
    public boolean isDone() { return done; }

    public void markDone() {
        this.done = true;
    }
}
```

Cette classe illustre validation au constructeur, champs privés et mise à jour via comportement.

