---
title: Build Tooling - Maven ou Gradle
description: Comprendre les fondamentaux Maven/Gradle, les scopes de dependances, le cycle de build, les plugins et les profils d'environnement.
date: 2025-01-10
tags: [java, build, maven, gradle]
draft: false
readingTime: 13 min
---

## Pourquoi cette etape est importante

Un projet backend n'est pas seulement du code : il faut des builds reproductibles, une gestion des dependances et des configurations par environnement.

## Maven vs Gradle

- Maven : convention-first, XML (`pom.xml`), cycle de vie predictible
- Gradle : DSL flexible (`build.gradle`), forte capacite de personnalisation

Les deux sont adaptes a la production. Choisis-en un et maitrise-le en profondeur.

## Comparaison detaillee : ecosysteme, versions, open source

### Modele open source

- Maven est un projet Apache Software Foundation (licence Apache 2.0)
- Le coeur de Gradle est open source (licence Apache 2.0), maintenu par Gradle Inc et la communaute

Les deux sont tres utilises en entreprise et adaptes aux projets open source.

### Style de configuration

- Maven utilise un XML declaratif (`pom.xml`), tres explicite et standardise
- Gradle utilise un DSL programmable (Groovy ou Kotlin), plus expressif et dynamique

Maven est souvent plus verbeux. Gradle peut etre plus compact, mais plus facile a complexifier si les scripts deviennent trop custom.

### Versions et upgrades

- Les deux outils publient des versions regulieres et supportent le pinning via wrapper
- Les projets Maven restent souvent longtemps stables avec des upgrades plus conservateurs
- Gradle evolue rapidement sur les aspects performance (incremental build, cache, optimisations de configuration)

Toujours figer la version de l'outil via les wrappers :

- `mvnw` + `.mvn/wrapper/*`
- `gradlew` + `gradle/wrapper/*`

### Profil de performance

- Maven : execution tres predictable, suffisante pour beaucoup de projets petits/moyens
- Gradle : souvent plus rapide sur gros projets multi-modules grace a l'incremental et au build cache

Sur de gros monorepos, Gradle offre souvent plus de leviers d'optimisation.

### Courbe d'apprentissage et impact equipe

- Maven est en general plus simple pour debuter : conventions + cycle standard faciles a suivre
- Gradle a une courbe plus elevee, mais donne plus de flexibilite pour les builds complexes

En equipe, la coherence de pratiques est plus importante que le choix de l'outil.

### Guide de choix pratique

Choisis Maven si :

- tu veux des conventions strictes et un comportement stable
- ton equipe prefere une configuration explicite
- ta logique de build reste simple

Choisis Gradle si :

- tu as besoin de personnalisation avancee du build
- tu geres de gros multi-modules et veux des optimisations poussees
- ton equipe est a l'aise avec un DSL de build

## Exemples concrets Maven vs Gradle

### 1) Ajouter une dependance (exemple: logging)

Maven (`pom.xml`) :

```xml
<dependencies>
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.16</version>
  </dependency>
</dependencies>
```

Gradle (`build.gradle`) :

```groovy
dependencies {
  implementation 'org.slf4j:slf4j-api:2.0.16'
}
```

Ici, meme objectif, syntaxe differente : XML declaratif vs DSL.

### 2) Dependance de test uniquement

Maven :

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <scope>test</scope>
</dependency>
```

Gradle :

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter'
}
```

Equivalent conceptuel :

- Maven `scope=test`
- Gradle `testImplementation`

### 3) Plugin de build (packaging executable)

Maven :

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-shade-plugin</artifactId>
      <version>3.5.3</version>
    </plugin>
  </plugins>
</build>
```

Gradle :

```groovy
plugins {
  id 'java'
  id 'application'
}
```

### 4) Variantes d'environnement (local, staging, production)

Maven (profil):

```xml
<profiles>
  <profile>
    <id>staging</id>
    <properties>
      <app.env>staging</app.env>
    </properties>
  </profile>
</profiles>
```

Execution:

```bash
./mvnw clean package -Pstaging
```

Gradle (property de projet):

```bash
./gradlew clean build -Penv=staging
```

Puis dans `build.gradle`, tu peux lire `project.findProperty("env")` pour adapter le comportement de build.

### 5) Version de l'outil figee avec wrapper

Maven:

```bash
./mvnw -v
```

Gradle:

```bash
./gradlew -v
```

Dans les deux cas, la version utilisee est celle du wrapper committe dans le repo, pas celle de la machine.

## Scopes de dependances (terminologie Maven)

- `compile` : necessaire partout
- `provided` : disponible dans le conteneur runtime, non package
- `runtime` : necessaire uniquement a l'execution
- `test` : uniquement pour les tests

Un mauvais scope peut alourdir l'artefact ou casser le runtime.

## Cycle de build et plugins

Phases principales du cycle Maven :

- `validate`
- `compile`
- `test`
- `package`
- `verify`
- `install`

Les plugins ajoutent la logique aux phases (compiler, surefire, jar/shade, etc.).

## Profils (environnements)

Les profils permettent des variantes de build par environnement.
Cibles classiques :

- local
- staging
- production

Au runtime, le choix d'environnement est generalement pilote par des variables d'environnement ou un flag de config applicative.

## Commandes minimales

```bash
mvn clean test
mvn clean package
```

Ou avec le wrapper (recommande) :

```bash
./mvnw clean package
```

## Erreurs frequentes

- versionner des artefacts generes
- conflits de versions de dependances non maitrises
- complexite excessive des profils
- dependre de la machine locale au lieu du wrapper

## A retenir

1. Standardiser les commandes de build pour l'equipe et la CI
2. Utiliser les scopes de dependances avec intention
3. Garder plugins/profils clairs et simples
4. Preferer les wrappers (`mvnw` / `gradlew`) pour la reproductibilite
