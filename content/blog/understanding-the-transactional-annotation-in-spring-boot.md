---
title: "Understanding the @Transactional annotation in Spring Boot"
description: "The `@Transactional` annotation is a cornerstone of Spring’s declarative transaction management. It allows developers to manage transactions efficiently without having to write verbose code. By simply annotating a method"
date: 2025-01-14
tags: [spring-boot]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

The `@Transactional` annotation is a cornerstone of Spring’s declarative transaction management. It allows developers to manage transactions efficiently without having to write verbose code. By simply annotating a method or class, you can define transactional behavior, such as rollback policies, isolation levels, and propagation settings.

In this article, we’ll explore how `@Transactional` works, its key attributes, and best practices for using it in Spring Boot applications.

## What is `@Transactional`?

The `@Transactional` annotation in Spring is part of the `org.springframework.transaction.annotation` package. It indicates that a method or class should be executed within a transaction context. Transactions ensure data consistency and integrity, especially in systems where multiple operations must either all succeed or all fail (atomicity).

## How `@Transactional` works

When you annotate a method with `@Transactional`, Spring creates a proxy that wraps the method. This proxy handles transaction creation, commit, and rollback based on the outcome of the method execution. For instance:

- If the method completes successfully, the transaction is committed.
- If an exception occurs, the transaction is rolled back.

## Key attributes of `@Transactional`

### **Propagation**

Defines how transactions interact with each other. The options include:

- **`REQUIRED` (default):** Uses an existing transaction or creates a new one if none exists.
- **`REQUIRES_NEW`:** Suspends the current transaction and starts a new one.
- **`MANDATORY`:** Requires an existing transaction; throws an exception if none is found.
- **`SUPPORTS`:** Executes within an existing transaction if available, otherwise runs non-transactionally.
- **`NOT_SUPPORTED`:** Suspends the current transaction and runs non-transactionally.
- **`NEVER`:** Ensures that no transaction is present; throws an exception if one exists.

```java
    public static enum TxType {
        REQUIRED,
        REQUIRES_NEW,
        MANDATORY,
        SUPPORTS,
        NOT_SUPPORTED,
        NEVER;

        private TxType() {
        }
    }
```

### **Rollback rules**

Controls exception handling for transaction rollbacks:

- **`rollbackFor`:** Specifies the list of exceptions that trigger a rollback.
- **`noRollbackFor`:** Specifies the list of exceptions that do not trigger a rollback.

These attributes allow for fine-tuned transaction management, providing flexibility and control in Spring applications.

## Applying `@Transactional`

### At the method level

You can annotate individual methods to define their transaction behavior.

```java
@Transactional
public void updateAccountBalance(Long accountId, Double amount) {
    Account account = accountRepository.findById(accountId).orElseThrow();
    account.setBalance(account.getBalance() + amount);
    accountRepository.save(account);
}
```

### At the class level

Annotating a class applies the same transaction behavior to all its methods.

```java
@Transactional
@Service
public class AccountService {
    // All methods in this class are transactional
}
```

## Best practices

1. **Use fine-grained transactions**
Avoid marking entire classes with `@Transactional` unless all methods require the same transaction behavior.
2. **Beware of self-invocation**
Transactional proxies do not apply to self-invoked methods. Use AOP or restructure your code to handle such cases.
3. **Set proper isolation levels**
Choose the isolation level based on your application’s concurrency requirements.
4. **Minimize transaction scope**
Keep transactions as short as possible to reduce locking and contention.
5. **Avoid non-transactional methods**
Ensure that operations requiring transactions are properly annotated to avoid data inconsistencies.

## Using `@Transactional` in a Spring Boot

Here’s a complete example of using `@Transactional` in a Spring Boot application:

```java
@Entity
@Getter
@Setter
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String owner;
    private Double balance;
}
```

```java
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {}
```

```java
@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public void transferMoney(Long fromAccountId, Long toAccountId, Double amount) {
        Account fromAccount = accountRepository.findById(fromAccountId).orElseThrow();
        Account toAccount = accountRepository.findById(toAccountId).orElseThrow();

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
    }
}
```

[Guide to Lombok in Spring Boot with Maven](https://briacd.com/lombok-spring-boot-maven)

The `@Transactional` annotation simplifies transaction management in Spring Boot applications by enabling declarative configuration. By understanding its attributes and best practices, you can leverage it to ensure data integrity and consistency in your applications. Remember to use it judiciously, keeping performance and maintainability in mind.
