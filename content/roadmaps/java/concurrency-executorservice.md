---
title: Concurrency - ExecutorService
description: Learn thread pools with ExecutorService, Callable and Future, and graceful shutdown patterns for backend services.
date: 2025-01-08
tags: [java, concurrency, executor, futures]
draft: false
readingTime: 13 min
---

## Why this step matters

Creating threads manually for every task does not scale.
`ExecutorService` gives controlled concurrency through thread pools.

## Thread pools

Use a pool to reuse threads and limit resource usage.

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
```

Typical choices:

- fixed pool for stable workloads
- cached pool for bursty short tasks
- scheduled pool for periodic jobs

## Runnable vs Callable

- `Runnable`: no result
- `Callable<T>`: returns a result and can throw checked exceptions

```java
Callable<Integer> task = () -> 21 * 2;
Future<Integer> future = pool.submit(task);
Integer value = future.get();
```

## `Future` basics

`Future` lets you:

- wait for completion (`get()`)
- check status (`isDone()`)
- cancel tasks (`cancel(true)`)

Avoid blocking everywhere with `get()`; use timeouts when possible.

```java
Integer value = future.get(1, TimeUnit.SECONDS);
```

## Graceful shutdown

Always close executors cleanly.

```java
pool.shutdown();
if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
    pool.shutdownNow();
}
```

This prevents resource leaks and hanging JVM shutdown.

## Common mistakes

- never shutting down the pool
- using unbounded pools in production
- blocking inside pool tasks for long I/O without sizing strategy
- swallowing exceptions from futures

## Practical rule

Use `ExecutorService` as the default low-level concurrency tool when you need explicit thread-pool control.

## Takeaway

1. Prefer pools over ad-hoc threads
2. Use `Callable/Future` for result-based tasks
3. Apply timeouts on blocking waits
4. Always implement graceful shutdown
