---
title: Core APIs - Strings and Date/Time
description: Learn Java String fundamentals, immutability, StringBuilder usage, and modern date/time handling with java.time formatting and parsing.
date: 2024-12-30
tags: [java, core-apis, strings, datetime]
draft: false
readingTime: 12 min
---

## Why this step matters

Strings and date/time values appear in almost every backend application: logs, APIs, business rules, validation, reporting.
Most subtle bugs in Java business code come from weak handling of these two areas.

## String basics

A `String` in Java is a sequence of characters represented by an object.

```java
String name = "Briac";
```

Common operations:

```java
String email = "briac@example.com";
System.out.println(email.length());         // 17
System.out.println(email.toUpperCase());    // BRIAC@EXAMPLE.COM
System.out.println(email.contains("@"));    // true
```

## String immutability

Java `String` is immutable.
Any modification creates a new object instead of changing the original one.

```java
String base = "Hello";
String updated = base + " World";

System.out.println(base);    // Hello
System.out.println(updated); // Hello World
```

### Why immutability is useful

- safer sharing across threads
- predictable behavior
- easier caching and reuse

### Common mistake

Doing many string concatenations in loops can create many intermediate objects.

## `StringBuilder` for mutable string construction

Use `StringBuilder` when you build strings incrementally.

```java
StringBuilder sb = new StringBuilder();
sb.append("User: ").append("briac").append(", role: ").append("admin");

String result = sb.toString();
System.out.println(result);
```

### Loop example

```java
StringBuilder csv = new StringBuilder();
for (int i = 1; i <= 3; i++) {
    if (i > 1) csv.append(",");
    csv.append(i);
}
System.out.println(csv); // 1,2,3
```

For heavy string assembly, `StringBuilder` is usually the right default.

## `java.time` API (modern date/time)

Avoid old APIs (`java.util.Date`, `Calendar`) for new code.
Prefer `java.time` (Java 8+), which is clearer and mostly immutable.

Core types:

- `LocalDate` -> date only (`2026-03-02`)
- `LocalTime` -> time only (`14:30`)
- `LocalDateTime` -> date + time, no timezone
- `Instant` -> machine timestamp in UTC
- `ZonedDateTime` -> date/time with timezone
- `Duration` / `Period` -> time intervals

### Basic usage

```java
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusWeeks(1);

System.out.println(today);
System.out.println(nextWeek);
```

### Timezone-aware example

```java
ZonedDateTime parisNow = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
ZonedDateTime nyNow = parisNow.withZoneSameInstant(ZoneId.of("America/New_York"));

System.out.println(parisNow);
System.out.println(nyNow);
```

## Formatting and parsing

Use `DateTimeFormatter` to convert between objects and strings.

### Formatting

```java
LocalDate date = LocalDate.of(2026, 3, 2);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

String text = date.format(fmt); // 02/03/2026
System.out.println(text);
```

### Parsing

```java
String input = "02/03/2026";
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

LocalDate parsed = LocalDate.parse(input, fmt);
System.out.println(parsed); // 2026-03-02
```

### ISO format recommendation

For APIs and storage, prefer ISO standards:

- `LocalDate` -> `2026-03-02`
- `Instant` -> `2026-03-02T11:45:00Z`

This avoids locale ambiguity.

## Practical rules for backend projects

1. Use `StringBuilder` for dynamic string assembly
2. Use `java.time` types by intent (`LocalDate` vs `Instant`)
3. Keep internal timestamps in UTC when possible
4. Convert timezone close to presentation layer
5. Use explicit formatters for user-facing dates

## Common mistakes to avoid

- comparing strings with `==` instead of `.equals()`
- using mutable legacy date APIs in new modules
- storing local time without timezone context for global systems
- parsing date strings without fixed format

## Mini example

```java
public String buildAuditLine(String userId, Instant when, ZoneId zone) {
    ZonedDateTime zdt = when.atZone(zone);
    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");

    return new StringBuilder()
        .append("user=").append(userId)
        .append(" | at=").append(zdt.format(fmt))
        .toString();
}
```

This combines StringBuilder + java.time + formatting in a realistic service-style method.

## Takeaway

For reliable Java core API usage:

1. treat `String` as immutable and use `StringBuilder` when needed
2. use `java.time` as the default date/time toolkit
3. format/parse explicitly to avoid locale and timezone bugs

Mastering this step prevents a large class of production issues.

