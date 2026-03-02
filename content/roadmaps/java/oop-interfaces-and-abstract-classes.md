---
title: OOP - Interfaces and Abstract Classes
description: Learn contract-first design in Java, understand interfaces vs abstract classes, and use composition over inheritance with practical examples.
date: 2024-12-28
tags: [java, oop, interfaces, abstract-classes, composition]
draft: false
readingTime: 13 min
---

## Why this step matters

As projects grow, hard-coding behavior in concrete classes quickly becomes rigid.
Interfaces and abstract classes help you design extensible systems where implementation details can change without breaking calling code.

## Contract-first design

A contract-first approach means defining **what a component must do** before deciding **how it does it**.

In Java, contracts are usually represented with interfaces.

```java
public interface PaymentGateway {
    void charge(String customerId, double amount);
}
```

Any class implementing this interface must provide `charge`.
Your business logic can depend on `PaymentGateway` instead of a specific provider.

## Interfaces

Interfaces define capabilities and contracts.
They are ideal when unrelated classes need to share the same behavior contract.

```java
public interface NotificationSender {
    void send(String to, String message);
}

public class EmailSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("Email to " + to + ": " + message);
    }
}

public class SmsSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("SMS to " + to + ": " + message);
    }
}
```

Client code can use the interface and switch implementations easily.

## Abstract classes

Abstract classes are useful when you want:

- shared base state
- shared base logic
- some methods forced on subclasses

```java
public abstract class BaseReportExporter {
    protected final String format;

    protected BaseReportExporter(String format) {
        this.format = format;
    }

    public final void export(String data) {
        validate(data);
        write(data);
    }

    protected void validate(String data) {
        if (data == null || data.isBlank()) {
            throw new IllegalArgumentException("Data is required");
        }
    }

    protected abstract void write(String data);
}

public class PdfExporter extends BaseReportExporter {
    public PdfExporter() {
        super("pdf");
    }

    @Override
    protected void write(String data) {
        System.out.println("Writing PDF: " + data);
    }
}
```

This pattern combines reusable logic (`export`, `validate`) with subclass-specific behavior (`write`).

## Interface vs abstract class: quick decision guide

Use an **interface** when:

- you need a behavior contract
- implementations may be unrelated
- you want high decoupling

Use an **abstract class** when:

- subclasses share state/implementation
- you need partial default behavior
- inheritance hierarchy is meaningful

In many real systems, both are used together.

## Default and static methods in interfaces

Modern Java interfaces can include `default` and `static` methods.

### Default method

Provides optional shared behavior that implementations may override.

```java
public interface AuditLogger {
    void log(String message);

    default void logError(String message, Throwable error) {
        log("[ERROR] " + message + " - " + error.getMessage());
    }
}
```

### Static method

Utility method tied to interface type.

```java
public interface AuditLogger {
    static String sanitize(String value) {
        return value == null ? "" : value.trim();
    }
}
```

Call with:

```java
String clean = AuditLogger.sanitize("  hello  ");
```

## Composition over inheritance

Composition means building behavior by combining objects instead of extending long class hierarchies.

### Why composition is often better

- easier to swap behavior at runtime
- less fragile than deep inheritance trees
- clearer responsibilities

### Example with strategy-like composition

```java
public interface TaxPolicy {
    double apply(double amount);
}

public class FlatTaxPolicy implements TaxPolicy {
    @Override
    public double apply(double amount) {
        return amount * 1.20;
    }
}

public class CheckoutService {
    private final TaxPolicy taxPolicy;

    public CheckoutService(TaxPolicy taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    public double total(double subtotal) {
        return taxPolicy.apply(subtotal);
    }
}
```

You can inject another `TaxPolicy` without changing `CheckoutService`.

## Common mistakes to avoid

- using abstract classes by default when an interface is enough
- putting too much logic in default methods
- mixing inheritance and composition without clear intent
- leaking implementation details into contracts

## Takeaway

For robust OOP design:

1. start with contracts (interfaces)
2. use abstract classes for shared base state/logic when truly needed
3. prefer composition for behavior assembly
4. keep implementation replaceable and test-friendly

These principles are foundational for clean architecture in Java applications.

