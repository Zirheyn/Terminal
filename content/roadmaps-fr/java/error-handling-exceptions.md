---
title: Gestion d'erreurs - Exceptions
description: Comprendre le fonctionnement des exceptions Java avec checked vs unchecked, try/catch/finally et la création d'exceptions custom.
date: 2024-12-29
tags: [java, error-handling, exceptions]
draft: false
readingTime: 12 min
---

## Pourquoi la gestion d'erreurs est essentielle

En production, les erreurs sont normales : appel réseau indisponible, entrée invalide, fichier introuvable.
La gestion d'exceptions en Java permet de modéliser, propager et contrôler ces erreurs.

Une bonne gestion d'erreurs évite les bugs silencieux et accélère le diagnostic.

## Qu'est-ce qu'une exception

Une exception est un objet qui représente une erreur et interrompt le flux normal.

```java
int result = 10 / 0; // lance ArithmeticException
```

Si elle n'est pas gérée, l'exception remonte la pile d'appels.

## Checked vs unchecked exceptions

### Checked exceptions

Les checked exceptions doivent être gérées ou déclarées via `throws`.
Elles représentent souvent des erreurs externes potentiellement récupérables.

Exemples :

- `IOException`
- `SQLException`

```java
public String readConfig(Path path) throws IOException {
    return Files.readString(path);
}
```

### Unchecked exceptions

Les unchecked exceptions héritent de `RuntimeException`.
Elles signalent souvent des erreurs de programmation ou des entrées invalides.

Exemples :

- `NullPointerException`
- `IllegalArgumentException`
- `IllegalStateException`

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age must be >= 0");
    }
}
```

### Règle rapide

- checked : l'appelant peut raisonnablement récupérer
- unchecked : précondition violée ou état invalide

## Exception runtime vs non-runtime (différence claire)

En Java, on parle souvent de "runtime exception" vs "non-runtime exception" :

- **Runtime exception** = exception unchecked (`RuntimeException` et ses sous-classes)
- **Non-runtime exception** = exception checked (sous-classes de `Exception` qui ne sont pas des `RuntimeException`)

### Différence pratique principale

| Type | Contrainte compilateur | Intention typique |
|---|---|---|
| Runtime (unchecked) | Pas d'obligation de `try/catch` ni de `throws` | Erreur de programmation, état invalide, mauvaise utilisation API |
| Non-runtime (checked) | Obligation de `catch` ou de déclaration `throws` | Erreur externe attendue et potentiellement récupérable |

### Exemple

```java
// checked (non-runtime) : le compilateur impose la gestion
Files.readString(Path.of("missing.txt")); // IOException à gérer ou déclarer

// unchecked (runtime) : compile, mais peut échouer au runtime
Integer.parseInt("abc"); // NumberFormatException au runtime
```

## `try`, `catch`, `finally`

### Utilisation de base

```java
try {
    int value = Integer.parseInt("42");
    System.out.println(value);
} catch (NumberFormatException e) {
    System.out.println("Invalid number format");
}
```

### Plusieurs blocs catch

```java
try {
    // opérations à risque
} catch (IOException e) {
    System.out.println("I/O issue: " + e.getMessage());
} catch (IllegalArgumentException e) {
    System.out.println("Bad argument: " + e.getMessage());
}
```

### `finally`

Le bloc `finally` s'exécute qu'il y ait exception ou non.
Utile pour nettoyer les ressources.

```java
InputStream in = null;
try {
    in = Files.newInputStream(Path.of("config.txt"));
    // lecture
} catch (IOException e) {
    System.out.println("Read error");
} finally {
    if (in != null) {
        try { in.close(); } catch (IOException ignored) {}
    }
}
```

### Préférer try-with-resources

En Java moderne, privilégie try-with-resources :

```java
try (InputStream in = Files.newInputStream(Path.of("config.txt"))) {
    // lecture sécurisée
} catch (IOException e) {
    System.out.println("Read error");
}
```

## Lancer et relancer des exceptions

### Lancer une exception

```java
if (token == null || token.isBlank()) {
    throw new IllegalArgumentException("Token is required");
}
```

### Enrichir une exception basse couche

```java
public User loadUser(String id) {
    try {
        return repository.findById(id);
    } catch (SQLException e) {
        throw new RuntimeException("Failed to load user with id=" + id, e);
    }
}
```

On conserve la cause (`e`) tout en ajoutant du contexte métier.

## Exceptions custom

Créer ses propres exceptions rend les erreurs métier explicites.

### Exemple custom unchecked

```java
public class DomainValidationException extends RuntimeException {
    public DomainValidationException(String message) {
        super(message);
    }
}
```

Usage :

```java
if (amount <= 0) {
    throw new DomainValidationException("Amount must be positive");
}
```

### Exemple custom checked

```java
public class ExternalServiceException extends Exception {
    public ExternalServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

Utilise ce type quand l'appelant doit gérer explicitement la récupération.

## Bonnes pratiques

1. Échouer vite sur entrée invalide (`IllegalArgumentException`)
2. Attraper les exceptions aux bonnes frontières (API/service), pas partout
3. Conserver la cause lors d'un rethrow
4. Utiliser des types d'exception précis plutôt que `Exception`
5. Éviter les catch vides
6. Logger une seule fois au bon niveau

## Erreurs fréquentes

- attraper `Exception` trop tôt et masquer la cause réelle
- utiliser les exceptions pour piloter le flux nominal
- perdre la stack trace au rethrow
- exposer des erreurs techniques brutes aux utilisateurs

## Mini exemple pratique

```java
public String parsePort(String value) {
    try {
        int port = Integer.parseInt(value);
        if (port < 1 || port > 65535) {
            throw new IllegalArgumentException("Port out of range");
        }
        return "Port is valid: " + port;
    } catch (NumberFormatException e) {
        throw new IllegalArgumentException("Port must be numeric", e);
    }
}
```

Ce pattern valide les entrées et renvoie des erreurs métier explicites.

## À retenir

Pour une gestion d'erreurs Java robuste :

1. comprendre l'intention checked vs unchecked
2. utiliser correctement `try/catch/finally` (ou try-with-resources)
3. modéliser les erreurs métier avec des exceptions custom
4. garder des messages d'erreur actionnables et contextualisés

Ces bases sont indispensables pour des services Java prêts pour la production.
