---
title: Fondamentaux Spring Boot
description: Comprendre ce que Spring Boot apporte, comment fonctionnent l'auto-configuration et les starters, et construire une application minimale sur des bases solides.
date: 2026-03-12
tags: [spring-boot, java, backend, fundamentals]
draft: false
readingTime: 11 min
---

## Pourquoi ce sujet est important

Spring Boot est souvent la porte d'entrée du développement back-end Java moderne.

Si les fondamentaux sont clairs dès le départ, tout le reste de l'écosystème devient plus simple à comprendre. On arrête de recopier des annotations sans recul et on commence à comprendre pourquoi l'application démarre, comment les dépendances sont injectées et d'où vient la configuration.

## Ce qu'est vraiment Spring Boot

Spring Boot n'est **pas** un framework séparé de Spring. Il s'appuie sur le Spring Framework et poursuit trois objectifs très concrets :

- démarrer un projet plus vite
- réduire la configuration technique manuelle
- fournir des réglages par défaut adaptés à la production

En pratique, Spring Boot vous aide à passer moins de temps sur la configuration et plus de temps sur la logique métier.

## Spring vs Spring Boot

Un modèle mental simple :

- **Spring Framework** fournit le conteneur, l'injection de dépendances, la couche web, l'intégration data, la sécurité et de nombreux modules
- **Spring Boot** fournit des conventions, des starters, de l'auto-configuration et des réglages runtime pour utiliser Spring plus vite

Spring Boot ne remplace donc pas Spring. Il donne une manière plus productive d'assembler une application Spring.

## Les 3 idées à comprendre d'abord

### 1. `@SpringBootApplication`

La plupart des applications Spring Boot commencent avec une classe principale :

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

Cette annotation est importante car elle regroupe trois idées :

- la configuration
- la détection des composants
- l'auto-configuration

Autrement dit, Boot peut découvrir vos composants, enregistrer les beans et activer des réglages utiles selon les dépendances présentes dans le classpath.

### 2. Les starters

Spring Boot utilise des **starters** pour simplifier la gestion des dépendances.

Au lieu d'ajouter manuellement de nombreuses bibliothèques de bas niveau, on ajoute en général un starter qui représente un cas d'usage courant.

Exemple avec Maven :

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

Ce starter apporte ce qu'il faut en général pour une application web, notamment Spring MVC et un serveur embarqué.

L'idée n'est pas la magie. L'idée est d'avoir un ensemble de dépendances cohérent, prêt à l'emploi.

### 3. L'auto-configuration

L'auto-configuration signifie que Spring Boot inspecte le classpath et configure automatiquement une partie de l'infrastructure standard.

Exemples :

- si vous ajoutez le starter web, Boot prépare une configuration d'application web
- si vous ajoutez une dépendance de base de données prise en charge, Boot peut configurer une source de données (`DataSource`)
- si vous ajoutez Actuator, Boot peut exposer des endpoints de supervision

Point important : l'auto-configuration est **non invasive**. Si vous déclarez explicitement votre propre bean ou votre propre configuration, Boot s'efface en général au lieu d'entrer en conflit avec votre code.

## Une application Spring Boot minimale

Voici un petit exemple qui montre le fonctionnement de base.

### Un contrôleur

```java
package com.example.demo.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot";
    }
}
```

### Un service

```java
package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    public String message() {
        return "Service layer is active";
    }
}
```

### L'injection par constructeur

```java
package com.example.demo.web;

import com.example.demo.service.GreetingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private final GreetingService greetingService;

    public GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/greeting")
    public String greeting() {
        return greetingService.message();
    }
}
```

C'est le cœur du modèle Spring :

- vos classes déclarent leurs dépendances
- Spring crée les objets
- Spring les injecte là où c'est nécessaire

## Pourquoi l'injection par constructeur est le bon choix par défaut

L'injection par constructeur doit être votre approche par défaut parce qu'elle rend les dépendances explicites.

Elle améliore :

- la lisibilité
- la testabilité
- l'immuabilité des dépendances obligatoires

