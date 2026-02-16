---
title: "Setting up PostgreSQL in a Spring Boot project with Spring Data JPA"
description: "PostgreSQL is a powerful, open-source relational database that pairs well with Spring Boot applications. This tutorial guides you through configuring PostgreSQL in a Spring Boot project using Spring Data JPA for seamless"
date: 2025-01-20
tags: [spring-boot, postgresql]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

PostgreSQL is a powerful, open-source relational database that pairs well with Spring Boot applications. This tutorial guides you through configuring PostgreSQL in a Spring Boot project using Spring Data JPA for seamless database interaction.

[PostgreSQL](https://www.postgresql.org/)

## Prerequisites

Before starting, ensure you have the following:

- **PostgreSQL** installed and running on your system.
- **Java Development Kit (JDK)** 17 or later.
- **Maven** installed for managing dependencies.
- Basic knowledge of Spring Boot and Java.

## Create a Spring Boot project

You can generate a Spring Boot project using [Spring Initializr](https://start.spring.io/). Select the following dependencies:

- Spring Web
- Spring Data JPA
- PostgreSQL Driver

Download the generated project and import it into your preferred IDE (e.g., IntelliJ IDEA or Eclipse).

[Spring Data JPA](https://spring.io/projects/spring-data-jpa)

## Set up the PostgreSQL database

**Create a new database** in PostgreSQL. For example:

```sql
CREATE DATABASE springboot_postgres_demo;
```

**Create a user** and assign privileges:

```sql
CREATE USER demo_user WITH PASSWORD 'demo_password';
GRANT ALL PRIVILEGES ON DATABASE springboot_postgres_demo TO demo_user;
```

[pgAdmin - PostgreSQL Tools](https://www.pgadmin.org/)

## Configure `application.properties`

Open `src/main/resources/application.properties` (or `application.yml` if you prefer YAML) and add the PostgreSQL configuration:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/springboot_postgres_demo
spring.datasource.username=demo_user
spring.datasource.password=demo_password

# JPA configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

- **`spring.datasource.url`**: Specifies the database connection URL.
- **`spring.jpa.hibernate.ddl-auto`**: Automatically manages schema updates during development. Use `none` or `validate` in production.

## Define a JPA entity

Create a new package, `com.example.demo.entity`, and define an entity class:

```java
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
}
```

Use Lombok to create @Getter and @Setter

[Guide to Lombok in Spring Boot with Maven](https://briacd.com/lombok-spring-boot-maven)

## Create a repository

In the `com.example.demo.repository` package, define a JPA repository interface:

```java
package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

## Implement a service layer

Create a service to handle business logic in the `com.example.demo.service` package:

```java
package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
```

## Create a controller

Set up a REST controller to expose APIs in the `com.example.demo.controller` package:

```java
package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }
}
```

## Run and test

1. Start your Spring Boot application by running `DemoApplication.java`.
2. Use tools like [Postman](https://www.postman.com/) or `curl` to test the APIs:

**GET** all products:

```
curl -X GET http://localhost:8080/api/products
```

**POST** a new product:

```
curl -X POST -H "Content-Type: application/json" -d '{"name":"Laptop","price":1200.00}' http://localhost:8080/api/products
```

## Verify in PostgreSQL

Log into PostgreSQL and verify the `Product` table and its data:

```sql
SELECT * FROM product;
```

You’ve successfully set up a PostgreSQL database in a Spring Boot project using Spring Data JPA. This foundational setup allows for scalable and efficient data management. To enhance the project, consider adding validation, pagination, or advanced querying with custom JPQL.

To make the evolution and versioning of your database more robust, you can read my article on the Flyway tool.

[Flyway for database migrations in Spring Boot applications](https://briacd.com/database-migration-flyway-spring-boot)
