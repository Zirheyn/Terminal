---
title: Data - JPA and Hibernate
description: "Learn JPA/Hibernate essentials: entity mapping, lazy vs eager loading, N+1 pitfalls, and transaction boundaries."
date: 2025-01-13
tags: [java, data, jpa, hibernate]
draft: false
readingTime: 15 min
---

## Why this step matters

JPA/Hibernate accelerates development, but hidden query behavior can create major performance issues if not understood.

## Entity mapping basics

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
}
```

Core annotations:

- `@Entity`, `@Table`
- `@Id`, `@GeneratedValue`
- relation mapping annotations (`@OneToMany`, `@ManyToOne`, etc.)

## Lazy vs eager loading

- `LAZY`: load relation only when accessed
- `EAGER`: load relation immediately

Default recommendation: prefer `LAZY` and fetch intentionally.

## N+1 query problem

N+1 appears when loading a collection of entities then lazily loading each relation one by one.

Typical mitigation:

- `JOIN FETCH`
- entity graphs
- projection queries for read models

## Transaction boundaries

Keep transactions around coherent business operations.

In Spring:

```java
@Transactional
public void processOrder(Long orderId) {
    // load, validate, update, persist
}
```

Do not keep transactions open longer than needed.

## Practical advice

- distinguish write model entities from read DTO/projections
- log SQL in dev to understand generated queries
- measure before tuning

## Common mistakes

- default eager loading everywhere
- returning entities directly in public APIs
- ignoring flush/transaction timing
- no test coverage for data access behavior

## Takeaway

1. JPA boosts productivity, but SQL understanding is still required
2. Manage loading strategy intentionally
3. Watch for N+1 and fix with explicit fetch strategy
4. Keep transaction scope clear and minimal
