---
title: Initialisation du projet
description: Apprendre à créer un projet Spring Boot avec Spring Initializr, comprendre les conventions de dossiers et mettre en place Maven ou Gradle proprement.
date: 2026-03-13
tags: [spring-boot, setup, maven, gradle]
draft: false
readingTime: 12 min
---

## Pourquoi ce sujet est important

Beaucoup de problèmes Spring Boot commencent avant même d'écrire la moindre logique métier.

Si le projet est créé avec des choix flous, une structure incohérente ou un système de build mal compris par l'équipe, le développement devient vite plus lent. Une bonne initialisation n'est pas spectaculaire, mais elle enlève beaucoup de friction pour tout ce qui vient ensuite.

Cette étape couvre trois points que tout débutant devrait comprendre tôt :

- comment créer un projet avec Spring Initializr
- comment s'organise une structure de dossiers Spring Boot standard
- comment choisir et utiliser correctement Maven ou Gradle

## Commencer avec Spring Initializr

Le moyen le plus simple et le plus sûr pour créer un projet Spring Boot est [Spring Initializr](https://start.spring.io/).

Il génère une base de projet avec la bonne structure et les bons fichiers de build pour les cas d'usage Spring Boot les plus courants.

### Les champs à choisir en pratique

Quand vous créez un projet, vous devez généralement définir :

- **Project** : Maven ou Gradle
- **Language** : Java
- **Spring Boot version** : choisissez une version stable, pas une milestone ou un snapshot sauf besoin précis
- **Group** : votre organisation ou votre racine de package, par exemple `com.briac`
- **Artifact** : le nom technique du projet, par exemple `demo-api`
- **Packaging** : le plus souvent `jar`
- **Java** : une version alignée avec le JDK réellement utilisé
- **Dependencies** : commencez petit, ajoutez uniquement le nécessaire

### Un exemple simple

- Project : Maven
- Language : Java
- Group : `com.briac`
- Artifact : `demo-api`
- Packaging : `jar`
- Java : `21`
- Dependencies : `Spring Web`

Cela suffit largement pour créer une première API sans complexité inutile.

## Ce que vous fournit Initializr

Un projet généré par Spring Boot contient généralement :

- une classe principale d'application
- un fichier de build (`pom.xml` ou `build.gradle(.kts)`)
- un wrapper (`mvnw` ou `gradlew`)
- une classe de test par défaut
- une arborescence standard pour les sources

C'est important, car vous partez directement sur des conventions utilisées dans la majorité des projets Spring Boot.

## Conventions de dossiers

Une structure Spring Boot propre ressemble souvent à ceci :

```text
demo-api
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── briac
│   │   │           └── demoapi
│   │   │               └── DemoApiApplication.java
│   │   └── resources
│   │       ├── application.yml
│   │       └── static
│   └── test
│       └── java
│           └── com
│               └── briac
│                   └── demoapi
│                       └── DemoApiApplicationTests.java
├── pom.xml
└── mvnw
```

### À quoi servent ces dossiers

- `src/main/java` : le code de production
- `src/main/resources` : la configuration, les templates, les fichiers statiques, les scripts SQL, etc.
- `src/test/java` : les tests automatisés
- `application.yml` : la configuration de l'application

Cette structure est simple, mais elle est importante, car beaucoup de conventions Spring s'appuient dessus.

## Le nommage des packages compte

Gardez la classe principale dans un package racine au-dessus du reste du code.

Exemple :

```text
com.briac.demoapi
```

Puis placez vos contrôleurs, services, repositories et classes de configuration en dessous :

```text
com.briac.demoapi.web
com.briac.demoapi.service
com.briac.demoapi.repository
com.briac.demoapi.config
```

C'est important parce que la détection des composants démarre depuis le package de la classe principale.

Si votre code se trouve en dehors de cette arborescence, Spring risque de ne pas détecter certains beans.

## Maven ou Gradle ?

Spring Boot recommande officiellement d'utiliser un système de build avec une vraie gestion des dépendances. En pratique, cela veut dire **Maven ou Gradle**.

Les deux sont adaptés à la production. La vraie question n'est pas "lequel est objectivement meilleur ?" La bonne question est plutôt : "lequel sera compris et maintenu correctement par l'équipe ?"

### Choisissez Maven si vous voulez

- une approche très guidée par les conventions
- une structure prévisible
- une configuration XML explicite
- une prise en main souvent plus simple dans beaucoup d'équipes Java

### Choisissez Gradle si vous voulez

- un build plus programmable
- une DSL Kotlin ou Groovy
- plus de souplesse pour des besoins avancés
- un workflow fortement centré sur le wrapper

Si vous apprenez Spring Boot seul, Maven est souvent le choix le plus simple pour commencer. Si votre équipe utilise déjà Gradle, alignez-vous sur le standard existant.

## Un exemple minimal avec Maven

Voici un `pom.xml` Spring Boot classique. La version de Boot doit correspondre à celle choisie dans Initializr :

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>your-selected-spring-boot-version</version>
        <relativePath/>
    </parent>

    <groupId>com.briac</groupId>
    <artifactId>demo-api</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo-api</name>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
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

### Pourquoi cette structure fonctionne bien

- le parent Spring Boot gère de nombreuses versions pour vous
- les starters réduisent le boilerplate des dépendances
- le plugin Maven facilite l'exécution et le packaging
- `mvnw` garantit une entrée de build cohérente d'une machine à l'autre

## Un exemple minimal avec Gradle Kotlin DSL

Voici un `build.gradle.kts` Spring Boot classique. Les versions de plugins doivent correspondre à ce qu'Initializr génère pour la version de Boot choisie :

```kotlin
plugins {
    id("org.springframework.boot") version "your-selected-spring-boot-version"
    id("io.spring.dependency-management") version "version-managed-by-initializr"
    java
}

group = "com.briac"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
```

### Pourquoi cette structure fonctionne bien

- le plugin Spring Boot s'intègre au cycle de build
- la gestion des dépendances reste alignée avec Spring Boot
- la toolchain Java rend la version du JDK explicite
- le wrapper (`gradlew`) standardise la version de Gradle par projet

## Utilisez le wrapper, pas l'outil global

C'est une habitude importante à prendre.

### Maven

Préférez :

```bash
./mvnw spring-boot:run
./mvnw test
./mvnw package
```

Plutôt que :

```bash
mvn spring-boot:run
```

### Gradle

Préférez :

```bash
./gradlew bootRun
./gradlew test
./gradlew build
```

Plutôt que :

```bash
gradle bootRun
```

Le wrapper garantit que chaque développeur et chaque environnement CI utilise bien la version attendue de l'outil.

## Les premières commandes à connaître

### Maven

```bash
./mvnw spring-boot:run
./mvnw test
./mvnw clean package
```

### Gradle

```bash
./gradlew bootRun
./gradlew test
./gradlew clean build
```

Ces commandes suffisent pour couvrir le workflow local de base :

- lancer l'application
- exécuter les tests
- produire un artefact packagé

## Erreurs fréquentes quand on débute

### Ajouter trop de dépendances dès la création du projet

Commencez avec le strict nécessaire. Par exemple, `Spring Web` suffit pour une première API REST.

### Mélanger les versions de JDK

N'utilisez pas une version de Java en local et une autre en CI ou en production sans vérifier la compatibilité.

### Ignorer le wrapper

Si un développeur utilise une autre version de Maven ou Gradle que le reste de l'équipe, le comportement du build peut diverger.

### Ranger le code dans le mauvais package

Si votre classe principale se trouve dans `com.briac.demoapi`, gardez le reste du code applicatif sous cette même racine.

## Recommandation pratique

Pour un premier vrai projet Spring Boot :

1. générez le projet avec Spring Initializr
2. choisissez un packaging `jar`
3. choisissez Java 21 si votre environnement le permet
4. commencez avec `Spring Web`
5. utilisez le wrapper dès le premier jour
6. ajoutez des dépendances seulement lorsqu'un besoin réel apparaît

Cela vous donne une base propre et plus facile à maintenir.

## Ressources officielles recommandées

- [Spring Initializr](https://start.spring.io/)
- [Spring Boot Build Systems](https://docs.spring.io/spring-boot/reference/using/build-systems.html)
- [Spring Boot Getting Started Guide](https://spring.io/guides/gs/spring-boot)
- [Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [Maven Users Centre](https://maven.apache.org/users/)
- [Gradle Installation](https://docs.gradle.org/current/userguide/installation.html)
- [Gradle Wrapper Basics](https://docs.gradle.org/userguide/gradle_wrapper_basics.html)

## Sources

Cet article s'appuie sur la documentation officielle :

- Référence Spring Boot sur les build systems : [docs.spring.io/spring-boot/reference/using/build-systems.html](https://docs.spring.io/spring-boot/reference/using/build-systems.html)
- Guide de démarrage Spring Boot : [spring.io/guides/gs/spring-boot](https://spring.io/guides/gs/spring-boot)
- Spring Initializr : [start.spring.io](https://start.spring.io/)
- Guide de démarrage Maven : [maven.apache.org/guides/getting-started/maven-in-five-minutes.html](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- Centre de documentation Maven : [maven.apache.org/users](https://maven.apache.org/users/)
- Guide d'installation Gradle : [docs.gradle.org/current/userguide/installation.html](https://docs.gradle.org/current/userguide/installation.html)
- Bases du Gradle Wrapper : [docs.gradle.org/userguide/gradle_wrapper_basics.html](https://docs.gradle.org/userguide/gradle_wrapper_basics.html)

## À retenir

L'initialisation du projet n'est pas une simple formalité.

Elle définit :

- la manière dont l'application est construite
- la manière dont les autres développeurs la lancent
- la manière dont les dépendances sont gérées
- la facilité de maintenance du projet dans le temps

Si vous partez avec une structure propre, un outil de build clair et un workflow rigoureux autour du wrapper, toute la suite de la roadmap Spring Boot devient plus simple.
