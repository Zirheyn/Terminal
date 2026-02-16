---
title: "Guide to Lombok in Spring Boot with Maven"
description: "When working with Java, you often encounter boilerplate code such as getters, setters, constructors, and equals/hashCode methods. Lombok is a powerful Java library that helps reduce this boilerplate code, making your code"
date: 2025-01-10
tags: [spring-boot]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

When working with Java, you often encounter boilerplate code such as getters, setters, constructors, and equals/hashCode methods. Lombok is a powerful Java library that helps reduce this boilerplate code, making your code cleaner and more maintainable. In this article, we will explore how to use Lombok in a Spring Boot application configured with Maven.

## What is Lombok?

Lombok is a Java library that uses annotations to generate boilerplate code during the compile-time process. By adding simple annotations, Lombok can generate code for:

- Getters and setters
- Constructors
- equals, hashCode, and toString methods
- Builder patterns
- Logging frameworks

Lombok improves code readability and reduces manual coding effort, leading to fewer bugs and cleaner code.

## Setting up Lombok in a Spring Boot

### Step 1: Add Lombok dependency

Add the Lombok dependency to your `pom.xml` file:

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.30</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

The `provided` scope ensures Lombok is only used at compile-time and not included in the runtime dependencies.

[Maven Repository: org.projectlombok » lombok](https://mvnrepository.com/artifact/org.projectlombok/lombok)

### Step 2: Enable annotation processing

Lombok requires annotation processing to generate code. If you're using an IDE like IntelliJ IDEA or Eclipse, make sure annotation processing is enabled:

- **IntelliJ IDEA**: Go to `File > Settings > Build, Execution, Deployment > Compiler > Annotation Processors` and check `Enable annotation processing`.
- **Eclipse**: Ensure the Lombok JAR file is integrated with your IDE. You can download the Lombok JAR and run it as a standalone installer to configure Eclipse.

### Step 3: Verify the setup

After adding the dependency and enabling annotation processing, rebuild your project. Lombok should now work seamlessly.

## Using Lombok annotations

Let’s explore some commonly used Lombok annotations with examples.

### @Getter and @Setter

`@Getter` and `@Setter` annotations automatically generate getter and setter methods for class fields.

```java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;
    private String name;
}
```

Without Lombok, you would need to manually write these methods. With Lombok, they are automatically generated during compilation.

### @NoArgsConstructor and @AllArgsConstructor

`@NoArgsConstructor` and `@AllArgsConstructor` generate constructors with no arguments and all arguments, respectively.

```java
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
}
```

### @Builder

`@Builder` implements the builder pattern, allowing you to create objects in a more readable and flexible way.

```java
import lombok.Builder;

@Builder
public class User {
    private Long id;
    private String name;
}

// Usage:
User user = User.builder()
    .id(1L)
    .name("John Doe")
    .build();
```

### @Data

`@Data` combines several annotations: `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, and `@RequiredArgsConstructor`.

```java
import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
}
```

This annotation is a convenient shortcut for data classes.

### @Slf4j

`@Slf4j` provides a logger instance using the Simple Logging Facade for Java (SLF4J).

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserService {
    public void performTask() {
        log.info("Task performed successfully");
    }
}
```

[SLF4J](https://www.slf4j.org/)

## Integrating Lombok with a Spring Boot

Here’s how you can use Lombok in a real Spring Boot application.

### Entity class

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
}
```

### Repository interface

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
```

### Service class

```java
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```

### Controller class

```java
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
```

Lombok simplifies Java development by reducing boilerplate code, improving readability, and speeding up development. By using Lombok in your Spring Boot projects, you can focus on business logic rather than mundane code generation.
