---
title: Project Setup
description: Learn how to create a Spring Boot project with Spring Initializr, understand folder conventions, and set up Maven or Gradle cleanly.
date: 2026-03-13
tags: [spring-boot, setup, maven, gradle]
draft: false
readingTime: 12 min
---

## Why this topic matters

A lot of Spring Boot problems start before you even write business code.

If the project is created with unclear defaults, inconsistent folder structure, or a build setup the team does not really understand, development gets slower very quickly. Good setup is not glamorous, but it removes friction from everything that comes after.

This step covers three things every beginner should understand early:

- how to create a project with Spring Initializr
- how a standard Spring Boot folder structure is organized
- how to choose and run Maven or Gradle correctly

## Start with Spring Initializr

The easiest and safest way to create a Spring Boot project is [Spring Initializr](https://start.spring.io/).

It generates a project skeleton with the correct structure and build files for common Spring Boot applications.

### Typical fields you need to choose

When you create a new project, you usually decide:

- **Project**: Maven or Gradle
- **Language**: Java
- **Spring Boot version**: choose a stable version, not a milestone or snapshot unless you have a specific reason
- **Group**: your organization or package root, for example `com.briac`
- **Artifact**: your project technical name, for example `demo-api`
- **Packaging**: usually `jar`
- **Java**: align with the JDK version you actually use
- **Dependencies**: start small, add only what you need

### A simple example

- Project: Maven
- Language: Java
- Group: `com.briac`
- Artifact: `demo-api`
- Packaging: `jar`
- Java: `21`
- Dependencies: `Spring Web`

That is enough to create a first API project without unnecessary complexity.

## What Initializr gives you

A generated Spring Boot project usually includes:

- a main application class
- a build file (`pom.xml` or `build.gradle(.kts)`)
- a wrapper (`mvnw` or `gradlew`)
- a default test class
- a standard source directory structure

That matters because you start from conventions used across most Spring Boot codebases.

## Standard folder conventions

A clean Spring Boot project usually looks like this:

```text
demo-api
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── briac
│   │   │           └── demoapi
│   │   │               └── DemoApiApplication.java
│   │   └── resources
│   │       ├── application.yml
│   │       └── static
│   └── test
│       └── java
│           └── com
│               └── briac
│                   └── demoapi
│                       └── DemoApiApplicationTests.java
├── pom.xml
└── mvnw
```

### What goes where

- `src/main/java`: production code
- `src/main/resources`: configuration, templates, static files, SQL scripts, etc.
- `src/test/java`: automated tests
- `application.yml`: application configuration

This structure is simple, but it is important because many Spring conventions assume it.

## Package naming matters

Keep your main application class in a root package above the rest of the codebase.

Example:

```text
com.briac.demoapi
```

Then place controllers, services, repositories, and configuration classes under it:

```text
com.briac.demoapi.web
com.briac.demoapi.service
com.briac.demoapi.repository
com.briac.demoapi.config
```

This matters because component scanning starts from the package of the main application class.

If your code lives outside that package tree, Spring may not detect your beans.

## Maven or Gradle?

Spring Boot officially recommends choosing a build system with proper dependency management, and in practice that means **Maven or Gradle**.

Both are production-ready. The right question is not "which one is universally better?" The real question is "which one will your team understand and maintain consistently?"

### Choose Maven if you want

- a convention-first approach
- a predictable project structure
- XML configuration that stays explicit
- easier onboarding for many Java teams

### Choose Gradle if you want

- a more programmable build
- Kotlin DSL or Groovy DSL
- more flexibility for advanced build logic
- strong wrapper-based workflows

If you are learning Spring Boot and do not have a team constraint yet, Maven is often the simpler first choice. If your team already uses Gradle, follow the team standard.

## A minimal Maven setup

Here is a typical Spring Boot Maven build file. The Boot version should match the one selected in Initializr:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>your-selected-spring-boot-version</version>
        <relativePath/>
    </parent>

    <groupId>com.briac</groupId>
    <artifactId>demo-api</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo-api</name>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### Why this works well

- the Spring Boot parent manages many versions for you
- starters reduce dependency boilerplate
- the Maven plugin helps run and package the app
- `mvnw` keeps the build entry point consistent across machines

## A minimal Gradle Kotlin DSL setup

Here is a typical Spring Boot `build.gradle.kts`. The plugin versions should match what Initializr generates for your selected Boot release:

```kotlin
plugins {
    id("org.springframework.boot") version "your-selected-spring-boot-version"
    id("io.spring.dependency-management") version "version-managed-by-initializr"
    java
}

group = "com.briac"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
```

### Why this works well

- the Spring Boot plugin integrates the Boot build lifecycle
- dependency management stays aligned with Spring Boot
- the Java toolchain makes the JDK target explicit
- the wrapper (`gradlew`) standardizes the Gradle version per project

## Use the wrapper, not the global tool

This is an important habit.

### Maven

Prefer:

```bash
./mvnw spring-boot:run
./mvnw test
./mvnw package
```

Instead of:

```bash
mvn spring-boot:run
```

### Gradle

Prefer:

```bash
./gradlew bootRun
./gradlew test
./gradlew build
```

Instead of:

```bash
gradle bootRun
```

The wrapper ensures every developer and every CI environment uses the expected tool version.

## First commands you should know

### Maven

```bash
./mvnw spring-boot:run
./mvnw test
./mvnw clean package
```

### Gradle

```bash
./gradlew bootRun
./gradlew test
./gradlew clean build
```

These commands are enough to cover the basic local workflow:

- run the app
- run tests
- build a packaged artifact

## Common beginner mistakes

### Adding too many dependencies at project creation time

Start with only what you need. For example, `Spring Web` is enough for a first REST API.

### Mixing JDK versions

Do not develop with one Java version and expect another one in CI or production without verifying compatibility.

### Ignoring the wrapper

If one developer uses a different Maven or Gradle version than the rest of the team, build behavior may drift.

### Placing code in the wrong package

If your main application class is in `com.briac.demoapi`, keep your application code under that same package root.

## Practical recommendation

For a first serious Spring Boot project:

1. generate the project with Spring Initializr
2. choose `jar` packaging
3. choose Java 21 if your environment supports it
4. start with `Spring Web`
5. use the wrapper from day one
6. add dependencies only when a real need appears

This gives you a clean base and keeps the project understandable.

## Recommended official resources

- [Spring Initializr](https://start.spring.io/)
- [Spring Boot Build Systems](https://docs.spring.io/spring-boot/reference/using/build-systems.html)
- [Spring Boot Getting Started Guide](https://spring.io/guides/gs/spring-boot)
- [Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [Maven Users Centre](https://maven.apache.org/users/)
- [Gradle Installation](https://docs.gradle.org/current/userguide/installation.html)
- [Gradle Wrapper Basics](https://docs.gradle.org/userguide/gradle_wrapper_basics.html)

## Sources

This article is based on official documentation:

- Spring Boot build systems reference: [docs.spring.io/spring-boot/reference/using/build-systems.html](https://docs.spring.io/spring-boot/reference/using/build-systems.html)
- Spring Boot getting started guide: [spring.io/guides/gs/spring-boot](https://spring.io/guides/gs/spring-boot)
- Spring Initializr: [start.spring.io](https://start.spring.io/)
- Maven getting started guide: [maven.apache.org/guides/getting-started/maven-in-five-minutes.html](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- Maven users centre: [maven.apache.org/users](https://maven.apache.org/users/)
- Gradle installation guide: [docs.gradle.org/current/userguide/installation.html](https://docs.gradle.org/current/userguide/installation.html)
- Gradle wrapper basics: [docs.gradle.org/userguide/gradle_wrapper_basics.html](https://docs.gradle.org/userguide/gradle_wrapper_basics.html)

## Takeaway

Project setup is not just an administrative step.

It defines:

- how the application is built
- how other developers run it
- how dependencies are managed
- how easy the project will be to maintain later

If you start with a clean structure, a clear build tool, and a disciplined wrapper workflow, the rest of your Spring Boot roadmap becomes much easier.
