---
title: I/O - Files, Paths, NIO.2
description: Apprendre NIO.2 en Java pour lire/ecrire des fichiers, manipuler les chemins, parcourir des repertoires et utiliser les APIs bufferisees.
date: 2025-01-06
tags: [java, io, nio2, files]
draft: false
readingTime: 13 min
---

## Pourquoi cette etape est importante

Les systemes backend lisent et ecrivent en permanence des fichiers : imports, logs, exports, configuration.
NIO.2 (`java.nio.file`) est l'API moderne et sure pour faire cela.

## `Path` et `Files`

Utilise `Path` pour representer un chemin et `Files` pour les operations.

```java
Path report = Path.of("data", "report.txt");
Files.createDirectories(report.getParent());
Files.writeString(report, "hello\n");
String content = Files.readString(report);
```

## Patterns de lecture/ecriture

Pour les petits fichiers :

- `Files.readString(...)`
- `Files.writeString(...)`

Pour les volumes plus grands, utilise des readers/streams bufferises :

```java
try (BufferedReader reader = Files.newBufferedReader(report)) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## Parcours de repertoires

```java
Path root = Path.of("logs");
try (Stream<Path> stream = Files.walk(root)) {
    stream
        .filter(Files::isRegularFile)
        .forEach(System.out::println);
}
```

Utilise `Files.list(...)` pour un seul niveau et `Files.walk(...)` pour du recursif.

## Options utiles

```java
Files.writeString(
    report,
    "new line\n",
    StandardOpenOption.CREATE,
    StandardOpenOption.APPEND
);
```

Options frequentes :

- `CREATE`
- `TRUNCATE_EXISTING`
- `APPEND`

## Gestion d'erreurs et securite

Les operations I/O levent des exceptions verifiees (`IOException`). Il faut gerer les echecs explicitement.

Aussi :

- valider les chemins venant de l'utilisateur
- eviter les vulnerabilities de path traversal
- preferer UTF-8 explicitement si necessaire

## Erreurs frequentes

- oublier le try-with-resources
- charger de tres gros fichiers completement en memoire
- concatener des strings pour les chemins au lieu de `Path.of(...)`
- ecrire sans creer les dossiers parents

## A retenir

1. Utiliser `Path` + `Files` par defaut
2. Choisir les APIs bufferisees pour les gros fichiers
3. Parcourir avec `Files.list`/`Files.walk`
4. Gerer `IOException` et valider les chemins
