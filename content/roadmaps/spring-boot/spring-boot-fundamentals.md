---
title: Spring Boot Fundamentals
description: Learn what Spring Boot solves, how auto-configuration and starters work, and how to build a minimal application with clean fundamentals.
date: 2026-03-12
tags: [spring-boot, java, backend, fundamentals]
draft: false
readingTime: 11 min
---

## Why this topic matters

Spring Boot is often the entry point into modern Java backend development.

If you understand the fundamentals early, the rest of the ecosystem becomes much easier to navigate. You stop copying annotations mechanically and start understanding why the application starts, how dependencies are wired, and where configuration comes from.

## What Spring Boot actually is

Spring Boot is **not** a different framework from Spring. It builds on top of the Spring Framework and focuses on three practical goals:

- start projects faster
- reduce manual infrastructure configuration
- provide production-friendly defaults

In plain terms, Spring Boot helps you spend less time wiring technical plumbing and more time writing business features.

## Spring vs Spring Boot

A simple mental model:

- **Spring Framework** gives you the core container, dependency injection, web stack, data integration, security, and many modules
- **Spring Boot** gives you conventions, starters, auto-configuration, and runtime defaults so you can use Spring much faster

So Spring Boot does not replace Spring. It gives you a more productive way to assemble a Spring application.

## The 3 ideas you must understand first

### 1. `@SpringBootApplication`

Most Boot applications start with one main class:

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

This annotation is important because it combines three ideas:

- configuration
- component scanning
- auto-configuration

That means Boot can discover your components, register beans, and activate useful defaults based on the dependencies on the classpath.

### 2. Starter dependencies

Spring Boot uses **starters** to simplify dependency management.

Instead of manually adding many low-level libraries, you usually add one starter that represents a common use case.

Example with Maven:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

This starter pulls in what is typically needed for a web application, including Spring MVC and an embedded server.

The point is not magic. The point is curated defaults.

### 3. Auto-configuration

Auto-configuration means Spring Boot inspects what is on your classpath and configures common infrastructure for you.

Examples:

- if you add the web starter, Boot prepares a web application setup
- if you add a supported database dependency, Boot can configure a datasource
- if you add Actuator, Boot can expose operational endpoints

Important detail: auto-configuration is **non-invasive**. If you define your own bean or configuration explicitly, Boot usually backs off instead of fighting your code.

## A minimal Spring Boot application

Here is a small example that shows the basic flow.

### A controller

```java
package com.example.demo.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot";
    }
}
```

### A service bean

```java
package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String message() {
        return "Service layer is active";
    }
}
```

### Constructor injection

```java
package com.example.demo.web;

import com.example.demo.service.GreetingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private final GreetingService greetingService;

    public GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/greeting")
    public String greeting() {
        return greetingService.message();
    }
}
```

This is the core Spring model:

- your classes declare dependencies
- Spring creates the objects
- Spring injects them where needed

## Why constructor injection is the right default

Constructor injection should be your default approach because it makes dependencies explicit.

It improves:

- readability
- testability
- immutability of required dependencies

If a service cannot work without another component, the constructor makes that contract obvious.

## Configuration basics

Spring Boot reads configuration from files such as `application.properties` or `application.yml`, environment variables, and command-line arguments.

A simple YAML example:

```yaml
server:
  port: 8081

spring:
  application:
    name: demo-app
```

This file usually lives in:

```text
src/main/resources/application.yml
```

This is one of the biggest quality-of-life features in Boot: configuration is externalized, so the same codebase can run in local, staging, and production with different values.

## Typical project structure

A clean beginner-friendly structure looks like this:

```text
src/main/java/com/example/demo
├── DemoApplication.java
├── web
│   └── GreetingController.java
├── service
│   └── GreetingService.java
└── config
    └── AppConfig.java
```

Keep your main application class in a root package above the others. This matters because component scanning starts from that package.

## How you run a Spring Boot app

During development:

```bash
./mvnw spring-boot:run
```

To package the application:

```bash
./mvnw clean package
```

Then run the generated jar:

```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

This works because Spring Boot can build an executable jar with an embedded server.

## Common beginner mistakes

### Putting classes outside the scanned package

If your controller or service is outside the package tree of the main application class, Spring may not detect it.

### Adding too many dependencies too early

Start with the minimum:

- Spring Web for an API
- Validation if needed
- Data JPA only when you actually need persistence

Adding too much too early makes debugging harder.

### Confusing Spring with Spring Boot

Boot gives you speed and defaults, but Spring concepts still matter:

- beans
- scopes
- dependency injection
- configuration
- lifecycle

If those concepts stay vague, large applications become difficult to reason about.

## A practical learning strategy

A good progression is:

1. create a project with Spring Initializr
2. build one controller and one service
3. externalize one config value in `application.yml`
4. run the app locally
5. package it as a jar
6. only then move to validation, persistence, or security

This keeps the mental model simple and avoids learning too many layers at once.

## Recommended official resources

- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/reference/)
- [Using the `@SpringBootApplication` Annotation](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html)
- [Auto-configuration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)
- [Spring Beans and Dependency Injection](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html)
- [Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- [Spring Initializr](https://start.spring.io/)
- [Getting Started: Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot)

## Sources

This article is based on official Spring documentation and guides:

- Spring Boot Reference: [docs.spring.io/spring-boot/reference](https://docs.spring.io/spring-boot/reference/)
- Spring Boot auto-configuration reference: [docs.spring.io/spring-boot/reference/using/auto-configuration.html](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)
- `@SpringBootApplication` reference: [docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html)
- Spring Boot DI reference: [docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html)
- Spring Boot external config reference: [docs.spring.io/spring-boot/reference/features/external-config.html](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- Spring guide: [spring.io/guides/gs/spring-boot](https://spring.io/guides/gs/spring-boot)

## Takeaway

Spring Boot fundamentals are about building the right mental model:

- Boot accelerates setup
- Spring still provides the core programming model
- starters and auto-configuration reduce boilerplate
- explicit code and clean structure still matter

Once these basics are clear, topics like REST APIs, persistence, testing, and security become much easier to learn well.
