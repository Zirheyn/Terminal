---
title: Core APIs - Generics
description: Learn Java generics with type parameters, wildcards extends/super, and generic methods to write safer and reusable code.
date: 2025-01-01
tags: [java, core-apis, generics, type-safety]
draft: false
readingTime: 14 min
---

## Why this step matters

Generics are one of the most important tools in Java for writing safe and reusable code.
Without generics, collections and APIs rely on `Object`, which creates runtime casting errors.
With generics, errors move to compile time.

---

## The problem generics solve

Before generics, you could put anything in a list:

```java
List raw = new ArrayList();
raw.add("hello");
raw.add(42);
```

This compiles, but type errors appear later when reading values.

With generics:

```java
List<String> names = new ArrayList<>();
names.add("briac");
// names.add(42); // compile-time error
```

Java now enforces the expected type.

---

## Type parameters

A type parameter is a placeholder type (`T`, `E`, `K`, `V`) defined on classes, interfaces, or methods.

Common conventions:

- `T` -> generic type
- `E` -> element type (collections)
- `K`, `V` -> key/value in maps

Example with a generic class:

```java
public class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
```

Usage:

```java
Box<String> textBox = new Box<>();
textBox.set("hello");
String value = textBox.get();
```

---

## Bounded type parameters

Sometimes you want to restrict valid types.

```java
public class NumberBox<T extends Number> {
    private T value;

    public NumberBox(T value) {
        this.value = value;
    }

    public double toDouble() {
        return value.doubleValue();
    }
}
```

`T extends Number` means only numeric types are allowed (`Integer`, `Double`, etc.).

---

## Wildcards: `? extends` and `? super`

Wildcards make APIs flexible when exact generic types differ.

### `? extends T` (producer)

Use when you only need to read values as `T`.

```java
public static double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) {
        total += n.doubleValue();
    }
    return total;
}
```

You can pass `List<Integer>`, `List<Double>`, etc.
But you generally cannot add new values (except `null`), because concrete subtype is unknown.

### `? super T` (consumer)

Use when you want to write `T` values.

```java
public static void addDefaults(List<? super Integer> target) {
    target.add(0);
    target.add(1);
}
```

You can pass `List<Integer>`, `List<Number>`, or `List<Object>`.

### Quick rule: PECS

- Producer -> `extends`
- Consumer -> `super`

---

## Generic methods

A method can define its own type parameters, independent from class-level generics.

```java
public static <T> T first(List<T> list) {
    if (list == null || list.isEmpty()) {
        throw new IllegalArgumentException("list is empty");
    }
    return list.get(0);
}
```

Usage:

```java
String firstName = first(List.of("alice", "bob"));
Integer firstNumber = first(List.of(10, 20));
```

You can also define bounded generic methods:

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
```

---

## What about type erasure?

Java generics use type erasure:

- generic type info is mostly removed at runtime
- `List<String>` and `List<Integer>` are both `List` at runtime

Practical impacts:

- you cannot do `new T()`
- you cannot use `instanceof List<String>`
- prefer passing `Class<T>` when runtime type is needed

Example:

```java
public static <T> T create(Class<T> type) throws Exception {
    return type.getDeclaredConstructor().newInstance();
}
```

---

## Common mistakes to avoid

- using raw types (`List` instead of `List<String>`)
- overusing `<?>` and losing useful type information
- confusing `List<Number>` with `List<Integer>` (they are not parent/child)
- forcing unsafe casts that defeat generic safety

---

## Mini backend example

```java
public record ApiResponse<T>(boolean success, T data, String error) {}

public static <T> ApiResponse<T> ok(T data) {
    return new ApiResponse<>(true, data, null);
}

public static <T> ApiResponse<T> fail(String message) {
    return new ApiResponse<>(false, null, message);
}
```

Usage:

```java
ApiResponse<String> r1 = ok("created");
ApiResponse<Integer> r2 = ok(201);
ApiResponse<Void> r3 = fail("invalid token");
```

Single model, strongly typed for many payload shapes.

---

## Takeaway

For robust Java generics usage:

1. use type parameters for compile-time safety
2. apply bounded types when APIs require constraints
3. use `? extends` and `? super` with PECS
4. use generic methods to keep utility code reusable
5. avoid raw types and unsafe casts
