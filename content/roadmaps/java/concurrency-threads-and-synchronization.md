---
title: Concurrency - Threads and Synchronization
description: Understand Java thread lifecycle, synchronization, locks, and race conditions with practical examples.
date: 2025-01-07
tags: [java, concurrency, threads, synchronization]
draft: false
readingTime: 14 min
---

## Why this step matters

Modern backend services handle many requests simultaneously.
Without concurrency basics, shared state can become inconsistent and create non-deterministic bugs.

## Thread lifecycle basics

A thread typically moves through:

- new
- runnable/running
- blocked or waiting
- terminated

```java
Thread t = new Thread(() -> System.out.println("worker"));
t.start();
```

## Race condition example

A race condition happens when multiple threads update shared state without coordination.

```java
class Counter {
    int value = 0;

    void increment() {
        value++; // not atomic
    }
}
```

Two threads can read the same value and overwrite each other.

## `synchronized`

Use `synchronized` to guard critical sections.

```java
class SafeCounter {
    private int value = 0;

    synchronized void increment() {
        value++;
    }

    synchronized int get() {
        return value;
    }
}
```

This ensures one thread enters the synchronized method at a time.

## Locks (`ReentrantLock`)

Locks give more control than `synchronized`.

```java
Lock lock = new ReentrantLock();

lock.lock();
try {
    // critical section
} finally {
    lock.unlock();
}
```

Use locks when you need features like `tryLock()` or fair locking.

## Visibility and atomicity

- `volatile`: visibility guarantee for reads/writes, not full atomic updates
- `AtomicInteger`: atomic operations without explicit lock for simple counters

```java
AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();
```

## Common mistakes

- sharing mutable objects without synchronization
- locking too much code (performance bottleneck)
- forgetting `unlock()` in lock-based code
- assuming bugs will be easy to reproduce

## Takeaway

1. Understand race conditions and shared mutable state risk
2. Use `synchronized` or locks for critical sections
3. Prefer atomic classes for simple shared counters
4. Keep thread-safe design explicit and minimal
