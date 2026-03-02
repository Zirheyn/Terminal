---
title: Testing - JUnit 5 and Mockito
description: Learn unit testing in Java with JUnit 5 and Mockito, including mocks, stubs, and clean test structure.
date: 2025-01-16
tags: [java, testing, junit5, mockito]
draft: false
readingTime: 14 min
---

## Why this step matters

Reliable software requires tests that are fast, deterministic, and meaningful.
Unit tests are your first safety net for refactoring.

## Unit test scope

A unit test validates one class behavior in isolation.
External dependencies are replaced by test doubles.

## JUnit 5 basics

```java
class PriceServiceTest {

    @Test
    void should_apply_discount_for_premium_user() {
        PriceService service = new PriceService();
        int result = service.applyDiscount(100, true);
        assertEquals(80, result);
    }
}
```

Good test names describe expected behavior.

## Mockito: mocks and stubs

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void should_return_user_when_found() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(new User(1L, "briac")));

        UserDto dto = userService.findById(1L);

        assertEquals("briac", dto.username());
    }
}
```

- stubbing: `when(...).thenReturn(...)`
- verification: `verify(...)`

## Test structure suggestion

Use Arrange / Act / Assert:

1. prepare inputs and stubs
2. execute target method
3. assert result and interactions

## Common mistakes

- over-mocking everything
- asserting implementation details instead of behavior
- brittle tests coupled to internal refactoring
- naming tests too vaguely

## Takeaway

1. Keep unit tests fast and isolated
2. Use Mockito only for real external dependencies
3. Name tests by behavior
4. Prefer clear Arrange/Act/Assert structure
