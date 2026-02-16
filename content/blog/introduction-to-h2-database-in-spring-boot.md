---
title: "Introduction to H2 database in Spring Boot"
description: "H2 is a fast, open-source, and lightweight database management system written in Java. It is particularly popular in development and testing environments due to its simplicity, small footprint, and the ability to run both"
date: 2025-01-30
tags: [spring-boot]
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

H2 is a fast, open-source, and lightweight database management system written in Java. It is particularly popular in development and testing environments due to its simplicity, small footprint, and the ability to run both in-memory and on-disk. H2 can be used as an embedded database or in client-server mode, and it integrates seamlessly with Java-based applications, especially Spring Boot.

In this article, we will explore the functionality of H2 in Java Spring Boot, its use cases, and provide an example of how to set it up.

[H2 Database Engine](https://www.h2database.com/html/main.html)

## What is H2 database?

H2 is a relational database that supports SQL and provides features like in-memory databases, ACID compliance, and a small size. It can run entirely within a Java application, making it ideal for applications that need a database without the overhead of a full-fledged database server.

The key features of H2 include:

- **In-Memory database**: H2 can operate entirely in memory, meaning it stores all data in RAM and doesn’t require disk persistence unless specified. This makes it ideal for testing or temporary storage.
- **Embedded mode**: H2 can be embedded into a Java application as a library without the need for separate server processes.
- **SQL support**: H2 supports the standard SQL syntax and is compatible with many JDBC-based tools.
- **Small footprint**: H2 is lightweight and doesn’t require large resources, which makes it efficient for small applications or testing purposes.

## Why use H2 in Spring Boot?

In Spring Boot, H2 can be used as a quick, lightweight database option during the development phase, especially when testing or when you need a simple, in-memory solution. It's ideal for:

- **Rapid development**: Developers can prototype and test applications quickly with H2 as a database.
- **Testing**: H2 can be used for unit testing where an actual database is not necessary, reducing the setup and maintenance overhead of using a full database system.
- **Embedded applications**: H2 can be embedded in a Spring Boot application without any need for a separate database server.

## How does H2 database work with Spring Boot?

Spring Boot provides seamless integration with H2 through its auto-configuration feature. You can easily set up H2 by adding the necessary dependency in the `pom.xml` or `build.gradle` file.

By default, Spring Boot will automatically configure an H2 database in-memory when no external database connection is provided. It also supports features like automatic table creation and schema generation.

## Example using H2 database with Spring Boot

Let's go through a simple example of how to set up and use H2 in a Spring Boot application.

### Create a Spring Boot project

Start by creating a Spring Boot project using [Spring Initializr](https://start.spring.io/) or your favorite IDE (e.g., IntelliJ IDEA or Eclipse).

### Add H2 dependency

In your `pom.xml` (if you are using Maven), add the H2 dependency:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

[Introduction to Maven in a Java Spring Boot project](https://briacd.com/maven-java-spring-boot)

If you're using Gradle, add the following:

```
implementation 'com.h2database:h2'
```

### Configure `application.properties`

Now configure the database connection in `src/main/resources/application.properties`:

```
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb  # In-memory database
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# Enable H2 console for easy access to the database via web browser
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

Here, `jdbc:h2:mem:testdb` indicates an in-memory H2 database called `testdb`. You can change the URL to use a persistent database by replacing `mem` with a file-based path.

### Create an entity class

Next, define an entity class to represent a table in the H2 database. For instance, let’s create a `Person` class:

```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Person {

    @Id
    private Long id;
    private String name;
    private String email;

    // Constructors, Getters, Setters, etc..
}
```

### Create a repository

In Spring Boot, data access is typically done through the `JpaRepository` interface. Create a repository for the `Person` entity:

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
```

### Create a controller

Let’s create a simple REST controller to interact with the `Person` entity:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/persons")
public class PersonController {

    private final PersonRepository personRepository;

    @GetMapping
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        return personRepository.save(person);
    }
}
```

[Guide to Lombok in Spring Boot with Maven](https://briacd.com/lombok-spring-boot-maven)

### Run the application

Run your Spring Boot application. The H2 database will start in memory and Spring Boot will automatically create the tables based on your entity classes.

To test the database:

- Open a browser and go to `http://localhost:8080/h2-console` to access the H2 web console.
- Use the JDBC URL `jdbc:h2:mem:testdb`, username `sa`, and password `password` to log in.

### Test the application

Now, you can test the application using REST endpoints. Use tools like Postman or cURL to interact with the API:

- To get all persons:

```bash
GET http://localhost:8080/api/v1/persons
```

- To add a new person:

```bash
POST http://localhost:8080/api/v1/persons
Content-Type: application/json

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

H2 is an excellent choice for lightweight database needs in Spring Boot applications. It's easy to configure, integrates seamlessly with Spring Data JPA, and can be used in various scenarios like testing or prototyping without the need for a separate database server. With the in-memory mode, you can quickly spin up a temporary database without any persistent storage, which makes it perfect for development or testing environments.
