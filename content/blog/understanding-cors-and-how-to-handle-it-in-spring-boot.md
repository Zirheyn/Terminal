---
title: "Understanding CORS and how to handle it in Spring Boot"
description: "Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to control how resources on a web page can be requested from another domain. While it is essential for protecting users from malicious"
date: 2024-12-30
tags: [spring-boot]
draft: false
readingTime: 4 min
cover: /banner-test.jpg
---

Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to control how resources on a web page can be requested from another domain. While it is essential for protecting users from malicious cross-origin requests, it can become a stumbling block for developers building applications that involve separate frontend and backend servers. In this article, we will break down what CORS is and how to manage it effectively in a Spring Boot backend and a Vue.js frontend.

## What is CORS?

CORS stands for Cross-Origin Resource Sharing. It’s a mechanism that allows or restricts resources on a web server to be requested by another domain outside the server’s origin. For instance, if your Vue.js frontend running on `http://localhost:8080` tries to make an API call to a Spring Boot backend running on `http://localhost:8081`, the browser will block the request unless the server explicitly permits it.

CORS issues manifest as errors in the browser console, such as:

```
Access to fetch at 'http://localhost:8081/api/resource' from origin 'http://localhost:8080' has been blocked by CORS policy.
```

## How does CORS work?

CORS relies on HTTP headers to determine whether a cross-origin request is safe and should be allowed. Key headers include:

- **Origin**: Sent by the browser with the domain of the site making the request.
- **Access-Control-Allow-Origin**: Sent by the server to specify which origins are permitted to access the resource.
- **Access-Control-Allow-Methods**: Indicates the HTTP methods (e.g., GET, POST) that are allowed.
- **Access-Control-Allow-Headers**: Specifies which custom headers can be sent in the request.

When the browser sends a cross-origin request, it may first issue a **preflight request** (an OPTIONS request) to check if the actual request is allowed.

## Managing CORS in Spring Boot

In a [Spring Boot](https://spring.io/projects/spring-boot) application, you can configure CORS at various levels.

### **Global CORS configuration**

You can configure CORS globally for all controllers by creating a `WebMvcConfigurer` bean:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("Content-Type", "Authorization")
                        .allowCredentials(true);
            }
        };
    }
}
```

### **Controller-specific CORS configuration**

You can use the `@CrossOrigin` annotation on specific controllers or methods:

```java
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class ExampleController {

    @GetMapping("/api/resource")
    public String getResource() {
        return "Hello, CORS!";
    }
}
```

### **Spring security CORS configuration**

If you’re using [Spring Security](https://spring.io/projects/spring-security), you need to configure CORS in the security settings:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
    }
}
```

You’ll also need a `CorsConfigurationSource` bean:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

[Spring Security](https://spring.io/projects/spring-security)

## Handling CORS in Vue.js

In Vue.js, CORS issues are generally resolved by properly configuring the backend. However, during development, you can use a **proxy** in Vue CLI to avoid CORS problems.

### Configuring proxy in `vue.config.js`

Add the following to your Vue project’s `vue.config.js`:

```jsx
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true
            }
        }
    }
};
```

This configuration proxies requests starting with `/api` to the Spring Boot backend, effectively bypassing CORS restrictions during local development.

CORS can be a challenging issue when developing applications with separate frontend and backend servers. By properly configuring your Spring Boot application and using tools like proxies in Vue.js during development, you can seamlessly handle cross-origin requests. Understanding how CORS works and its configuration options ensures smoother integration between your backend and frontend, ultimately leading to a better developer experience and a more robust application.
