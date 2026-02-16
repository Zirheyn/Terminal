---
title: "How to implement caching in Spring Boot with caffeine"
description: "Caching is an essential optimization technique for improving the performance and responsiveness of an application. Spring Boot provides a simple way to integrate caching into your project, and by using Caffeine, you can l"
date: 2025-02-20
tags: [spring-boot]
draft: false
readingTime: 4 min
cover: /banner-test.jpg
---

Caching is an essential optimization technique for improving the performance and responsiveness of an application. Spring Boot provides a simple way to integrate caching into your project, and by using Caffeine, you can leverage a high-performance, memory-efficient caching solution. This guide will walk you through the steps to set up caching in Spring Boot with the Caffeine library, including configuration and usage.

## What is caffeine?

Caffeine is a popular Java caching library known for its high-performance and low-latency capabilities. It offers several powerful features, including automatic eviction strategies and an in-memory cache, making it an ideal choice for caching in Spring Boot applications.

[GitHub - ben-manes/caffeine: A high performance caching library for Java](https://github.com/ben-manes/caffeine)

## Add dependencies in `pom.xml`

The first step to enable caching in your Spring Boot application is to add the necessary dependencies in the `pom.xml` file. Caffeine will be used as the caching provider. To do this, add the following dependencies:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

Spring Boot automatically manages the version of the Caffeine dependency, so you don't need to specify it explicitly.

**Note:** If you are using the `org.postgresql:postgresql` dependency, there might be a conflict with the `org.checkerframework:checker-qual` dependency. In such cases, you can exclude it as shown below:

```xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.checkerframework</groupId>
            <artifactId>checker-qual</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

[Introduction to Maven in a Java Spring Boot project](https://briacd.com/maven-java-spring-boot)

## Configure caching in Spring Boot

Next, you need to set up the caching configuration. Create a new configuration class in your project to enable caching and configure the Caffeine cache.

### Creating cache configuration

In your `config` folder (or any suitable directory in your project), create a class called `CacheConfig.java`:

```java
@Configuration
@EnableCaching
public class CacheConfig {

    public static final String MY_CACHE = "my_cache";
    
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();

        cacheManager.setCaches(asList(
            createCache(MY_CACHE, 30, 50)
            //Caches..
        ));

        return cacheManager;
    }

    private CaffeineCache createCache(String name, Integer minutesTTL, Integer maxSize) {
        return new CaffeineCache(name,
            Caffeine.newBuilder()
                .expireAfterWrite(minutesTTL, TimeUnit.MINUTES)
                .maximumSize(maxSize)
                .build()
        );
    }
}
```

### Explanation of the configuration

1. **`@EnableCaching`**: This annotation enables caching support in your Spring Boot application.
2. **`CacheManager`**: We define a `CacheManager` that will manage multiple caches. Here, we create three caches, each with a 30-minute time-to-live (TTL) and a maximum size of 50 items.
3. **`CaffeineCache`**: For each cache, we use the `Caffeine.newBuilder()` method to set the TTL and maximum size.

This configuration ensures that your application will store cached data for 30 minutes, and only a maximum of 50 items will be kept in the cache at any given time.

## Use caching in your application

Once the cache configuration is set, you can start using it in your service methods. You can use the `@Cacheable` annotation to indicate that the result of a method should be cached.

### Example usage of caching

Here’s an example of how to use caching in a method:

```java
@Cacheable(CacheConfig.MY_CACHE)
public CompanyFolder getCompanyFolderById(String id) {
    Long beginTime = System.currentTimeMillis();
    String path = "/company_folders/" + id;

    try {
        CompanyFolder docType = this.apiConfig.getClient()
                .get()
                .uri(path)
                .retrieve()
                .bodyToMono(CompanyFolder.class)
                .block();
        log.info("[API] Appel GET {} sur l'API en {} ms", path, System.currentTimeMillis() - beginTime);
        return docType;
    } catch (WebClientResponseException e) {
        log.error("[API] Erreur lors de l'appel GET {} sur l'API : {}", path, e.getMessage(), e);
        throw new TechnicalException("Erreur lors de la récupération d'un dossier entreprise sur l'api : " + e.getResponseBodyAsString(), e);
    }
}
```

### How it works

1. **`@Cacheable(CacheConfig.MY_CACHE)`**: This annotation tells Spring that the result of this method should be cached under the cache named `my_cache`.
2. **Cache key**: By default, Spring uses the method parameters as the cache key. In this case, the method parameter `id` will be used as the cache key. If you call this method with the same `id`, the cached result will be returned instead of making a new API call.

### Cache eviction

If you want to implement cache eviction (removing cached data), you can use annotations like `@CacheEvict`. For example:

```java
@CacheEvict(value = CacheConfig.MY_CACHE, key = "#id")
public void removeCompanyFolderFromCache(String id) {
    // This method will evict the cache for the specific id
}
```

This method will remove the cached entry for the given `id` when it’s invoked.

## Benefits of using caffeine for caching

- **High performance**: Caffeine is designed to be fast and highly efficient in memory usage.
- **Automatic expiry**: Cached entries are automatically evicted when they expire based on the TTL you define.
- **Fine-grained control**: You can fine-tune the cache size, eviction policies, and time-to-live, giving you full control over how data is cached in your application.

## Conclusion

Implementing caching in a Spring Boot application using Caffeine is straightforward and significantly improves the performance of data retrieval operations. By setting up a cache configuration and using the `@Cacheable` annotation, you can ensure that frequently accessed data is retrieved quickly from memory, reducing the load on your backend services.

Remember to configure appropriate cache eviction policies to ensure your cache doesn't grow too large, and keep your application memory-efficient. Caffeine’s integration with Spring Boot is seamless and allows you to take full advantage of its powerful caching features.
