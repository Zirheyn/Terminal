---
title: POO - Interfaces et classes abstraites
description: Comprendre le design contract-first en Java, distinguer interface vs classe abstraite, et appliquer composition over inheritance avec des exemples concrets.
date: 2024-12-28
tags: [java, oop, interfaces, classes-abstraites, composition]
draft: false
readingTime: 13 min
---

## Pourquoi cette étape est importante

Quand un projet grossit, coder directement sur des classes concrètes rend le système rigide.
Les interfaces et classes abstraites permettent de faire évoluer les implémentations sans casser le code métier.

## Design contract-first

Le design contract-first consiste à définir **ce qu'un composant doit faire** avant d'implémenter **comment il le fait**.

En Java, ce contrat est souvent porté par une interface.

```java
public interface PaymentGateway {
    void charge(String customerId, double amount);
}
```

Toute implémentation doit fournir `charge`.
Le code métier dépend du contrat `PaymentGateway`, pas d'un fournisseur précis.

## Interfaces

Les interfaces définissent des capacités et des contrats.
Elles sont idéales quand des classes différentes doivent respecter la même API.

```java
public interface NotificationSender {
    void send(String to, String message);
}

public class EmailSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("Email to " + to + ": " + message);
    }
}

public class SmsSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("SMS to " + to + ": " + message);
    }
}
```

Le code client peut cibler l'interface et changer l'implémentation facilement.

## Classes abstraites

Une classe abstraite est utile quand tu veux :

- partager un état commun
- partager une implémentation commune
- imposer certaines méthodes aux sous-classes

```java
public abstract class BaseReportExporter {
    protected final String format;

    protected BaseReportExporter(String format) {
        this.format = format;
    }

    public final void export(String data) {
        validate(data);
        write(data);
    }

    protected void validate(String data) {
        if (data == null || data.isBlank()) {
            throw new IllegalArgumentException("Data is required");
        }
    }

    protected abstract void write(String data);
}

public class PdfExporter extends BaseReportExporter {
    public PdfExporter() {
        super("pdf");
    }

    @Override
    protected void write(String data) {
        System.out.println("Writing PDF: " + data);
    }
}
```

Ce pattern combine logique réutilisable (`export`, `validate`) et spécialisation (`write`).

## Interface vs classe abstraite : guide rapide

Utilise une **interface** quand :

- tu veux un contrat de comportement
- les implémentations peuvent être très différentes
- tu veux réduire le couplage

Utilise une **classe abstraite** quand :

- les sous-classes partagent état et logique
- tu veux fournir un comportement partiel par défaut
- la hiérarchie métier est justifiée

Dans la pratique, on combine souvent les deux.

## Méthodes default et static dans les interfaces

Les interfaces Java modernes peuvent contenir des méthodes `default` et `static`.

### Méthode default

Elle fournit un comportement optionnel que les implémentations peuvent redéfinir.

```java
public interface AuditLogger {
    void log(String message);

    default void logError(String message, Throwable error) {
        log("[ERROR] " + message + " - " + error.getMessage());
    }
}
```

### Méthode static

C'est une méthode utilitaire liée au type interface.

```java
public interface AuditLogger {
    static String sanitize(String value) {
        return value == null ? "" : value.trim();
    }
}
```

Appel :

```java
String clean = AuditLogger.sanitize("  hello  ");
```

## Composition over inheritance

La composition consiste à assembler des comportements via des objets collaboratifs, plutôt que d'étendre des hiérarchies profondes.

### Pourquoi la composition est souvent préférable

- plus facile de remplacer un comportement
- moins fragile qu'un arbre d'héritage profond
- responsabilités plus lisibles

### Exemple avec une stratégie injectée

```java
public interface TaxPolicy {
    double apply(double amount);
}

public class FlatTaxPolicy implements TaxPolicy {
    @Override
    public double apply(double amount) {
        return amount * 1.20;
    }
}

public class CheckoutService {
    private final TaxPolicy taxPolicy;

    public CheckoutService(TaxPolicy taxPolicy) {
        this.taxPolicy = taxPolicy;
    }

    public double total(double subtotal) {
        return taxPolicy.apply(subtotal);
    }
}
```

Tu peux injecter une autre `TaxPolicy` sans modifier `CheckoutService`.

## Erreurs fréquentes à éviter

- partir sur une classe abstraite alors qu'une interface suffit
- mettre trop de logique dans les méthodes default
- mélanger héritage et composition sans intention claire
- exposer des détails d'implémentation dans les contrats

## À retenir

Pour un design OOP robuste :

1. partir des contrats (interfaces)
2. utiliser les classes abstraites seulement quand un socle commun est réel
3. privilégier la composition pour assembler les comportements
4. garder des implémentations remplaçables et faciles à tester

Ces principes sont essentiels pour une architecture Java propre et évolutive.

