---
title: Language Basics - Control Flow
description: Learn Java control flow with clear examples of if/else, switch, loops, and the use of break, continue, and return.
date: 2024-12-24
tags: [java, language-basics, control-flow]
draft: false
readingTime: 11 min
---

## Why control flow matters

Control flow defines how your program makes decisions and repeats logic.
If you write it clearly, your code is easier to understand, test, and maintain.

## `if`, `else if`, `else`

Use `if` when behavior depends on conditions.

```java
int score = 72;

if (score >= 90) {
    System.out.println("Excellent");
} else if (score >= 70) {
    System.out.println("Good");
} else if (score >= 50) {
    System.out.println("Average");
} else {
    System.out.println("Needs work");
}
```

### Best practices

- Keep conditions simple
- Prefer early returns to avoid deep nesting
- Extract complex boolean logic into named methods

## `switch`

Use `switch` for multi-branch decisions on one value.

### Classic switch

```java
String role = "ADMIN";

switch (role) {
    case "ADMIN":
        System.out.println("Full access");
        break;
    case "EDITOR":
        System.out.println("Edit access");
        break;
    case "VIEWER":
        System.out.println("Read-only access");
        break;
    default:
        System.out.println("Unknown role");
}
```

### Modern switch expression (recommended)

```java
String role = "EDITOR";

String access = switch (role) {
    case "ADMIN" -> "full";
    case "EDITOR" -> "edit";
    case "VIEWER" -> "read";
    default -> "none";
};

System.out.println(access);
```

This form is often safer and more concise.

## Loops: `for`, `while`, `do-while`

### `for` loop

Use when iteration count is known.

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Iteration " + i);
}
```

### `while` loop

Use when repetition depends on a condition checked before each iteration.

```java
int attempts = 0;
while (attempts < 3) {
    System.out.println("Try #" + attempts);
    attempts++;
}
```

### `do-while` loop

Use when the body must run at least once.

```java
int n = 0;
do {
    System.out.println("Runs at least once");
    n++;
} while (n < 1);
```

## `break`, `continue`, `return`

These keywords control execution flow precisely.

### `break`

Stops the nearest loop or switch.

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}
```

### `continue`

Skips the current iteration and moves to the next one.

```java
for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        continue;
    }
    System.out.println("Odd: " + i);
}
```

### `return`

Exits the current method immediately.

```java
public static String classify(int age) {
    if (age < 0) {
        return "invalid";
    }
    if (age < 18) {
        return "minor";
    }
    return "adult";
}
```

## Clear control flow patterns

### 1. Guard clauses

Prefer early `return` for invalid inputs.

```java
public static double divide(double a, double b) {
    if (b == 0) {
        throw new IllegalArgumentException("b must not be zero");
    }
    return a / b;
}
```

### 2. Avoid deep nesting

Nested `if` blocks quickly reduce readability.
Refactor conditions or split logic into small methods.

### 3. Use the right loop

- `for`: fixed iteration count
- `while`: condition-driven iteration
- `do-while`: always execute once before checking

## Common mistakes to avoid

- Missing `break` in classic `switch` and causing accidental fall-through
- Infinite loops due to unchanged loop variables
- Overusing `continue` and making loops hard to read
- Using complex boolean expressions without parentheses or helper methods

## Practical mini example

```java
public static void processOrders(int[] orders) {
    for (int order : orders) {
        if (order <= 0) {
            continue; // skip invalid IDs
        }
        if (order == 999) {
            break; // emergency stop marker
        }
        System.out.println("Processing order " + order);
    }
}
```

This combines condition checks, `continue`, and `break` in a realistic flow.

## Takeaway

Control flow is the backbone of readable Java code.
Write conditions and loops with intent, use `switch`/`return` thoughtfully, and keep the flow predictable for future maintainers.
