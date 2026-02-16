---
title: "Introduction to Maven in a Java Spring Boot project"
description: "[Apache Maven](https://maven.apache.org/) is a powerful build automation and dependency management tool widely used in Java development. When working on a Spring Boot project, Maven simplifies project setup, dependency ma"
date: 2025-01-08
tags: [spring-boot, java]
draft: false
readingTime: 7 min
cover: /banner-test.jpg
---

[Apache Maven](https://maven.apache.org/) is a powerful build automation and dependency management tool widely used in Java development. When working on a Spring Boot project, Maven simplifies project setup, dependency management, and builds, making it an indispensable tool for developers.

In this article, we'll explore Maven's key features and its role in a Spring Boot project.

## What is Maven?

Maven is an open-source tool developed by the [Apache Software Foundation](https://www.apache.org/). It uses a Project Object Model (POM) file, typically named `pom.xml`, to manage a project’s configuration, dependencies, and plugins. Its declarative nature makes projects easier to manage and share across teams.

## Why use Maven in Spring Boot Projects?

### **Dependency management**

Maven handles dependencies efficiently. Instead of manually downloading and configuring JAR files, developers declare them in the `pom.xml`. Maven resolves and downloads the required dependencies automatically from central or custom repositories.

[Maven Repository: Search/Browse/Explore](https://mvnrepository.com/)

### **Build automation**

Maven automates the build process, from compiling code to packaging it into executable JAR or WAR files.

### **Integration with Spring Boot**

Spring Boot projects leverage Maven to simplify the inclusion of Spring modules and other libraries. The Spring Boot starter dependencies make it straightforward to bootstrap new projects.

### **Multi-Module projects**

Maven supports multi-module projects, enabling developers to organize large applications into smaller, manageable modules.

## Getting started with Maven in a Spring Boot project

### 1. Create a Maven Project

Start by creating a Maven-based Spring Boot project using [Spring Initializr](https://start.spring.io/):

- Select **Maven** as the project type.
- Choose dependencies like **Spring Web**, **Spring Data JPA**, or others based on your needs.
- Download and extract the project.

### 2. Understand the `pom.xml`

The `pom.xml` is the core of a Maven project. A typical Spring Boot `pom.xml` might look like this:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>spring-boot-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.0</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
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

### Key sections of `pom.xml`:

- **Parent**: Inherits configurations from the Spring Boot parent POM, simplifying version management.
- **Dependencies**: Lists all libraries required for the project.
- **Build**: Defines build plugins, such as the Spring Boot Maven plugin for packaging applications.

## Exploring `<dependency>` options in `pom.xml`

When managing dependencies in a Maven project, the `<dependency>` tag in the `pom.xml` file allows you to include external libraries required for your application. This section explains the different elements and options available within a `<dependency>` block, using the example of the `spring-boot-starter-test` dependency.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Key elements in `<dependency>`:

**`<groupId>`**

- Identifies the organization or group that provides the dependency.
- Example: `org.springframework.boot` refers to the Spring Boot organization.

**`<artifactId>`**

- Specifies the name of the library or module.
- Example: `spring-boot-starter-test` is a Spring Boot module for testing.

**`<version>`** *(optional if managed by a parent POM or BOM)*

- Indicates the specific version of the dependency.
- If omitted, Maven will use the version defined in the dependency management section of a parent POM or BOM.

**`<scope>`**

- Defines the lifecycle phase where the dependency is active.
- Common values:
    - `compile` (default): Available in all phases of the build process.
    - `test`: Available only during the test phase.
    - `provided`: Required during compilation but not packaged in the final artifact (e.g., servlet APIs).
    - `runtime`: Required during execution but not for compilation (e.g., JDBC drivers).
    - `system`: Similar to `provided`, but you must specify the dependency's path manually using `<systemPath>`.

**`<optional>`**

- Indicates that this dependency is optional for downstream projects.
- Example: `<optional>true</optional>`.
- Useful for libraries where transitive dependencies may not always be needed.

**`<exclusions>`**

- Excludes specific transitive dependencies that are pulled in by this dependency.

```xml
<exclusions>
    <exclusion>
        <groupId>com.example</groupId>
        <artifactId>unwanted-library</artifactId>
    </exclusion>
</exclusions>
```

- Prevents conflicts or unnecessary libraries from being included.

**`<classifier>`**

- Used to specify a particular build of the artifact, such as `sources` or `javadoc`.

```xml
<classifier>sources</classifier>
```

**`<type>`**

- Specifies the packaging type of the dependency.
- Default is `jar`.
- Example: `<type>war</type>`.

### Example with Additional Options

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>my-library</artifactId>
    <version>1.0.0</version>
    <scope>provided</scope>
    <optional>true</optional>
    <exclusions>
        <exclusion>
            <groupId>com.unwanted</groupId>
            <artifactId>conflict-lib</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### When to use these options

- Use `<scope>` to optimize build times by limiting dependency usage to specific phases.
- Use `<exclusions>` to prevent dependency conflicts or reduce the size of your application.
- Use `<optional>` to avoid forcing unnecessary dependencies on downstream consumers.
- Adjust `<classifier>` and `<type>` for specialized builds or formats.

These options provide flexibility and control over dependency management, helping ensure your Maven project is clean and efficient.

## Understanding Maven phases

Apache Maven operates on a lifecycle that consists of specific phases, each representing a stage in the build process. These phases ensure that your project is built, tested, and packaged in a structured and predictable manner. By executing a single command, Maven automatically invokes all the preceding phases in the lifecycle. Here's an overview of the most commonly used Maven phases:

### **validate**

This phase validates the project by checking if all required information is present and correct. For instance, it ensures that all dependencies are declared properly in the `pom.xml`.

### **compile**

The `compile` phase compiles the project's source code into bytecode. It uses the configuration defined in the `pom.xml` and places the compiled code in the `target/classes` directory.

```bash
mvn compile
```

### **test**

In this phase, Maven runs the unit tests using a testing framework like JUnit or TestNG. The tests ensure that the compiled code behaves as expected. However, the tests are not packaged with the final artifact.

```bash
mvn test
```

### **package**

The `package` phase creates the distributable format of the project, such as a JAR or WAR file, based on the project configuration.

```bash
mvn package
```

### **verify**

This phase performs checks to ensure that the package meets quality standards. It might include running integration tests or verifying the package's integrity.

### **install**

The `install` phase installs the packaged artifact into the local Maven repository. This allows other projects on the same machine to use the artifact as a dependency.

```bash
mvn install
```

### **deploy**

The `deploy` phase copies the final package to a remote repository for sharing with other developers or systems. This is typically used in a CI/CD pipeline.

```bash
mvn deploy
```

### How Maven phases work together

When you run a Maven command, such as `mvn install`, Maven automatically executes all preceding phases in the lifecycle. For example, invoking `mvn install` will run the `validate`, `compile`, `test`, `package`, and `verify` phases before executing the `install` phase.

### Customizing phases with plugins

You can extend or customize Maven phases using plugins. For example, to include a code formatting check during the `validate` phase, you can configure a plugin in the `pom.xml`. This makes Maven highly adaptable to various project requirements.

Understanding Maven phases and how they interconnect is key to mastering the tool and optimizing your project's build process.

## Common Maven commands for Spring Boot projects

Compile and package the application:

```bash
mvn clean install
```

Use the Spring Boot Maven plugin to start the application:

```bash
mvn spring-boot:run
```

Remove compiled files and directories:

```bash
mvn clean
```

Maven is an essential tool for Java developers working with Spring Boot. Its simplicity in managing dependencies, automating builds, and streamlining project configurations makes it invaluable in modern development workflows. By understanding how to configure and use Maven effectively, you can maximize productivity and maintain clean, maintainable projects.

[Welcome to Apache Maven – Maven](https://maven.apache.org/)
