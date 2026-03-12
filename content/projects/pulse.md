---
title: Pulse
description: Local Java APM agent for Spring Boot 3+ with SQL, HTTP, and JVM metrics exposed through a built-in offline web UI.
tags: [java, apm, observability, monitoring]
stack: [java, spring-boot]
year: 2026
active: true
cover: /projects/pulse.webp
links:
  repo: https://github.com/briacdev/pulse
  demo: https://pulse.briacd.com/
---

## Project Context

Pulse was built around a simple constraint: keep application diagnostics local.

Many monitoring products assume an external collector, a hosted dashboard, or another service to operate. Pulse takes the opposite direction. It attaches directly to the JVM as a `-javaagent`, starts with the application, collects useful telemetry, and exposes everything through a local web UI.

The result is a lightweight APM workflow designed for developers and teams who want visibility without adding a full observability platform.

## What Pulse Collects

### SQL activity

- JDBC query instrumentation for `Statement` and `PreparedStatement`
- query duration, errors, and SQL operation type
- Spring context enrichment
- SQL to HTTP correlation through `traceId` or thread/time fallback

### HTTP activity

- endpoint transactions with method and path
- status code, latency, and error tracking
- sampled hotspots and call-stack visibility
- request metadata with masking and sensitive filtering

### JVM metrics

- heap usage
- process CPU
- threads and garbage collection activity
- average HTTP latency and p95 indicators

## Operating Model

Pulse is designed to stay simple in production-like environments:

- no external collector
- no additional database
- no mandatory cloud dependency
- a single agent JAR started with the target JVM

That makes it useful for local debugging, offline analysis, staging validation, and self-hosted environments where telemetry should not leave the machine.

## Launch Model

The integration model is intentionally small:

```bash
java \
  -javaagent:/path/to/pulse/target/pulse-1.0.0-agent.jar=port=17321 \
  -jar /path/to/your-app.jar
```

Once the application starts, Pulse exposes a local UI and API on the configured port.

## Why This Project Matters

Pulse is not trying to replace a full enterprise observability stack. Its value is elsewhere:

- immediate visibility with minimal setup
- easier diagnostics for Spring Boot applications
- better control over sensitive HTTP and SQL metadata
- offline-first operation for restricted environments

This makes it a strong fit for teams that want a practical troubleshooting layer before introducing heavier infrastructure.

## Current Direction

The project is focused on keeping the runtime small while improving the quality of collected insights:

- better correlation between HTTP requests and SQL execution
- clearer hotspot and call-stack views
- stable JVM-level metrics for day-to-day diagnostics
- a local UI simple enough to use without onboarding overhead

## External Links

- Live product: [pulse.briacd.com](https://pulse.briacd.com/)
- Repository: [github.com/briacdev/pulse](https://github.com/briacdev/pulse)
