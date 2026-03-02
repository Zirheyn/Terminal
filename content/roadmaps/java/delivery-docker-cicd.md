---
title: Delivery - Docker and CI/CD
description: Learn how to containerize Java apps and build practical CI/CD pipelines with safe deployment strategies.
date: 2025-01-18
tags: [java, delivery, docker, cicd]
draft: false
readingTime: 14 min
---

## Why this step matters

Shipping software reliably is as important as writing code.
Docker and CI/CD make builds reproducible and deployments safer.

## Containerize the app

Typical Java Dockerfile pattern:

```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Use lightweight runtime images and keep image size controlled.

## CI pipeline essentials

A baseline pipeline should run:

1. lint/format checks
2. unit tests
3. build package
4. optional integration tests
5. image build and publish

Fail fast on quality gates.

## CD and deployment strategy

Common strategies:

- rolling update
- blue/green
- canary

### Rolling update

You progressively replace old instances with new ones.
Traffic keeps flowing during the rollout, without full downtime.

Strengths:

- simple to implement on most platforms
- little extra infrastructure needed

Limitation:

- rollback can be slower because old and new versions are mixed during transition

### Blue/Green

You keep two full environments:

- `blue` = current production version
- `green` = new candidate version

When `green` is validated, you switch all traffic at once.

Strengths:

- very fast rollback (switch traffic back to `blue`)
- reduced deployment risk during cutover

Limitation:

- higher infrastructure cost (double environment)

### Canary

You first route a small share of traffic (for example 5%) to the new version.
If metrics stay healthy, you increase gradually (20%, 50%, 100%).

Strengths:

- early detection of real-user regressions
- limited blast radius if something fails

Limitation:

- requires strong observability (logs, metrics, alerts) and fine-grained traffic routing

Start simple and add progressive rollout when needed.

## Environment management

Keep secrets and env config outside images.
Use platform secret stores or CI secret management.

## Common mistakes

- deploying directly from developer machines
- skipping test gates before deployment
- mutable image tags without traceability
- no rollback strategy

## Takeaway

1. Build once, deploy consistently
2. Automate tests and packaging in CI
3. Use safe rollout strategy in CD
4. Keep deployment observable and reversible
