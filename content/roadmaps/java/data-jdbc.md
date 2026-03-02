---
title: Data - JDBC
description: "Learn JDBC fundamentals for Java backend: connections, prepared statements, transactions, and result mapping."
date: 2025-01-12
tags: [java, data, jdbc, sql]
draft: false
readingTime: 13 min
---

## Why this step matters

JDBC is the low-level foundation behind many higher-level data libraries.
Understanding it helps debug connection issues, SQL behavior, and transaction boundaries.

## Core components

- `DataSource`: connection factory/pool entry point
- `Connection`: DB session
- `PreparedStatement`: parameterized SQL
- `ResultSet`: query result rows

## Basic query example

```java
String sql = "SELECT id, email FROM users WHERE id = ?";

try (Connection con = dataSource.getConnection();
     PreparedStatement ps = con.prepareStatement(sql)) {

    ps.setLong(1, 42L);

    try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
            long id = rs.getLong("id");
            String email = rs.getString("email");
            System.out.println(id + " " + email);
        }
    }
}
```

## Why prepared statements matter

Prepared statements:

- prevent SQL injection by separating query and values
- improve reuse of execution plans

Never build SQL with user values through string concatenation.

## Transactions with JDBC

```java
try (Connection con = dataSource.getConnection()) {
    con.setAutoCommit(false);
    try {
        // execute multiple statements
        con.commit();
    } catch (Exception e) {
        con.rollback();
        throw e;
    }
}
```

## Mapping results

Map each row to a domain object or DTO.
Keep mapping code explicit and testable.

```java
record UserRow(long id, String email) {}
```

## Common mistakes

- not closing resources (`Connection`, `Statement`, `ResultSet`)
- dynamic SQL concatenation with unsafe values
- weak transaction handling and missing rollback
- silently swallowing SQL exceptions

## Takeaway

1. JDBC gives you precise control and debugging clarity
2. Use `PreparedStatement` by default
3. Manage transactions and resource closing carefully
4. Keep result mapping explicit and maintainable
