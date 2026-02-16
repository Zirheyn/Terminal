---
title: "Web Scraping with Jsoup in a Spring Boot Project"
description: "Practical guide to configure and use Jsoup in a Spring Boot project to fetch and manipulate HTML data."
date: 2024-11-23
tags: [spring-boot, api]
draft: false
readingTime: 3 min
cover: /banner-test.jpg
---

Practical guide to configure and use Jsoup in a Spring Boot project to fetch and manipulate HTML data.

### **Step 1: Create a Spring Boot Project**

1. **Set Up the Project**
    
    Use [Spring Initializr](https://start.spring.io/) to create a new Spring Boot project.
    
    - Language: Java + Maven
    - Dependencies: **Spring Web**
    
2. **Add Jsoup to the Project**

Add the following dependency in the `pom.xml` file:

```xml
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
</dependency>
```

Check version : 

[Maven Repository: org.jsoup » jsoup](https://mvnrepository.com/artifact/org.jsoup/jsoup)

### **Step 2: Structure the Project**

1. **Create a Service Class for Scraping**

Create a service that uses Jsoup for web scraping.

```java
package com.example.scraper.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ScrapingService {

    public String scrapeData(String url) {
        try {
            // Load the HTML page
            Document document = Jsoup.connect(url).get();

            // Extract specific elements (e.g., titles)
            Elements titles = document.select("h1, h2, h3");
            StringBuilder result = new StringBuilder("Found titles:\n");

            for (Element title : titles) {
                result.append(title.text()).append("\n");
            }

            return result.toString();
        } catch (IOException e) {
            return "Scraping error: " + e.getMessage();
        }
    }
}
```

1. **Create a Controller to Expose the API**

Add a controller to make the service accessible via a REST endpoint:

```java
package com.example.scraper.controller;

import com.example.scraper.service.ScrapingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ScrapingController {

    private final ScrapingService scrapingService;

    @GetMapping("/scrape")
    public String scrapeWebsite(@RequestParam String url) {
        return scrapingService.scrapeData(url);
    }
}
```

### **Step 3: Test the Application**

1. **Run the Application**

Start the application using the following command:

```bash
mvn spring-boot:run
```

1. **Test the API with a Browser or Postman**

Access the following URL:

```bash
http://localhost:8080/scrape?url=https://example.com
```

### **Step 4: Best Practices for Scraping**

- **Limit Request Frequency**: Avoid sending too many requests in a short period to prevent being blocked by the target site.
- **Respect the Website's Rules**: Check the `robots.txt` file to ensure scraping is allowed.
- **Handle Exceptions**: Anticipate network errors or changes in the website’s HTML structure.

### **Step 5: Additional Optimizations**

- **Set a Custom User-Agent**: Some websites block default Jsoup requests.

```java
Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36").get();
```

- **Use Proxy Configuration** if scraping from a network-restricted environment.

### **Example Repository for Reference**

To complement this tutorial, I've created a GitHub repository showcasing an example implementation of the basic scraping API described above. It includes:

- **Setup instructions** for running the project.
- **Authentication** via token for secure API access.
- Fully working **scraping examples**.

You can access the repository here: [Basic Scraping API Example](https://github.com/briacdev/basic-scraping-api-exemple).

```java
public List<ResponseDTO> searchBooks(String token, String search, int page, String language) {
    if (!this.token.isEmpty() && !this.token.equals(token)) {
        throw new RuntimeException("Bad login");
    }

    List<String> urls = new ArrayList<>();
    try {
        String urlWithParam = url + "/s/" + search + "?page="+page;
        if(language != null && !language.isEmpty()) {
            urlWithParam = urlWithParam + "&languages%5B%5D="+language;
        }
        Document document = Jsoup.connect(urlWithParam)
                .userAgent("Mozilla")
                .get();
        Element element = document.getElementById("searchResultBox");
        Elements elements = element.getElementsByTag("bookcard");

        for (Element ads: elements) {
            if (!ads.getElementsByTag("bookcard").isEmpty()) {
                urls.add(ads.getElementsByTag("bookcard").attr("href"));
            }
        }
    } catch (IOException ex) {
        ex.printStackTrace();
    }

    return getBooksDetail(urls);
}
```

Feel free to explore the repository and adapt the code for your use case! 🚀

### **Conclusion**

With this tutorial, you have a working web scraping service using **Jsoup**, integrated into a **Spring Boot** project. You can now customize this service to extract specific data as per your requirements. 🚀
