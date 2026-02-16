---
title: "Best practices for RESTful API design"
description: "Learn best practices for designing RESTful APIs with Java Spring Boot, including correct use of HTTP methods, status codes, HATEOAS, pagination, and error handling."
date: 2025-01-27
tags: [api, spring-boot]
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

Designing a RESTful API is critical for building scalable, maintainable, and efficient web applications. REST (Representational State Transfer) is an architectural style that adheres to specific principles to create web services. Adhering to RESTful best practices ensures that the API is intuitive, easy to maintain, and scalable. This article will outline key RESTful principles and provide examples in Java Spring Boot.

## **Use HTTP methods correctly**

One of the foundational principles of REST is utilizing [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (verbs) appropriately for CRUD (Create, Read, Update, Delete) operations.

- **GET** – Retrieve resources without modifying them.
- **POST** – Create a new resource.
- **PUT** – Update or replace an existing resource.
- **PATCH** – Partially update a resource.
- **DELETE** – Delete a resource.

### Example in Spring Boot:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

## **Use resource URIs properly**

RESTful APIs emphasize the use of clear, descriptive, and consistent URIs that represent resources. The resource should be nouns, pluralized, and follow a hierarchy when necessary. Avoid verbs in the URI, as HTTP methods already represent actions.

### Correct URI example:

- `/api/users` (representing a collection of users)
- `/api/users/{id}` (representing a single user resource)

```java
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
```

## **Use HTTP status codes properly**

HTTP status codes provide important feedback to the client about the outcome of an API request. Adhering to the correct codes improves the API's predictability and reliability.

- **200 OK** – Request was successful and the resource was returned (GET, PUT, PATCH).
- **201 Created** – A new resource was created successfully (POST).
- **204 No Content** – The request was successful, but there is no content to return (DELETE).
- **400 Bad Request** – The request was invalid or malformed.
- **404 Not Found** – The requested resource could not be found.
- **500 Internal Server Error** – There was an unexpected error on the server.

```java
@PostMapping
public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    if (product == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    Product createdProduct = productService.createProduct(product);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
}
```

## **Stateless communication**

In REST, each request should contain all the information necessary for the server to understand and process it. The server should not store any client context between requests. This statelessness ensures scalability and reduces the risk of errors.

### Example of statelessness in Spring Boot :

Each HTTP request should have the necessary headers, parameters, or authentication tokens. For example, you could use JWT tokens for authentication.

```java
public String generateJwtToken(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
}
```

## **Support pagination and filtering**

REST APIs should be able to handle large datasets without overwhelming the client or server. By providing pagination and filtering capabilities, you ensure that the API can scale to handle large collections of resources.

```java
@GetMapping
public List<Product> getProducts(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(required = false) String category) {
    Pageable pageable = PageRequest.of(page, size);
    return productService.getProducts(pageable, category);
}
```

## **Provide meaningful error messages**

It’s crucial that your API returns informative error messages when something goes wrong. The error message should provide enough detail for the client to understand what went wrong and how to correct it.

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ApiError> handleResourceNotFound(ResourceNotFoundException ex) {
    ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, ex.getMessage());
    return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
}

@Getter
@Setter
public class ApiError {
    private HttpStatus status;
    private String message;
}
```

## **Version your API**

APIs evolve over time, and versioning helps ensure backward compatibility. You can use URI versioning (e.g., `/api/v1/products`)

```java
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
```

## **Use HATEOAS (hypermedia as the engine of application state)**

While optional, HATEOAS is a RESTful principle that can improve the flexibility of your API. It allows the client to navigate the API dynamically by providing links to related resources.

In other words, instead of hardcoding URLs and understanding how to make subsequent requests, the client can dynamically discover what actions it can perform next by following links provided by the server in the API response.

This means that when a client makes a request for a resource, the server responds with not only the resource data but also links to other related resources or actions that the client can perform.

The primary benefit of HATEOAS is that it decouples the client and server to a degree. Clients don’t need to know the details about resource URIs beforehand, because the server provides that information via links.

### **Exemple : Get a single product**

```bash
curl -X GET http://localhost:8080/api/products/1
```

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/products/1"
    },
    "all-products": {
      "href": "http://localhost:8080/api/products"
    }
  }
}
```

In this response, the product includes a `self` link (pointing to the product resource itself) and an `all-products` link (pointing to the collection of all products).

---

By following these RESTful best practices when building an API with Java Spring Boot, you can ensure that your API is easy to understand, maintain, and scale. Adhering to these practices helps developers and consumers of the API to interact with the system more efficiently and with fewer errors.

By applying these REST principles and using Spring Boot's features, you can create a solid, reliable API that follows modern development standards.

[Understanding DTOs in Java Spring Boot](https://briacd.com/dto-java-spring-boot)
