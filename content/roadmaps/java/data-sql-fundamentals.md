---
title: Data - SQL Fundamentals
description: "Learn essential SQL concepts for backend developers: joins, indexes, transactions, and query optimization basics."
date: 2025-01-11
tags: [java, data, sql, databases]
draft: false
readingTime: 14 min
---

## Why this step matters

Even with ORM tools, backend performance and correctness depend on SQL knowledge.
If you cannot read SQL plans and join logic, production incidents become hard to solve.

## Core query operations

```sql
SELECT id, email
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 20;
```

Learn to use:

- `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`
- `INSERT`, `UPDATE`, `DELETE`

## Joins

```sql
SELECT u.id, u.email, o.total
FROM users u
JOIN orders o ON o.user_id = u.id;
```

Important join types:

- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN` (less common)

Know what happens when rows are missing on one side.

## Indexes

Indexes accelerate lookups and sorting, but add write overhead.

Good candidates:

- columns in frequent `WHERE`
- join keys
- ordering columns (`ORDER BY`)

Bad pattern:

- creating many unused indexes

## Transactions

Transactions group operations atomically.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

If something fails, rollback should restore consistency.

## Query optimization basics

- select only needed columns
- avoid `SELECT *` in hot paths
- paginate large result sets
- inspect plans with `EXPLAIN`

## Common mistakes

- N+1 style repeated queries
- missing indexes on join/filter columns
- long transactions holding locks too long
- ignoring isolation level effects

## Takeaway

1. SQL is a core backend skill, even with ORM
2. Master joins, indexes, and transactions
3. Use `EXPLAIN` and measure before optimizing blindly
4. Optimize for both read speed and write cost
