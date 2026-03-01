---
title: Singularities AI
description: Local-first Ollama Web UI for secure multi-model conversations, role-based access, and enterprise-ready customization.
tags: [ai, llm, ollama, nuxt, spring-boot, postgres, self-hosted]
stack: [nuxt, spring-boot, postgresql]
year: 2025
active: false
cover: /projects/singularities.webp
links:
  repo: https://github.com/Singularities-AI/singularities-ai
---

## Project Context

Singularities AI was built to solve a concrete problem: many teams want LLM features, but cannot accept sending internal data to external AI providers.

The project focuses on a local-first model runtime, clear access control, and a user experience simple enough for non-specialists.

Singularities AI is a self-hosted web platform that enables teams to work with text-based AI models in a secure, customizable, and production-oriented way.

## Product Focus

Singularities AI is designed as an operational AI workspace, not just a demo chat interface.

### Available Today

- **Easy configuration**: quick setup with a simple configuration model and flexible parameters
- **Chat with AI**: natural conversations with Ollama-powered models
- **Agents**: task and workflow automation with role-based agent behaviors
- **Custom context**: global or conversation-level instructions to adapt model behavior
- **Many-model conversations**: switch and compare model outputs in the same workflow
- **Restrict domains**: limit access and usage to trusted environments
- **Multilingual support**: built for international teams
- **Responsive design**: smooth usage on desktop, tablet, and mobile

### Coming Soon

- **Local RAG**: retrieval and generation from local data sources only
- **Granular permissions**: fine-grained access control per feature and role
- **Web search**: controlled real-time web augmentation in AI workflows

## Architecture

The platform is split into four layers:

1. **Frontend workspace**: a Nuxt application for chat, account, and admin interfaces
2. **Security/API layer**: a Spring Boot backend handling authentication, permissions, and orchestration
3. **Inference layer**: Ollama for local model execution
4. **Data layer**: PostgreSQL for persistent application data

This architecture keeps responsibilities isolated and makes production hardening easier.

## Security and Operations

Singularities AI is built around privacy and deployment ownership:

- Local-first LLM execution to reduce data exposure
- Centralized auth and role management in the API layer
- Configurable environment for private infrastructure
- Source-available codebase for auditing and extension
- Enterprise-oriented approach focused on data security and sovereignty

## Current Status

The project is in active evolution with a clear priority on stability, enterprise-grade controls, and incremental feature delivery.

Need an enterprise plan or custom features? Contact the team.

## Next Milestones

- Deliver Local RAG for private knowledge workflows
- Ship granular permission policies for enterprise teams
- Add controlled web search capabilities
- Continue hardening deployment and observability

## External Links

- Repository: [singularities-ai](https://github.com/Singularities-AI/singularities-ai)
