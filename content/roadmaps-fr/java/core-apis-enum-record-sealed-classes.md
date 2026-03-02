---
title: APIs cœur - Enum, Record, Sealed Classes
description: Apprendre à utiliser enum, record et sealed classes en Java pour modéliser des états finis, des DTO immuables et une hiérarchie contrôlée.
date: 2025-01-02
tags: [java, core-apis, enum, record]
draft: false
readingTime: 14 min
---

## Pourquoi cette étape est importante

Quand un projet grossit, un modèle métier trop souple produit des bugs :

- des états invalides passent dans la logique
- des DTO mutables changent sans contrôle
- des hiérarchies d'héritage deviennent difficiles à maintenir

`enum`, `record` et `sealed` permettent de poser des contraintes fortes dès le design.

---

## `enum` : modéliser des états finis

Utilise `enum` quand la liste des valeurs possibles est fixe et connue.

```java
public enum TicketStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED,
    CLOSED
}
```

C'est plus sûr que des chaînes libres comme `"open"` ou `"closed"` qui peuvent contenir des fautes.

### Enum dans la logique métier

```java
public boolean canClose(TicketStatus status) {
    return status == TicketStatus.RESOLVED || status == TicketStatus.IN_PROGRESS;
}
```

### Enum avec champs et comportement

```java
public enum Plan {
    FREE(5),
    PRO(100),
    ENTERPRISE(Integer.MAX_VALUE);

    private final int maxProjects;

    Plan(int maxProjects) {
        this.maxProjects = maxProjects;
    }

    public int maxProjects() {
        return maxProjects;
    }
}
```

Tu peux associer des métadonnées et des méthodes à chaque valeur.

---

## `record` : transport de données immutable

Les records sont parfaits pour les DTO et modèles de réponse.

```java
public record UserSummary(Long id, String username, String email) {}
```

Java génère automatiquement :

- le constructeur
- les accesseurs (`id()`, `username()`, ...)
- `equals`, `hashCode`, `toString`

### Pourquoi les records sont utiles

- syntaxe concise
- immutabilité par défaut
- moins de boilerplate, donc moins d'erreurs

### Record dans la couche API

```java
public record ErrorResponse(String code, String message) {}

public ErrorResponse toError(String code, String message) {
    return new ErrorResponse(code, message);
}
```

Utilise les records pour le transport de données, pas pour des entités JPA mutables avec cycle de vie complexe.

---

## `sealed` : restreindre l'héritage

Les types `sealed` permettent de contrôler explicitement qui peut hériter/implémenter.

```java
public sealed interface PaymentResult
    permits PaymentSuccess, PaymentFailure {}
```

```java
public record PaymentSuccess(String transactionId) implements PaymentResult {}
public record PaymentFailure(String reason) implements PaymentResult {}
```

Utile quand un domaine ne doit exposer qu'un nombre limité de variantes.

### Pourquoi c'est utile

- empêche des sous-classes arbitraires dans d'autres modules
- rend le modèle explicite
- simplifie la maintenance

---

## Combiner enum + record + sealed

En pratique, on les combine souvent pour un modèle propre.

```java
public enum AlertLevel {
    INFO, WARNING, CRITICAL
}

public sealed interface Alert permits SystemAlert, SecurityAlert {}

public record SystemAlert(AlertLevel level, String message) implements Alert {}
public record SecurityAlert(AlertLevel level, String source, String message) implements Alert {}
```

Le modèle devient :

- fini pour les niveaux (`enum`)
- immutable pour les payloads (`record`)
- contrôlé pour les variantes (`sealed`)

---

## Pattern matching avec sealed (Java moderne)

Avec une hiérarchie `sealed`, `switch` peut être exhaustif et plus sûr.

```java
public String describe(PaymentResult result) {
    return switch (result) {
        case PaymentSuccess s -> "success: " + s.transactionId();
        case PaymentFailure f -> "failure: " + f.reason();
    };
}
```

Le compilateur aide à couvrir toutes les variantes connues.

---

## Erreurs fréquentes à éviter

- utiliser `String` au lieu d'`enum` pour des états finis
- utiliser `record` pour des entités JPA mutables
- créer des hiérarchies `sealed` sans besoin métier réel
- oublier l'impact de versionnement quand on modifie un enum exposé via API

---

## Guide de décision rapide

1. Liste fixe de valeurs ? -> `enum`
2. Objet de transport immutable ? -> `record`
3. Famille de sous-types contrôlée ? -> `sealed`

Le but est de rendre les états invalides impossibles par construction.

---

## À retenir

Pour un modèle métier Java robuste :

1. utiliser `enum` pour les états finis
2. utiliser `record` pour des DTO immuables et compacts
3. utiliser `sealed` pour restreindre l'héritage
4. combiner les trois pour un domaine explicite et fiable
