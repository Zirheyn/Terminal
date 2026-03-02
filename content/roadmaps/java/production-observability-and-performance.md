---
title: Production - Observability and Performance
description: "Learn production essentials for Java services: structured logging, metrics, tracing, profiling, and performance tuning workflow."
date: 2025-01-19
tags: [java, production, observability, performance]
draft: false
readingTime: 15 min
---

## Why this step matters

If you cannot observe your system, you cannot operate it reliably.
Production quality depends on both visibility and performance discipline.

## Structured logs

Prefer structured logs over free text.
Include stable fields like:

- timestamp
- level
- service name
- request id / trace id
- user or tenant id when relevant

This makes search and correlation much faster.

## Metrics and tracing

Metrics answer: "what is happening?"
Tracing answers: "where is time spent across services?"

Core metrics to expose:

- request rate
- latency percentiles (p50/p95/p99)
- error rate
- JVM memory/GC

## Alerting mindset

Alert on symptoms that impact users, not on noisy low-level events.
Define SLO-oriented thresholds when possible.

## Profiling and tuning workflow

1. measure baseline
2. identify bottleneck
3. change one thing
4. measure again

Never optimize blindly.

## Typical bottlenecks

- excessive DB round-trips
- blocking I/O under high load
- high object allocation and GC pressure
- hot code paths with inefficient algorithms

## Common mistakes

- no correlation id in logs
- collecting metrics but not using dashboards/alerts
- tuning JVM flags without evidence
- optimizing micro-code before fixing architecture hotspots

## Takeaway

1. Observability is part of the product, not an optional add-on
2. Use logs, metrics, and traces together
3. Tune performance through measurement loops
4. Focus first on user-impacting bottlenecks
