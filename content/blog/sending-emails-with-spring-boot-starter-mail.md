---
title: "Sending Emails with Spring Boot Starter Mail"
description: "Spring Boot simplifies email sending by integrating JavaMail support through the **spring-boot-starter-mail** module."
date: 2024-11-29
tags: [spring-boot]
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

Spring Boot simplifies email sending by integrating JavaMail support through the **spring-boot-starter-mail** module.

The choice of the **`spring-boot-starter-mail`** is driven by its simplicity and seamless integration with Spring Boot. This starter provides everything needed to send emails via the SMTP protocol using JavaMail. Thanks to Spring Boot’s autoconfiguration, you can quickly define essential settings (such as host, port, and credentials) and focus on business logic. Additionally, it allows sending emails in plain text or HTML format, with attachments, while supporting security standards like SSL and STARTTLS.

## **Add dependencies**

Ensure you have the mail starter in your **`pom.xml`** file:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

[Maven repository here](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-mail)

## **Configure SMTP settings**

Add the necessary configuration in the **`application.properties`** or **`application.yml`** file.

### Example with **`application.properties`**:

```
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YourEmailAddress@gmail.com
spring.mail.password=YourPassword
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> ⚠️ Note: For Gmail, you may need to enable less secure apps or set up an application-specific password if using two-factor authentication.
> 

The **`spring.mail.properties.mail.smtp`** properties allow you to configure SMTP (Simple Mail Transfer Protocol) settings used by JavaMail to send emails. Below is a list of the most common properties and their explanations:

### **`spring.mail.properties.mail.smtp.auth`**

- **Description**: Enables or disables SMTP authentication.
- **Possible values**:
    - `true`: Authentication is required (e.g., username and password).
    - `false`: No authentication is required.

```
spring.mail.properties.mail.smtp.auth=true
```

### **`spring.mail.properties.mail.smtp.starttls.enable`**

- **Description**: Enables **STARTTLS**, which encrypts the communication between the client and the SMTP server.
- **Possible values**:
    - `true`: STARTTLS is enabled.
    - `false`: STARTTLS is disabled.

```
spring.mail.properties.mail.smtp.starttls.enable=true
```

### **`spring.mail.properties.mail.smtp.starttls.required`**

- **Description**: Specifies if STARTTLS is mandatory. If the server does not support STARTTLS, sending will fail.
- **Possible values**:
    - `true`: STARTTLS is required.
    - `false`: STARTTLS is not required.

```
spring.mail.properties.mail.smtp.starttls.required=false
```

### **`spring.mail.properties.mail.smtp.connectiontimeout`**

- **Description**: Sets the timeout (in milliseconds) for establishing a connection to the SMTP server.
- **Value**: Integer representing milliseconds.

```
spring.mail.properties.mail.smtp.connectiontimeout=5000
```

### **`spring.mail.properties.mail.smtp.timeout`**

- **Description**: Sets the timeout (in milliseconds) for reading the server's response after sending a command.
- **Value**: Integer representing milliseconds

```
spring.mail.properties.mail.smtp.timeout=5000
```

---

### **`spring.mail.properties.mail.smtp.writetimeout`**

- **Description**: Sets the timeout (in milliseconds) for writing data to the SMTP server.
- **Value**: Integer representing milliseconds

```
spring.mail.properties.mail.smtp.writetimeout=5000
```

### **`spring.mail.properties.mail.smtp.ssl.enable`**

- **Description**: Enables SSL for the SMTP connection. Use this if the SMTP server requires SSL instead of STARTTLS.
- **Possible values**:
    - `true`: SSL is enabled.
    - `false`: SSL is disabled.

```
spring.mail.properties.mail.smtp.ssl.enable=true
```

### **`spring.mail.properties.mail.smtp.ssl.trust`**

- **Description**: Specifies trusted hosts for SSL connections. Can be set to a specific host or ``to trust all hosts.

```
spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
```

### **`spring.mail.properties.mail.smtp.from`**

- **Description**: Sets the default sender's email address if not specified in the code.

```
spring.mail.properties.mail.smtp.from=example@gmail.com
```

### **`spring.mail.properties.mail.smtp.localhost`**

- **Description**: Defines the local host name used in the **EHLO** command sent to the SMTP server

```
spring.mail.properties.mail.smtp.localhost=localhost
```

### **`spring.mail.properties.mail.smtp.socketFactory.port`**

- **Description**: Specifies the port to use for SSL connections.

```
spring.mail.properties.mail.smtp.socketFactory.port=465
```

### **`spring.mail.properties.mail.smtp.socketFactory.class`**

- **Description**: Specifies the class to use for creating SSL sockets.

```
spring.mail.properties.mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory
```

### **`spring.mail.properties.mail.smtp.quitwait`**

- **Description**: Indicates whether the client should wait for a response from the server after the **QUIT** command.
- **Possible values**:
    - `true`: Wait for the response.
    - `false`: Do not wait for the response.

```
spring.mail.properties.mail.smtp.quitwait=false
```

These properties provide flexibility to configure the SMTP client according to security and performance needs. The choice of properties will depend on your email provider (like Gmail, Outlook, etc.) and your specific security and performance requirements.

## **Create a service to send emails**

We will create a service using **`JavaMailSender`**, provided by Spring Boot.

### Example of a sending service:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("YourEmailAddress@gmail.com");
        mailSender.send(message);
    }
}
```

## **Use the service to send emails**

Create a controller or a component to call the service:

### Example controller:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-email")
    public String sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String text) {
        emailService.sendSimpleEmail(to, subject, text);
        return "Email successfully sent to " + to;
    }
}
```

## **Send an HTML email** (optional)

If you want to send HTML emails, you need to use **`MimeMessage`** instead of **`SimpleMailMessage`**.

### Example:

```java
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom("YourEmailAddress@gmail.com");

        mailSender.send(message);
    }
}
```

## **Test email sending**

- Run the Spring Boot application.
- Access the following URL in your browser or via a tool like [**Postman**](https://www.postman.com/):

```
http://localhost:8080/send-email?to=recipient@example.com&subject=Test&text=Hello World!
```

You should receive an email with the specified text.

### **Example repository for reference**

To complement this tutorial, I've created a GitHub repository showcasing an example implementation of the basic spring boot starter mail described above.

You can access the repository here: [Basic Email Sender API Example](https://github.com/briacdev/basic-email-sender-api-exemple).

## Conclusion

With **Spring Boot Starter Mail**, sending emails is simple thanks to auto-configuration and easy service injection. You can further customize your emails with HTML, attachments, or templates to meet your needs.
