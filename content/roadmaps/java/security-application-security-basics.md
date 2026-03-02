---
title: Security - Application Security Basics
description: "Learn framework-agnostic API security fundamentals: authentication, authorization, token/session strategies, and endpoint hardening."
date: 2025-01-15
tags: [java, security, api, auth]
draft: false
readingTime: 14 min
---

## Why this step matters

Security is architecture, not a late patch.
Weak security boundaries create expensive incidents in production.

## AuthN vs AuthZ

- Authentication (AuthN): who is the caller?
- Authorization (AuthZ): what can this caller do?

Both are required for secure APIs.

## Token vs session approach

Session-based:

- state kept server-side
- simple for web apps
- needs scalable session storage

Token-based:

- stateless requests with signed token
- common for APIs and distributed services
- requires strict validation and expiration handling

## Endpoint hardening checklist

- deny-by-default access policy
- explicit public routes only
- input validation and payload size limits
- rate limiting for sensitive endpoints
- strict CORS policy where relevant

## Password and secret handling

- never store plain credentials
- use strong one-way hashing for passwords
- rotate and externalize secrets
- avoid logging sensitive fields

## Error response strategy

Return generic auth errors to avoid leaking internal details.
Example: use one clear `401/403` contract without exposing internals.

## Practical access model

Use role/permission checks close to business operations:

- role for coarse access (admin, member)
- permission for fine-grained actions (read:invoice, write:invoice)

## Common mistakes

- mixing auth logic with business logic everywhere
- endpoints accidentally left public
- missing token/session expiration policy
- no audit trail for security-sensitive actions

## Takeaway

1. Separate clearly identity (AuthN) and permissions (AuthZ)
2. Choose token or session based on architecture constraints
3. Harden endpoints with deny-by-default mindset
4. Treat secrets, credentials, and auth logs as critical assets
