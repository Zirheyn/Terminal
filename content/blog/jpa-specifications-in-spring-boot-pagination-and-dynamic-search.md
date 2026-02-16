---
title: "JPA specifications in Spring Boot: pagination and dynamic search"
description: "Spring Boot simplifies application development by providing powerful integrations with Java frameworks, such as JPA (Java Persistence API). Among JPA’s many capabilities, the Specification API stands out as a robust tool"
date: 2025-02-22
tags: [spring-boot]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

Spring Boot simplifies application development by providing powerful integrations with Java frameworks, such as JPA (Java Persistence API). Among JPA’s many capabilities, the Specification API stands out as a robust tool for creating dynamic and reusable queries. This article explores how to implement JPA Specifications in Spring Boot to achieve pagination and dynamic "like" search functionality across all fields of a table.

## Prerequisites

Before diving into the implementation, ensure you have the following:

1. **Spring Boot project**: Use Spring Initializer to create a project with dependencies for Spring Data JPA and your preferred database (e.g., MySQL or PostgreSQL).

[start.spring.io](https://start.spring.io/)

1. **Database setup**: A configured database connection in your `application.properties` or `application.yml` file.
2. **Entity class**: A JPA entity to work with.

## Define a JPA entity

Here’s an example entity representing a `Product`:

```java
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;
}
```

## Create a JPA specification for dynamic queries

A JPA Specification allows you to create dynamic queries based on user input. Here’s how you can define a generic search for "like" queries on all fields:

```java
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

public class ProductSpecifications {

    public static Specification<Product> searchAllFields(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            String likePattern = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likePattern)
            );
        };
    }
}
```

This implementation searches for the keyword in the `name` and `description` fields of the `Product` entity. You can extend it to include additional fields if needed.

## Add pagination support in the repository

Your repository should extend `JpaSpecificationExecutor` to leverage specifications:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
}
```

## Implement the service layer

The service layer will use the repository to fetch paginated and filtered results:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> searchProducts(String keyword, int page, int size) {
        Specification<Product> spec = ProductSpecifications.searchAllFields(keyword);
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(spec, pageable);
    }
}
```

## Expose the endpoint in the controller

Finally, create a REST controller to expose the search and pagination functionality:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Page<Product> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return productService.searchProducts(keyword, page, size);
    }
}
```

## Testing the implementation

You can test the endpoint using tools like Postman or cURL.

```bash
curl -X GET "http://localhost:8080/api/products?keyword=phone&page=0&size=5"
```

The endpoint will return a paginated response containing products that match the keyword in their `name` or `description` fields.

JPA Specifications in Spring Boot provide a flexible and efficient way to implement dynamic queries and pagination. With the steps outlined above, you can extend this pattern to suit more complex requirements, such as combining multiple filters, handling different data types, or integrating advanced search capabilities.

[How to implement caching in Spring Boot with caffeine](https://briacd.com/spring-boot-cache-with-caffeine)