Si un service ne peut pas fonctionner sans un autre composant, le constructeur rend ce contrat visible immédiatement.

## Bases de la configuration

Spring Boot lit la configuration depuis des fichiers comme `application.properties` ou `application.yml`, mais aussi depuis les variables d'environnement et les arguments en ligne de commande.

Exemple simple en YAML :

```yaml
server:
  port: 8081

spring:
  application:
    name: demo-app
```

Ce fichier se place généralement ici :

```text
src/main/resources/application.yml
```

C'est l'un des grands gains de confort de Spring Boot : la configuration est externalisée, donc le même code peut tourner en local, en staging et en production avec des valeurs différentes.

## Structure de projet recommandée

Une structure simple et saine pour débuter ressemble à ceci :

```text
src/main/java/com/example/demo
├── DemoApplication.java
├── web
│   └── GreetingController.java
├── service
│   └── GreetingService.java
└── config
    └── AppConfig.java
```

Gardez la classe principale dans un package racine au-dessus des autres. C'est important parce que la détection des composants démarre à partir de ce package.

## Comment lancer une application Spring Boot

Pendant le développement :

```bash
./mvnw spring-boot:run
```

Pour packager l'application :

```bash
./mvnw clean package
```

Puis lancer le jar généré :

```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

Cela fonctionne parce que Spring Boot sait produire un jar exécutable avec serveur embarqué.

## Erreurs fréquentes quand on débute

### Mettre les classes en dehors du package scanné

Si votre contrôleur ou votre service se trouve hors de l'arborescence du package de la classe principale, Spring peut ne pas le détecter.

### Ajouter trop de dépendances trop tôt

Commencez par le minimum :

- Spring Web pour une API
- Spring Validation si nécessaire
- Data JPA seulement si vous avez réellement besoin de persistance

Ajouter trop de choses trop tôt rend le débogage plus difficile.

### Confondre Spring et Spring Boot

Boot apporte de la vitesse et des réglages par défaut, mais les concepts Spring restent centraux :

- beans
- scopes
- injection de dépendances
- configuration
- cycle de vie

Si ces concepts restent flous, les grosses applications deviennent vite difficiles à raisonner.

## Stratégie d'apprentissage recommandée

Une bonne progression consiste à :

1. créer un projet avec Spring Initializr
2. construire un contrôleur et un service
3. externaliser une valeur dans `application.yml`
4. lancer l'application en local
5. packager l'application en jar
6. ensuite seulement passer à la validation, la persistance ou la sécurité

Cette approche permet de garder un modèle mental simple et évite d'apprendre trop de couches en même temps.

## Ressources officielles recommandées

- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/reference/)
- [Using the `@SpringBootApplication` Annotation](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html)
- [Auto-configuration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)
- [Spring Beans and Dependency Injection](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html)
- [Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- [Spring Initializr](https://start.spring.io/)
- [Getting Started: Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot)

## Sources

Cet article s'appuie sur la documentation et les guides officiels de Spring :

- Documentation de référence Spring Boot : [docs.spring.io/spring-boot/reference](https://docs.spring.io/spring-boot/reference/)
- Référence sur l'auto-configuration : [docs.spring.io/spring-boot/reference/using/auto-configuration.html](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)
- Référence sur `@SpringBootApplication` : [docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html)
- Référence sur l'injection de dépendances : [docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html)
- Référence sur la configuration externe : [docs.spring.io/spring-boot/reference/features/external-config.html](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- Guide officiel : [spring.io/guides/gs/spring-boot](https://spring.io/guides/gs/spring-boot)

## À retenir

Les fondamentaux Spring Boot reposent sur un bon modèle mental :

- Boot accélère le démarrage d'un projet
- Spring fournit toujours le modèle de programmation central
- les starters et l'auto-configuration réduisent le code répétitif
- un code explicite et une structure propre restent essentiels

Quand ces bases sont claires, les sujets comme les API REST, la persistance, les tests et la sécurité deviennent beaucoup plus faciles à apprendre sérieusement.
