---
title: POO - Héritage et polymorphisme
description: Comprendre l'héritage en Java avec extends/super, la redéfinition de méthodes et le dynamic dispatch avec des exemples concrets.
date: 2024-12-27
tags: [java, oop, heritage, polymorphisme]
draft: false
readingTime: 12 min
---

## Pourquoi cette étape est importante

L'héritage et le polymorphisme sont des bases de la POO en Java.
Bien utilisés, ils permettent de factoriser des comportements communs et d'écrire du code flexible basé sur des abstractions.

## Héritage : `extends`

L'héritage permet à une classe de réutiliser et spécialiser une autre classe.

```java
class Animal {
    protected String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println(name + " makes a sound");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
}
```

`Dog` hérite des champs et méthodes de `Animal`.

### Quand l'héritage est pertinent

- il existe une vraie relation “est un” (`Dog est un Animal`)
- plusieurs sous-classes partagent un comportement stable

Évite l'héritage uniquement pour “réutiliser du code” sans relation métier claire.

## `super` : accès au parent

`super` sert à interagir avec la classe parente.

### Appel du constructeur parent

```java
class Dog extends Animal {
    Dog(String name) {
        super(name); // appel du constructeur parent
    }
}
```

### Appel d'une méthode parente

```java
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void speak() {
        super.speak();
        System.out.println(name + " barks");
    }
}
```

## Redéfinition de méthode (overriding)

L'overriding consiste à redéfinir une méthode héritée dans une sous-classe avec la même signature.

```java
class Animal {
    void speak() {
        System.out.println("generic sound");
    }
}

class Cat extends Animal {
    @Override
    void speak() {
        System.out.println("meow");
    }
}
```

### Règles importantes

- même nom de méthode et mêmes paramètres
- type de retour compatible (identique ou covariant)
- visibilité pas plus restrictive que la méthode parente
- utiliser `@Override` pour détecter les erreurs à la compilation

## Dynamic dispatch (polymorphisme runtime)

Le dynamic dispatch signifie que Java choisit la bonne implémentation au runtime selon le type réel de l'objet, pas selon le type de la variable.

```java
Animal a1 = new Dog("Rex");
Animal a2 = new Cat("Misty");

a1.speak(); // version Dog
a2.speak(); // version Cat
```

Même si les variables sont typées `Animal`, la JVM appelle la méthode de la classe concrète.

## Pourquoi le polymorphisme est puissant

Le polymorphisme permet d'écrire du code basé sur des contrats, et non sur des implémentations concrètes.

```java
List<Animal> animals = List.of(new Dog("Rex"), new Cat("Misty"));

for (Animal animal : animals) {
    animal.speak(); // une boucle, plusieurs comportements
}
```

Tu peux ajouter de nouveaux types d'animaux sans réécrire cette boucle.

## Erreurs fréquentes à éviter

- imposer l'héritage alors que la composition serait plus claire
- oublier `@Override`
- exposer trop d'internals de la classe parente
- créer des hiérarchies profondes difficiles à maintenir

## Héritage vs composition (règle rapide)

Pense d'abord au type de relation :

- **Héritage (`est un`)** : `Dog est un Animal`
- **Composition (`a un`)** : `Car a un Engine`

### Quand privilégier l'héritage

Utilise l'héritage quand la sous-classe peut réellement remplacer la classe parente partout, sans comportement surprenant.
En général, cela implique une relation métier forte et un comportement commun stable.

### Quand privilégier la composition

Utilise la composition quand un objet s'appuie sur un autre objet pour faire une partie du travail.
Au lieu d'hériter, tu injectes ou stockes une dépendance.

Exemple de mauvais héritage :

```java
class Engine {
    void start() {}
}

// Mauvaise relation métier : une voiture n'est pas un moteur
class Car extends Engine {}
```

Exemple correct avec composition :

```java
class Engine {
    void start() {
        System.out.println("Engine started");
    }
}

class Car {
    private final Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }
}
```

La composition est souvent plus simple à faire évoluer et à tester :

- tu peux remplacer une implémentation sans changer la hiérarchie
- tu réduis le couplage fort
- tu évites les arbres d'héritage trop profonds

## Mini exemple contextualisé

```java
abstract class Notification {
    abstract void send(String message);
}

class EmailNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("SMS: " + message);
    }
}
```

Le code client peut traiter toutes les notifications de la même façon, et le runtime choisit la bonne implémentation.

## À retenir

Pour cette étape, retiens :

1. `extends` modélise l'héritage
2. `super` permet d'accéder au constructeur/comportement parent
3. l'overriding spécialise le comportement
4. le dynamic dispatch active le polymorphisme au runtime

Une fois ces bases maîtrisées, tu es prêt pour interfaces, classes abstraites et design orienté contrats.
