---
title: Backend - API Essentials
description: "Learn framework-agnostic backend API fundamentals: layered architecture, configuration, validation, and consistent error contracts."
date: 2025-01-14
tags: [java, backend, api, architecture]
draft: false
readingTime: 14 min
---

## Why this step matters

A backend API should stay maintainable as features grow.
Good architecture and contracts matter more than framework choice.

## Layered architecture (framework-agnostic)

A practical baseline:

- Transport layer: HTTP input/output
- Application/service layer: business rules
- Data access layer: persistence

Keep each layer focused on one responsibility.

## DTOs and contracts

Expose DTOs at API boundaries.
Do not expose persistence models directly.

```java
public record CreateUserRequest(String username, String email) {}
public record UserResponse(Long id, String username, String email) {}
```

This prevents tight coupling between API and storage models.

## Validation strategy

Validate early at the boundary:

- required fields
- format constraints
- business preconditions

```java
public record CreateUserRequest(String username, String email) {
    public void validate() {
        if (username == null || username.isBlank()) throw new IllegalArgumentException("username required");
        if (email == null || !email.contains("@")) throw new IllegalArgumentException("invalid email");
    }
}
```

## Error handling contract

Use a consistent error shape across endpoints.

```java
public record ErrorResponse(String code, String message, String requestId) {}
```

Benefits:

- easier client handling
- simpler monitoring and alerting
- predictable API behavior

## Configuration and environments

Externalize config instead of hardcoding values:

- port
- database URL
- API keys/secrets
- feature flags

Typical environments:

- local
- staging
- production

## Logging and traceability

Include request IDs and stable context fields in logs.
This makes production debugging much faster.

## Common mistakes

- business logic in transport layer
- duplicated validation in many places
- inconsistent error response formats
- mixing environment config in source code

## Takeaway

1. Build around clear layer boundaries
2. Keep API contracts explicit with DTOs
3. Validate at boundaries and standardize errors
4. Keep configuration external and environment-aware
