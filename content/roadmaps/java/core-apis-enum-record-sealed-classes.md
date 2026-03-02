---
title: Core APIs - Enum, Record, Sealed Classes
description: Learn when to use enum, record, and sealed classes in Java to model finite states, immutable DTOs, and controlled inheritance.
date: 2025-01-02
tags: [java, core-apis, enum, record]
draft: false
readingTime: 14 min
---

## Why this step matters

As projects grow, weak domain modeling creates bugs:

- invalid states accepted by business logic
- mutable DTOs unexpectedly changed
- inheritance trees hard to reason about

`enum`, `record`, and `sealed` help you model data and behavior with stronger constraints.

---

## `enum`: model finite states

Use `enum` when possible values are fixed and known.

```java
public enum TicketStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED,
    CLOSED
}
```

This is much safer than free strings like `"open"` or `"closed"` that can contain typos.

### Enum in business logic

```java
public boolean canClose(TicketStatus status) {
    return status == TicketStatus.RESOLVED || status == TicketStatus.IN_PROGRESS;
}
```

### Enum with fields and behavior

```java
public enum Plan {
    FREE(5),
    PRO(100),
    ENTERPRISE(Integer.MAX_VALUE);

    private final int maxProjects;

    Plan(int maxProjects) {
        this.maxProjects = maxProjects;
    }

    public int maxProjects() {
        return maxProjects;
    }
}
```

You can attach metadata and methods directly to each state.

---

## `record`: immutable data carriers

Records are ideal for DTOs and response models.

```java
public record UserSummary(Long id, String username, String email) {}
```

Java generates for you:

- constructor
- getters (`id()`, `username()`, ...)
- `equals`, `hashCode`, `toString`

### Why records are useful

- concise syntax
- immutable by default
- less boilerplate, fewer mistakes

### Record in API layer

```java
public record ErrorResponse(String code, String message) {}

public ErrorResponse toError(String code, String message) {
    return new ErrorResponse(code, message);
}
```

Use records for data transport, not for entities requiring mutable lifecycle behavior.

---

## `sealed` classes: restrict inheritance

Sealed types let you explicitly control who can extend or implement a type.

```java
public sealed interface PaymentResult
    permits PaymentSuccess, PaymentFailure {}
```

```java
public record PaymentSuccess(String transactionId) implements PaymentResult {}
public record PaymentFailure(String reason) implements PaymentResult {}
```

This is useful for domain outcomes where only a known set of variants is valid.

### Why it helps

- prevents random subclasses in other modules
- makes domain model explicit
- improves readability and maintenance

---

## Combining enum + record + sealed

You often use them together in clean domain modeling.

```java
public enum AlertLevel {
    INFO, WARNING, CRITICAL
}

public sealed interface Alert permits SystemAlert, SecurityAlert {}

public record SystemAlert(AlertLevel level, String message) implements Alert {}
public record SecurityAlert(AlertLevel level, String source, String message) implements Alert {}
```

Now the model is:

- finite for levels (`enum`)
- immutable for payloads (`record`)
- controlled for variants (`sealed`)

---

## Pattern matching with sealed types (modern Java)

When using sealed hierarchies, `switch` can become exhaustive and safer.

```java
public String describe(PaymentResult result) {
    return switch (result) {
        case PaymentSuccess s -> "success: " + s.transactionId();
        case PaymentFailure f -> "failure: " + f.reason();
    };
}
```

The compiler helps ensure all known variants are handled.

---

## Common mistakes to avoid

- using `String` instead of `enum` for finite states
- using `record` for mutable JPA entities
- creating sealed hierarchies without clear domain value
- forgetting versioning impact when changing enum constants in APIs

---

## Quick decision guide

1. Fixed list of values? -> `enum`
2. Immutable transport object? -> `record`
3. Controlled family of subtypes? -> `sealed`

Use them to make invalid states impossible by design.

---

## Takeaway

For robust domain modeling in modern Java:

1. use `enum` to represent finite states safely
2. use `record` for concise immutable DTOs
3. use `sealed` types to restrict inheritance intentionally
4. combine all three to make business models explicit and reliable
