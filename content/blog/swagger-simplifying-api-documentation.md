---
title: "Swagger: Simplifying API documentation"
description: "Swagger, is an essential tool for documenting, describing, and interacting with RESTful APIs. It provides a graphical user interface that simplifies the understanding of endpoints, parameters, responses, and schemas used"
date: 2025-01-06
tags: [api]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

Swagger, is an essential tool for documenting, describing, and interacting with RESTful APIs. It provides a graphical user interface that simplifies the understanding of endpoints, parameters, responses, and schemas used in an API. In this article, we will explore how to integrate Swagger into a **Spring Boot** project and the benefits it offers.

[start.spring.io](https://start.spring.io)

## Why use Swagger?

Here are the main reasons to use Swagger:

1. **Interactive documentation**: Developers can test endpoints directly through the interface.
2. **Standardization**: Swagger follows the [OpenAPI Specification](https://swagger.io/specification/), ensuring a clear and consistent description of APIs.
3. **Time-saving**: Automatically generates documentation from code.
4. **Better collaboration**: Development teams and technical stakeholders share a common overview.

## Prerequisites to get started

- A configured Spring Boot project.
- Maven or Gradle as a dependency management tool.

## Integrating Swagger into a Spring Boot project

### Step 1: Add Dependencies

Add the Swagger dependencies to the `pom.xml` file (for Maven):

```xml
<dependencies>
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-ui</artifactId>
        <version>1.7.0</version>
    </dependency>
</dependencies>
```

If you are using Gradle, add this dependency to the `build.gradle` file:

```groovy
implementation 'org.springdoc:springdoc-openapi-ui:1.7.0'
```

[Maven Repository: org.springdoc » springdoc-openapi-ui](https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-ui)

### Step 2: Configure Swagger

Springdoc OpenAPI does not require much additional configuration. However, you can customize certain aspects by creating a configuration class if needed:

```java
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Example Spring Boot API")
                        .version("1.0.0")
                        .description("API documentation for an example project."));
    }
}
```

### Step 3: Create example endpoints

Add a simple REST controller to illustrate how Swagger handles documentation:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Swagger!";
    }
}
```

### Step 4: Access the Swagger interface

Start your Spring Boot application and navigate to the following URL in your browser:

```
http://localhost:8080/swagger-ui.html
or
http://localhost:8080/swagger-ui/index.html
```

You will see a Swagger user interface listing your endpoints. You can test the `/api/hello` endpoint directly from this interface.

## Advanced customization

You can further customize Swagger by:

- Adding annotations like `@Operation` and `@ApiResponses` to your endpoints to provide detailed descriptions.
- Securing the Swagger interface with authentication (e.g., using Spring Security).
- Handling complex data schemas with annotations like `@Schema` and `@RequestBody`.

Example with advanced annotations:

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdvancedController {

    @Operation(summary = "Retrieve a welcome message", description = "This endpoint returns a welcome message for Swagger.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to the API with Swagger!";
    }
}
```

Swagger is a powerful tool for documenting and interacting with APIs. With Spring Boot, its integration is simple and fast, allowing developers to focus on creating robust and well-documented APIs. By following the steps above, you will be able to set up interactive documentation for your project.
