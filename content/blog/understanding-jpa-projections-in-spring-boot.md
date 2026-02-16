---
title: "Understanding JPA projections in Spring Boot"
description: "In Spring Boot applications that use JPA (Java Persistence API), projections provide a powerful mechanism for retrieving only specific parts of an entity’s data. Instead of fetching the entire entity with all its fields,"
date: 2025-01-29
tags: [spring-boot]
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

In Spring Boot applications that use JPA (Java Persistence API), projections provide a powerful mechanism for retrieving only specific parts of an entity’s data. Instead of fetching the entire entity with all its fields, projections allow you to select only the necessary data, which can improve performance and reduce overhead in large-scale applications.

This article will explain what JPA projections are, how to use them in a Spring Boot project, and provide a practical example to demonstrate how they can be implemented.

## What are JPA projections?

In the context of JPA, **projections** are interfaces or classes that allow us to map partial data from an entity to a custom DTO (Data Transfer Object). They provide an efficient way to fetch only the required fields from the database instead of loading an entire entity. Projections are typically used in scenarios where we need to fetch only a few properties of an entity for performance reasons, especially when the entity contains large or nested data that isn't always necessary.

There are three types of projections in JPA:

1. **Interface-based projections** – Define a projection using a Java interface.
2. **Class-based projections** – Use a class to define the projection.
3. **DTO-based projections** – Map results directly to a DTO, often with constructors or setters.

For this tutorial, we will focus on interface-based projections, which are one of the most commonly used methods.

[Understanding DTOs in Java Spring Boot](https://briacd.com/dto-java-spring-boot)

## How to implement JPA projections in Spring Boot?

We will break down the implementation into the following steps:

1. Set up the Spring Boot application.
2. Define the entity and repository.
3. Create the projection interface.
4. Use the projection in the service layer.

### Set up the Spring Boot application

Make sure you have a Spring Boot application set up with the necessary dependencies. You can start with Spring Initializr ([https://start.spring.io/](https://start.spring.io/)) to generate the base project.

Include the following dependencies in your `pom.xml` (Maven) or `build.gradle` (Gradle) file:

- Spring Web
- Spring Data JPA
- H2 Database (or any database of your choice)

For Maven:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

[Introduction to Maven in a Java Spring Boot project](https://briacd.com/maven-java-spring-boot)

### Define the entity and repository

We will create a simple entity called `Employee`.

```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Employee {

    @Id
    private Long id;
    private String name;
    private String position;
    private Double salary;

    // Constructors, getters, and setters
}
```

Now, define a repository interface for `Employee` that extends `JpaRepository`.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e")
    List<EmployeeProjection> findAllEmployeeProjections();
}
```

### Create the projection interface

Now, let's create a projection interface to fetch only the fields that are necessary.

```java
public interface EmployeeProjection {

    String getName();      // Get the name of the employee
    String getPosition();  // Get the position of the employee
    Double getSalary();    // Get the salary of the employee
}
```

This interface defines the structure of the projection, specifying which fields of the `Employee` entity should be retrieved. We will use this projection in our repository query.

### Use the projection in the service layer

Now, let's implement a service layer to retrieve the data using the projection. In the service, you can call a method in the repository that returns the projection.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeProjection> getEmployeeProjections() {
        return employeeRepository.findAllEmployeeProjections();
    }
}
```

Note: The `findAllProjectedBy()` method is a custom query method provided by Spring Data JPA. It returns the data mapped to the `EmployeeProjection` interface.

### Create a controller to expose the data via an endpoint

Finally, let's create a simple controller to expose the data via an HTTP endpoint.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/employees")
    public List<EmployeeProjection> getEmployeeProjections() {
        return employeeService.getEmployeeProjections();
    }
}
```

[Best practices for RESTful API design](https://briacd.com/best-practices-for-restful-api-design)

### Test the implementation

Once everything is set up, you can test the implementation by running the Spring Boot application and navigating to the `/employees/projections` endpoint. You should see the employee data returned in the form of the projection (only name, position, and salary) without loading the full entity.

Example response:

```json
[
    {
        "name": "John Doe",
        "position": "Software Engineer",
        "salary": 75000.00
    },
    {
        "name": "Jane Smith",
        "position": "Product Manager",
        "salary": 85000.00
    }
]
```

## And with **DTO-based projections ?**

### Create a DTO class

Now, we'll create a DTO class to hold only the data we want to transfer. The `EmployeeDTO` will hold only `name`, `position`, and `salary` properties.

```java
public class EmployeeDTO {

    private String name;
    private String position;
    private Double salary;

    // Constructor to initialize DTO
    public EmployeeDTO(String name, String position, Double salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    // Getters and setters..
}
```

### Create a repository with a custom query

To fetch the data directly into the DTO, we'll define a custom query in the repository.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query to fetch Employee data and map it to EmployeeDTO
    @Query("SELECT new com.example.EmployeeDTO(e.name, e.position, e.salary) FROM Employee e")
    List<EmployeeDTO> findEmployeeDTOs();
}
```

In the query, we are using the `new` keyword to instantiate the `EmployeeDTO` class. The query fetches `name`, `position`, and `salary` from the `Employee` entity and maps these fields into the corresponding DTO fields.

In this article, we’ve explored how to use JPA projections in a Spring Boot application. Projections allow us to fetch only the required fields of an entity, making queries more efficient and improving performance in cases where only a subset of the data is necessary.

This approach is particularly useful for optimizing queries in large-scale applications where entities might contain a lot of data, but we only need a small subset for display or processing purposes
