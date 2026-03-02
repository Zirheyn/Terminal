---
title: Error Handling - Exceptions
description: Learn how Java exceptions work with checked vs unchecked types, try/catch/finally, and custom exception design.
date: 2024-12-29
tags: [java, error-handling, exceptions]
draft: false
readingTime: 12 min
---

## Why exception handling matters

In production systems, failures are normal: network calls fail, input is invalid, files are missing.
Exception handling is how Java lets you model, propagate, and control those failures.

Good exception handling prevents silent bugs and makes troubleshooting faster.

## What is an exception

An exception is an object representing an error condition that interrupts normal flow.

```java
int result = 10 / 0; // throws ArithmeticException
```

When an exception is thrown and not handled, it propagates up the call stack.

## Checked vs unchecked exceptions

### Checked exceptions

Checked exceptions must be handled or declared with `throws`.
They represent recoverable or expected external failures.

Examples:

- `IOException`
- `SQLException`

```java
public String readConfig(Path path) throws IOException {
    return Files.readString(path);
}
```

### Unchecked exceptions

Unchecked exceptions extend `RuntimeException`.
They are usually programming errors or invalid usage.

Examples:

- `NullPointerException`
- `IllegalArgumentException`
- `IllegalStateException`

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age must be >= 0");
    }
}
```

### Quick rule

- checked: caller can realistically recover
- unchecked: caller violated assumptions or state is invalid

## Runtime vs non-runtime exceptions (clear distinction)

In Java, people often say "runtime exception" vs "non-runtime exception":

- **Runtime exception** = unchecked exception (`RuntimeException` and subclasses)
- **Non-runtime exception** = checked exception (`Exception` subclasses that are not `RuntimeException`)

### Main practical difference

| Type | Compiler requirement | Typical intent |
|---|---|---|
| Runtime (unchecked) | No forced `try/catch` or `throws` | Programming errors, invalid state, invalid API usage |
| Non-runtime (checked) | Must `catch` or declare `throws` | Recoverable or expected external failures |

### Example

```java
// checked (non-runtime): compiler enforces handling
Files.readString(Path.of("missing.txt")); // IOException must be handled or declared

// unchecked (runtime): compiles, may fail at runtime
Integer.parseInt("abc"); // NumberFormatException at runtime
```

## `try`, `catch`, `finally`

### Basic usage

```java
try {
    int value = Integer.parseInt("42");
    System.out.println(value);
} catch (NumberFormatException e) {
    System.out.println("Invalid number format");
}
```

### Multiple catches

```java
try {
    // risky operations
} catch (IOException e) {
    System.out.println("I/O issue: " + e.getMessage());
} catch (IllegalArgumentException e) {
    System.out.println("Bad argument: " + e.getMessage());
}
```

### `finally`

`finally` is executed whether an exception occurs or not.
Useful for cleanup.

```java
InputStream in = null;
try {
    in = Files.newInputStream(Path.of("config.txt"));
    // read stream
} catch (IOException e) {
    System.out.println("Read error");
} finally {
    if (in != null) {
        try { in.close(); } catch (IOException ignored) {}
    }
}
```

### Prefer try-with-resources

Modern Java cleanup should usually use try-with-resources:

```java
try (InputStream in = Files.newInputStream(Path.of("config.txt"))) {
    // read stream safely
} catch (IOException e) {
    System.out.println("Read error");
}
```

## Throwing and rethrowing exceptions

### Throwing

```java
if (token == null || token.isBlank()) {
    throw new IllegalArgumentException("Token is required");
}
```

### Wrapping lower-level exceptions with context

```java
public User loadUser(String id) {
    try {
        return repository.findById(id);
    } catch (SQLException e) {
        throw new RuntimeException("Failed to load user with id=" + id, e);
    }
}
```

This preserves original cause (`e`) while adding business context.

## Custom exception types

Custom exceptions make failure semantics explicit.

### Example unchecked custom exception

```java
public class DomainValidationException extends RuntimeException {
    public DomainValidationException(String message) {
        super(message);
    }
}
```

Usage:

```java
if (amount <= 0) {
    throw new DomainValidationException("Amount must be positive");
}
```

### Example checked custom exception

```java
public class ExternalServiceException extends Exception {
    public ExternalServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

Use checked custom exceptions when callers are expected to recover explicitly.

## Best practices

1. Fail fast on invalid input (`IllegalArgumentException`)
2. Catch exceptions at meaningful boundaries (API/service layer), not everywhere
3. Preserve causes when rethrowing
4. Use specific exception types over generic `Exception`
5. Avoid empty catch blocks
6. Log once at the right level (avoid duplicate logs for same error)

## Common mistakes

- catching `Exception` too early and hiding root cause
- using exceptions for normal control flow
- losing stack traces when rethrowing incorrectly
- exposing low-level technical messages directly to end users

## Practical mini example

```java
public String parsePort(String value) {
    try {
        int port = Integer.parseInt(value);
        if (port < 1 || port > 65535) {
            throw new IllegalArgumentException("Port out of range");
        }
        return "Port is valid: " + port;
    } catch (NumberFormatException e) {
        throw new IllegalArgumentException("Port must be numeric", e);
    }
}
```

This pattern validates input and returns clear domain errors.

## Takeaway

For robust Java error handling:

1. understand checked vs unchecked intent
2. use `try/catch/finally` (or try-with-resources) correctly
3. model domain failures with meaningful custom exceptions
4. keep error messages actionable and contextual

These fundamentals are required before building production-ready services.
