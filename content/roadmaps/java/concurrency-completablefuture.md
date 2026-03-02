---
title: Concurrency - CompletableFuture
description: Learn asynchronous pipelines in Java with CompletableFuture, composition patterns, and robust error handling.
date: 2025-01-09
tags: [java, concurrency, completablefuture, async]
draft: false
readingTime: 14 min
---

## Why this step matters

Many backend flows call multiple services and should not block a request thread for each step.
`CompletableFuture` enables non-blocking composition and better pipeline structure.

## Basic async task

```java
CompletableFuture<String> userFuture = CompletableFuture.supplyAsync(() -> fetchUserName(42));
String name = userFuture.join();
```

`join()` waits and wraps errors in unchecked exceptions.

## Transform and chain

```java
CompletableFuture<String> greeting = CompletableFuture
    .supplyAsync(() -> "briac")
    .thenApply(String::toUpperCase)
    .thenApply(name -> "hello " + name);
```

- `thenApply`: synchronous transform of previous result
- `thenCompose`: chain another async future (flatten nested futures)

## Compose multiple async tasks

```java
CompletableFuture<User> user = CompletableFuture.supplyAsync(() -> loadUser(1));
CompletableFuture<List<Order>> orders = CompletableFuture.supplyAsync(() -> loadOrders(1));

CompletableFuture<UserDashboard> dashboard = user.thenCombine(
    orders,
    UserDashboard::new
);
```

## Error handling

```java
CompletableFuture<String> safe = CompletableFuture
    .supplyAsync(this::callRemote)
    .exceptionally(ex -> "fallback");
```

Useful handlers:

- `exceptionally(...)`
- `handle(...)`
- `whenComplete(...)`

## Timeouts

```java
CompletableFuture<String> result = CompletableFuture
    .supplyAsync(this::callRemote)
    .orTimeout(2, TimeUnit.SECONDS)
    .exceptionally(ex -> "timeout-fallback");
```

## Common mistakes

- blocking too early with `join()` everywhere
- mixing heavy blocking I/O in default common pool
- forgetting error paths in composed pipelines
- creating overly complex chains without naming intermediate steps

## Takeaway

1. Use `CompletableFuture` for async composition, not just async execution
2. Prefer `thenCompose`/`thenCombine` for clear pipelines
3. Handle timeouts and failures explicitly
4. Keep async chains readable and observable
