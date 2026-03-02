---
title: Language Basics - Methods and Parameters
description: Understand Java method signatures, pass-by-value behavior, and method overloading with clear practical examples.
date: 2024-12-25
tags: [java, language-basics, methods, parameters]
draft: false
readingTime: 11 min
---

## Why methods matter

Methods are the basic unit of reusable behavior in Java.
Good method design improves readability, testability, and long-term maintainability.

## What is a method

A method is a named block of code that can accept inputs (parameters), perform logic, and return a value.

```java
public static int add(int a, int b) {
    return a + b;
}
```

Parts of this method:

- `public` -> access modifier
- `static` -> belongs to class, not instance
- `int` -> return type
- `add` -> method name
- `(int a, int b)` -> parameter list

## Method signatures

In Java, a method signature is:

- method name
- parameter types (and order)

Return type is **not** part of the signature.

### Example

```java
void log(String msg) {}
void log(int code) {}
```

These are different signatures because parameter types differ.

This is **not valid**:

```java
int parse(String value) { return 1; }
// double parse(String value) { return 1.0; } // invalid: same signature
```

Only changing return type does not create a new signature.

## Parameters in Java

Parameters are local variables created when the method is called.

```java
public static double applyDiscount(double price, double rate) {
    return price - (price * rate);
}
```

### Parameter naming best practice

- Use explicit names (`unitPrice`, `discountRate`) over generic names (`a`, `b`)
- Keep parameter count small when possible
- Group related values in objects when argument lists grow too much

## Pass-by-value behavior (very important)

Java is always **pass-by-value**.

What changes is the value being copied:

- for primitives: the primitive value is copied
- for objects: the object reference is copied

### Primitive example

```java
public static void increment(int x) {
    x++;
}

int n = 5;
increment(n);
System.out.println(n); // 5 (unchanged)
```

`x` is a copy of `n`, so changing `x` does not change `n`.

### Object reference example

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

The reference is copied, but both references point to the same object.
Mutating object state is visible outside.

### Reassigning the parameter reference

```java
public static void reset(User user) {
    user = new User("New");
}

User u = new User("Bob");
reset(u);
System.out.println(u.name); // Bob
```

Reassigning `user` only changes the local copy of the reference.

## Method overloading

Overloading means defining multiple methods with the same name but different parameter signatures.

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

### Why overloading is useful

- cleaner APIs with consistent naming
- flexibility for different input types
- easier developer experience at call sites

### Overloading rules reminder

You must change at least one of:

- number of parameters
- parameter types
- parameter order (if types differ)

Changing only parameter names or return type is not enough.

## Practical design advice

### 1. Keep methods focused

A method should do one clear thing.
If a method has too many responsibilities, split it.

### 2. Return values instead of hidden side effects

Prefer explicit outputs over silent mutation when possible.

### 3. Validate inputs at method boundary

```java
public static int divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("b must not be zero");
    }
    return a / b;
}
```

### 4. Avoid boolean parameter overload confusion

A call like `save(user, true, false)` is hard to read.
Prefer options objects or explicit methods when behavior diverges.

## Common mistakes to avoid

- Confusing signature with return type
- Assuming Java is pass-by-reference
- Overloading too aggressively and creating ambiguous APIs
- Writing long methods with unclear purpose

## Mini example

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

This combines clear signatures, overloading, and predictable behavior.

## Takeaway

For method fundamentals, remember:

1. Signatures define method uniqueness
2. Java parameters are always pass-by-value
3. Overloading is useful when it improves API clarity

These rules are essential before moving to OOP design and clean architecture patterns.
