---
title: "How to implement key authentication in a Spring Boot API"
description: "In modern API design, securing endpoints is a fundamental aspect of development. Using an API key in the header, such as \"X-API-KEY,\" is a common practice for lightweight authentication. Here's how you can implement it in"
date: 2025-03-06
tags: [spring-boot, api]
draft: false
readingTime: 2 min
cover: /banner-test.jpg
---

## How to implement "X-API-KEY" authentication in a Spring Boot API

In modern API design, securing endpoints is a fundamental aspect of development. Using an API key in the header, such as "X-API-KEY," is a common practice for lightweight authentication. Here's how you can implement it in a Spring Boot application.

### **Create an API key filter**

The `ApiKeyAuthFilter` intercepts all incoming HTTP requests, checks the `X-API-KEY` header, and validates it against a predefined key.

```java
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@WebFilter("/*")
@RequiredArgsConstructor
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    private final String apiKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestApiKey = request.getHeader("X-API-KEY");

        if (requestApiKey == null || !requestApiKey.equals(apiKey)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid API Key");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
```

### **Configure the filter in a security configuration**

This configuration class registers the filter and ensures it only applies to specific URL patterns.

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Value("${api.key}")
    private String apiKey;

    @Bean
    public FilterRegistrationBean<ApiKeyAuthFilter> apiKeyAuthFilter() {
        ApiKeyAuthFilter filter = new ApiKeyAuthFilter(apiKey);
        FilterRegistrationBean<ApiKeyAuthFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/api/*");
        return registrationBean;
    }
}
```

### **Define the API key in configuration**

Store your API key in the `application.properties` or `application.yml` file.

**`application.properties`:**

```
api.key=your-secure-api-key
```

**`application.yml`:**

```yaml
api:
  key: your-secure-api-key
```

### **Test the API**

1. **Start the Spring Boot application.**
2. Make a request to an endpoint under `/api/`, including the header `X-API-KEY` with the value specified in your configuration.

**Valid key example:** 200 OK

```bash
curl -H "X-API-KEY: your-secure-api-key" http://localhost:8080/api/example
```

**Invalid key example:** 401 Unauthorized, "Invalid API Key"

```bash
curl -H "X-API-KEY: invalid-key" http://localhost:8080/api/example
```

### **Additional enhancements**

1. **Key rotation:** Use a database or a secure key management service to support multiple API keys and periodic rotations.
2. **Rate limiting:** Combine this with rate limiting for better API protection.
3. **Testing:** Use tools like Postman or JUnit with MockMvc to validate your implementation.

This simple yet effective "X-API-KEY" implementation in Spring Boot ensures secure access to your endpoints, providing a strong starting point for API security.

[Best practices for RESTful API design](https://briacd.com/best-practices-for-restful-api-design)
