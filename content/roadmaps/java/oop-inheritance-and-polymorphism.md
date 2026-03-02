---
title: OOP - Inheritance and Polymorphism
description: Understand inheritance in Java with extends/super, method overriding, and dynamic dispatch through practical examples.
date: 2024-12-27
tags: [java, oop, inheritance, polymorphism]
draft: false
readingTime: 12 min
---

## Why this step matters

Inheritance and polymorphism are central to object-oriented Java.
Used correctly, they let you model shared behavior and write flexible code that works with abstractions instead of concrete classes.

## Inheritance: `extends`

Inheritance means a class can reuse and specialize another class.

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

`Dog` inherits fields and methods from `Animal`.

### When inheritance fits

- there is a true “is-a” relationship (`Dog is an Animal`)
- child classes share stable common behavior from a parent

Avoid inheritance only for code reuse when there is no domain relationship.

## `super`: accessing parent behavior

`super` is used to interact with the parent class.

### Constructor chaining

```java
class Dog extends Animal {
    Dog(String name) {
        super(name); // call parent constructor
    }
}
```

### Calling parent methods

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

## Method overriding

Overriding means redefining inherited behavior in a subclass with the same signature.

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

### Overriding rules (key points)

- same method name and parameter list
- compatible return type (same or covariant)
- access level cannot be more restrictive
- use `@Override` to catch mistakes at compile time

## Dynamic dispatch (runtime polymorphism)

Dynamic dispatch means Java chooses the overridden method at runtime based on the real object type, not the variable type.

```java
Animal a1 = new Dog("Rex");
Animal a2 = new Cat("Misty");

a1.speak(); // Dog version
a2.speak(); // Cat version
```

Even though both variables are typed as `Animal`, the JVM calls the correct subclass implementation.

This is the practical core of polymorphism.

## Why polymorphism is powerful

Polymorphism lets you write code that depends on contracts (parent type/interface), not implementations.

```java
List<Animal> animals = List.of(new Dog("Rex"), new Cat("Misty"));

for (Animal animal : animals) {
    animal.speak(); // one loop, many behaviors
}
```

You can add new animal types without rewriting this loop.

## Common mistakes to avoid

- forcing inheritance when composition would be clearer
- forgetting `@Override`
- exposing too much parent internals to children
- deep inheritance trees that are hard to reason about

## Inheritance vs composition (quick rule)

Think in terms of relationship type:

- **Inheritance (`is-a`)**: `Dog is an Animal`
- **Composition (`has-a`)**: `Car has an Engine`

### When to prefer inheritance

Use inheritance when the child can truly be used anywhere the parent is expected, without surprising behavior.
This usually means shared, stable domain behavior and a clear subtype relation.

### When to prefer composition

Use composition when one object needs another object to do part of its job.
Instead of inheriting behavior, you inject or hold a collaborator.

Bad inheritance example:

```java
class Engine {
    void start() {}
}

// Wrong domain relation: a Car is not an Engine
class Car extends Engine {}
```

Better composition example:

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

Composition is often easier to evolve and test:

- swap implementations without changing class hierarchy
- reduce tight coupling
- avoid deep inheritance trees

## Mini example with context

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

Client code can treat all notifications uniformly, while runtime dispatch selects the concrete behavior.

## Takeaway

For this step, remember:

1. `extends` models inheritance
2. `super` gives access to parent constructor/behavior
3. overriding customizes behavior in subclasses
4. dynamic dispatch makes polymorphism work at runtime

Mastering these concepts prepares you for interfaces, abstraction, and cleaner architecture design.
