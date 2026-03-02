---
title: Functional Java - Lambdas and Functional Interfaces
description: Learn Java lambdas, standard functional interfaces, method references, and higher-order programming style with practical backend examples.
date: 2025-01-03
tags: [java, functional, lambdas, interfaces]
draft: false
readingTime: 15 min
---

## Why this step matters

Modern Java backend code uses functional style everywhere:

- collection processing
- validation pipelines
- callbacks and strategy injection
- async composition APIs

If you understand lambdas and functional interfaces well, your code becomes shorter, clearer, and easier to compose.

## What is a lambda?

A lambda is an anonymous function: small behavior passed as a value.

```java
(x, y) -> x + y
```

This expression means: "take two parameters and return their sum."

## Lambda anatomy

A lambda has three parts:

1. parameters
2. `->` arrow
3. body (expression or block)

Examples:

```java
name -> name.trim()
(a, b) -> a + b
() -> "ready"
```

For multi-line logic, use a block body:

```java
text -> {
    String normalized = text.trim().toLowerCase();
    return normalized;
}
```

## Target typing (important)

A lambda has no standalone type by itself.
Its type is inferred from the target context (usually a functional interface).

```java
Predicate<String> valid = s -> s.contains("@");
Comparator<Integer> asc = (a, b) -> Integer.compare(a, b);
```

Same lambda shape can represent different contracts depending on context.

## Variable capture and `effectively final`

Lambdas can capture local variables from outer scope, but only if they are effectively final.

```java
int minLength = 3;
Predicate<String> longEnough = s -> s.length() >= minLength;
```

This works because `minLength` is not modified afterward.
If you reassign it later, compilation fails.

## Lambda vs anonymous class

Before lambdas, behavior objects were often written as anonymous classes.

```java
Comparator<String> c1 = new Comparator<>() {
    @Override
    public int compare(String a, String b) {
        return a.compareToIgnoreCase(b);
    }
};

Comparator<String> c2 = (a, b) -> a.compareToIgnoreCase(b);
```

Both are valid, but lambdas are shorter and usually more readable for simple behavior.

## Functional interface basics

A functional interface is an interface with exactly one abstract method.

```java
@FunctionalInterface
public interface Formatter {
    String format(String input);
}
```

You can implement it with a lambda:

```java
Formatter trimUpper = text -> text.trim().toUpperCase();
System.out.println(trimUpper.format("  briac  ")); // BRIAC
```

`@FunctionalInterface` is optional but recommended. It protects the interface from accidentally adding more abstract methods.

## Built-in functional interfaces

Java provides standard ones in `java.util.function`.

### `Predicate<T>` (test -> boolean)

```java
Predicate<String> hasAt = s -> s.contains("@");
System.out.println(hasAt.test("a@b.com")); // true
```

### `Function<T, R>` (transform input to output)

```java
Function<String, Integer> lengthFn = String::length;
System.out.println(lengthFn.apply("hello")); // 5
```

### `Consumer<T>` (consume value, no return)

```java
Consumer<String> log = s -> System.out.println("LOG: " + s);
log.accept("user created");
```

### `Supplier<T>` (produce value, no input)

```java
Supplier<Long> now = System::currentTimeMillis;
System.out.println(now.get());
```

## Method references

Method references are a compact form when a lambda only calls one method.

Examples:

```java
Function<String, Integer> f1 = s -> s.length();
Function<String, Integer> f2 = String::length; // same behavior
```

Common forms:

- `ClassName::staticMethod`
- `instance::instanceMethod`
- `ClassName::instanceMethod` (for first arg as receiver)
- `ClassName::new` (constructor reference)

Constructor example:

```java
Supplier<List<String>> listFactory = ArrayList::new;
List<String> list = listFactory.get();
```

## Higher-order style in Java

A higher-order method takes or returns functions.

```java
public static List<String> filterAndMap(
    List<String> values,
    Predicate<String> predicate,
    Function<String, String> mapper
) {
    List<String> out = new ArrayList<>();
    for (String v : values) {
        if (predicate.test(v)) {
            out.add(mapper.apply(v));
        }
    }
    return out;
}
```

Usage:

```java
List<String> input = List.of(" api ", "db", " cache ");
List<String> result = filterAndMap(
    input,
    s -> s.trim().length() >= 3,
    s -> s.trim().toUpperCase()
);
System.out.println(result); // [API, CACHE]
```

This pattern is common in reusable library-style utility code.

## Practical backend examples

### Validation rule injection

```java
public boolean validateToken(String token, Predicate<String> customRule) {
    return token != null && !token.isBlank() && customRule.test(token);
}
```

```java
boolean ok = validateToken("abc-123", t -> t.startsWith("abc-"));
```

### Post-processing callback

```java
public void processUser(String username, Consumer<String> onSuccess) {
    // business logic...
    onSuccess.accept(username);
}
```

```java
processUser("briac", u -> System.out.println("processed: " + u));
```

## Common mistakes to avoid

- writing long, complex lambdas that hide intent
- forcing functional style when simple imperative code is clearer
- capturing mutable external state in lambdas
- creating custom functional interfaces when standard ones fit

## Readability rules

1. Keep lambda bodies short
2. Prefer method references when obvious
3. Name variables by behavior (`isValid`, `toDto`, `onError`)
4. Extract complex logic into named methods

## Mini exercise pattern

Given a list of emails:

- keep only valid emails
- normalize to lowercase
- send each to a consumer

```java
List<String> emails = List.of("A@EXAMPLE.COM", "invalid", "b@site.org");

Predicate<String> isEmail = e -> e.contains("@");
Function<String, String> normalize = String::toLowerCase;
Consumer<String> sink = e -> System.out.println("send: " + e);

for (String email : emails) {
    if (isEmail.test(email)) {
        sink.accept(normalize.apply(email));
    }
}
```

## Takeaway

For strong functional Java foundations:

1. master lambdas as behavior values
2. use standard functional interfaces (`Predicate`, `Function`, `Consumer`, `Supplier`)
3. apply method references for concise readable code
4. use higher-order design where it improves reuse and clarity
