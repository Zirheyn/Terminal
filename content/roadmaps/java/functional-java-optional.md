---
title: Functional Java - Optional
description: Learn when and how to use Optional in Java for null-safe flows, map/flatMap/orElse patterns, and API boundary best practices.
date: 2025-01-05
tags: [java, functional, optional, null-safety]
draft: false
readingTime: 12 min
---

## Why this step matters

`null` is a frequent source of production bugs. `Optional` helps model absence explicitly and avoid hidden `NullPointerException`.

## Core idea

`Optional<T>` means: value may or may not be present.

```java
Optional<String> token = Optional.of("abc");
Optional<String> missing = Optional.empty();
```

Use:

- `of(...)` when value is guaranteed non-null
- `ofNullable(...)` when value may be null
- `empty()` for no value

## Common operations

```java
Optional<String> email = Optional.ofNullable("briac@example.com");

String domain = email
    .map(e -> e.substring(e.indexOf("@") + 1))
    .orElse("unknown");

System.out.println(domain); // example.com
```

- `map`: transform if present
- `flatMap`: chain Optional-returning calls
- `orElse` / `orElseGet`: fallback values
- `orElseThrow`: fail explicitly

## `map` vs `flatMap`

The key difference is the return shape.

- `map` applies a function `T -> R` and returns `Optional<R>`
- `flatMap` applies a function `T -> Optional<R>` and returns `Optional<R>` (flattened)

If your mapper already returns an `Optional`, `map` creates nesting.

```java
Optional<User> user = findUser("briac");

Optional<Optional<String>> wrong = user.map(u -> findCityByUser(u.id()));
Optional<String> correct = user.flatMap(u -> findCityByUser(u.id()));
```

Why:

- with `map`, Java wraps mapper output again, so you get `Optional<Optional<String>>`
- with `flatMap`, Java avoids double wrapping and returns a single `Optional<String>`

Use `map` when your mapper returns a plain value:

```java
Optional<User> user = findUser("briac");
Optional<String> username = user.map(User::username);
```

Use `flatMap` when your mapper returns an `Optional`:

```java
Optional<User> user = findUser("briac");
Optional<String> city = user.flatMap(u -> findCityByUser(u.id()));
```

## API boundary best practices

Good:

- return `Optional<T>` from query-like methods (`findById`)

Avoid:

- fields of type `Optional` in entities/DTOs
- `Optional` as method parameter in most cases

## `orElse` vs `orElseGet`

`orElse` always evaluates its argument.
`orElseGet` computes fallback lazily.

```java
String value = optional.orElseGet(() -> expensiveFallback());
```

Prefer `orElseGet` when fallback is costly.

## Common mistakes

- using `Optional.get()` without checking presence
- wrapping everything in Optional (over-design)
- returning `null` instead of `Optional.empty()`

## Takeaway

1. Use Optional to model missing values explicitly
2. Compose with `map` and `flatMap`
3. Use `orElseGet`/`orElseThrow` intentionally
4. Keep Optional at API/query boundaries, not everywhere
