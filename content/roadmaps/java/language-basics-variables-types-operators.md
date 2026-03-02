---
title: Language Basics - Variables, Types, Operators
description: Learn Java variable declaration, primitive vs wrapper types, safe casting, and arithmetic/logical operators with practical examples.
date: 2024-12-23
tags: [java, language-basics, types, operators]
draft: false
readingTime: 10 min
---

## Why this step matters

Most Java bugs in beginner code come from weak type understanding and operator misuse.
If you master variables, types, and operators early, your code becomes safer, clearer, and easier to debug.

## Variables in Java

A variable is a named container for a value.
In Java, every variable has a type known at compile time.

### Declaration and initialization

```java
int age = 28;
String name = "Briac";
boolean active = true;
```

You can declare first, assign later:

```java
double price;
price = 19.99;
```

### `final` variables (constants)

Use `final` when a value should not change:

```java
final double VAT_RATE = 0.20;
```

A `final` variable must be assigned once and cannot be reassigned.

## Primitive types vs wrapper classes

Java has 8 primitive types.
Wrappers are object representations of primitives and are useful in collections, generics, and APIs expecting objects.

| Primitive | Wrapper | Typical use |
|---|---|---|
| `byte` | `Byte` | very small integers |
| `short` | `Short` | small integers |
| `int` | `Integer` | default integer choice |
| `long` | `Long` | large integer values |
| `float` | `Float` | decimal values (less precision) |
| `double` | `Double` | default decimal choice |
| `char` | `Character` | single Unicode character |
| `boolean` | `Boolean` | true/false flags |

### Key differences

- Primitive: faster, no null, stored as raw value
- Wrapper: object, can be `null`, useful with generic types (`List<Integer>`)

### Autoboxing and unboxing

Java can convert automatically:

```java
Integer boxed = 10;   // autoboxing (int -> Integer)
int unboxed = boxed;  // unboxing (Integer -> int)
```

Be careful with null wrappers:

```java
Integer count = null;
// int n = count; // throws NullPointerException at runtime
```

## Type casting

Type casting means converting one type to another.

### Widening cast (implicit, safe)

From smaller to larger compatible type:

```java
int i = 42;
long l = i;      // implicit
double d = l;    // implicit
```

### Narrowing cast (explicit, risk of loss)

From larger to smaller type requires explicit cast:

```java
double d = 9.75;
int i = (int) d; // 9 (decimal part lost)
```

Overflow example:

```java
int value = 130;
byte b = (byte) value; // -126 (overflow)
```

### Best practice

- Prefer widening conversions when possible
- Use narrowing casts only when intentional
- Validate bounds before narrowing

## Arithmetic operators

Main arithmetic operators:

- `+` addition
- `-` subtraction
- `*` multiplication
- `/` division
- `%` remainder

```java
int a = 10;
int b = 3;
System.out.println(a / b); // 3 (integer division)
System.out.println(a % b); // 1
```

Use `double` when you need decimal division:

```java
double result = 10.0 / 3;
System.out.println(result); // 3.333...
```

### Increment and decrement

```java
int x = 5;
x++; // x = 6
x--; // x = 5
```

## Relational and logical operators

Relational operators compare values:

- `==`, `!=`, `>`, `<`, `>=`, `<=`

Logical operators combine boolean expressions:

- `&&` AND
- `||` OR
- `!` NOT

```java
int age = 20;
boolean hasTicket = true;

boolean canEnter = age >= 18 && hasTicket;
```

### Short-circuit behavior

`&&` and `||` stop evaluation early when result is already known.
This is useful for null-safe checks:

```java
String email = null;
if (email != null && email.contains("@")) {
    System.out.println("Valid email format");
}
```

## Common mistakes to avoid

- Using `==` for String content comparison (use `.equals()`)
- Ignoring integer division behavior
- Casting without checking value range
- Unboxing nullable wrappers

## Mini practice examples

### Example 1: safe average

```java
double sum = 17;
int count = 4;
double avg = sum / count; // 4.25
```

### Example 2: eligibility rule

```java
int age = 17;
boolean parentalConsent = true;
boolean allowed = age >= 18 || parentalConsent;
```

## Takeaway

At this stage, focus on three rules:

1. Choose the right type first
2. Cast explicitly and carefully
3. Keep boolean conditions readable

These basics are the foundation for control flow, methods, and object-oriented code.
