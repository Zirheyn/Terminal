---
title: Installer le JDK et l'IDE
description: Installer un JDK 21+, configurer JAVA_HOME/PATH et choisir un IDE Java efficace.
date: 2024-12-20
tags: [java, setup, jdk, tooling]
draft: false
readingTime: 4 min
---

## Pourquoi cette étape est importante

Avant d'écrire du Java, ton environnement doit être propre et reproductible. Une configuration saine évite les erreurs cachées entre l'environnement local, le CI et la production.

## Installer un JDK 21+

Utilise une distribution LTS (Temurin, Oracle JDK, Corretto ou Zulu). Vérifie l'installation :

```bash
java -version
javac -version
```

Le résultat attendu doit afficher la version `21` (ou plus).

### Liens pour télécharger un JDK

- [Eclipse Temurin JDK 21 (recommandé)](https://adoptium.net/temurin/releases/?version=21)
- [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Amazon Corretto 21](https://aws.amazon.com/corretto/)
- [Azul Zulu JDK 21](https://www.azul.com/downloads/?version=java-21-lts&package=jdk)
- [Microsoft Build of OpenJDK](https://learn.microsoft.com/java/openjdk/download)

## Configurer `JAVA_HOME` et `PATH`

Ces variables doivent être configurées pour que le terminal, l'IDE, Maven et Gradle utilisent le même JDK.

### macOS (zsh)

```bash
# ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH="$JAVA_HOME/bin:$PATH"
```

Applique les changements :

```bash
source ~/.zshrc
```

### Linux

```bash
# ~/.bashrc ou ~/.zshrc
export JAVA_HOME=/chemin/vers/jdk-21
export PATH="$JAVA_HOME/bin:$PATH"
```

### Windows (PowerShell)

Configure les variables dans les paramètres système :

- `JAVA_HOME=C:\Program Files\Java\jdk-21`
- Ajoute `%JAVA_HOME%\bin` à `Path`

Puis rouvre le terminal et vérifie :

```bash
java -version
```

## Utiliser IntelliJ ou VS Code

Choisis un IDE et configure-le correctement.

### Recommandation

Pour les projets Java, je recommande **IntelliJ IDEA** plutôt que VS Code pour une expérience de développement plus complète et plus fiable.

### IntelliJ IDEA

- Télécharger : [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
- Définit le SDK projet sur JDK 21+
- Active l'auto-import Maven/Gradle
- Installe les plugins Java et Spring si nécessaire

### Vidéo de configuration IntelliJ

<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/H_XxH66lm3U"
  title="Tutoriel de configuration IntelliJ IDEA"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

### VS Code

- Télécharger : [Visual Studio Code](https://code.visualstudio.com/Download)
- Installe `Extension Pack for Java`
- Installe `Language Support for Java(TM) by Red Hat`
- Définit le runtime Java par défaut sur ton JDK 21+

## Checklist de validation rapide

- `java -version` et `javac -version` retournent 21+
- `JAVA_HOME` pointe vers le bon JDK
- Le SDK du projet dans l'IDE est le même JDK
- Un `HelloWorld` compile et s'exécute

Avec cette base, tu peux enchaîner sur les prochaines étapes de la roadmap Java.
