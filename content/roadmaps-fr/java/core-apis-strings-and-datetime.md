---
title: APIs cœur - Strings et Date/Time
description: Comprendre les bases des String Java, l'immutabilité, l'usage de StringBuilder, et la gestion moderne des dates avec java.time.
date: 2024-12-30
tags: [java, core-apis, strings, datetime]
draft: false
readingTime: 12 min
---

## Pourquoi cette étape est importante

Les chaînes de caractères et les dates sont partout : logs, APIs, règles métier, parsing, reporting.
Une grande partie des bugs subtils en backend Java vient d'une mauvaise gestion de ces deux sujets.

## Bases des String

Un `String` en Java est une séquence de caractères représentée par un objet.

```java
String name = "Briac";
```

Opérations fréquentes :

```java
String email = "briac@example.com";
System.out.println(email.length());         // 17
System.out.println(email.toUpperCase());    // BRIAC@EXAMPLE.COM
System.out.println(email.contains("@"));    // true
```

## Immutabilité des String

En Java, `String` est immutable.
Toute “modification” crée en réalité un nouvel objet.

```java
String base = "Hello";
String updated = base + " World";

System.out.println(base);    // Hello
System.out.println(updated); // Hello World
```

### Pourquoi c'est utile

- partage plus sûr entre threads
- comportement prévisible
- facilité de cache/réutilisation

### Erreur fréquente

Faire beaucoup de concaténations dans des boucles crée beaucoup d'objets intermédiaires.

## `StringBuilder` pour construire des chaînes

Utilise `StringBuilder` quand tu construis du texte étape par étape.

```java
StringBuilder sb = new StringBuilder();
sb.append("User: ").append("briac").append(", role: ").append("admin");

String result = sb.toString();
System.out.println(result);
```

### Exemple en boucle

```java
StringBuilder csv = new StringBuilder();
for (int i = 1; i <= 3; i++) {
    if (i > 1) csv.append(",");
    csv.append(i);
}
System.out.println(csv); // 1,2,3
```

Pour de la construction de texte intensive, `StringBuilder` est généralement le meilleur choix.

## API `java.time` (date/heure moderne)

Évite les anciennes APIs (`java.util.Date`, `Calendar`) dans du code neuf.
Privilégie `java.time` (Java 8+), plus lisible et majoritairement immutable.

Types principaux :

- `LocalDate` -> date seule (`2026-03-02`)
- `LocalTime` -> heure seule (`14:30`)
- `LocalDateTime` -> date + heure, sans timezone
- `Instant` -> timestamp machine en UTC
- `ZonedDateTime` -> date/heure avec timezone
- `Duration` / `Period` -> intervalles temporels

### Utilisation de base

```java
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusWeeks(1);

System.out.println(today);
System.out.println(nextWeek);
```

### Exemple avec timezone

```java
ZonedDateTime parisNow = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
ZonedDateTime nyNow = parisNow.withZoneSameInstant(ZoneId.of("America/New_York"));

System.out.println(parisNow);
System.out.println(nyNow);
```

## Formatting et parsing

Utilise `DateTimeFormatter` pour convertir objets <-> texte.

### Formatting

```java
LocalDate date = LocalDate.of(2026, 3, 2);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

String text = date.format(fmt); // 02/03/2026
System.out.println(text);
```

### Parsing

```java
String input = "02/03/2026";
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

LocalDate parsed = LocalDate.parse(input, fmt);
System.out.println(parsed); // 2026-03-02
```

### Recommandation format ISO

Pour APIs et stockage, préfère les formats ISO :

- `LocalDate` -> `2026-03-02`
- `Instant` -> `2026-03-02T11:45:00Z`

Ça évite les ambiguïtés locales/régionales.

## Règles pratiques en backend

1. Utiliser `StringBuilder` pour les assemblages dynamiques
2. Choisir le type `java.time` selon l'intention (`LocalDate` vs `Instant`)
3. Garder les timestamps internes en UTC autant que possible
4. Convertir la timezone près de la couche d'affichage
5. Utiliser des formatters explicites pour les dates affichées

## Erreurs fréquentes à éviter

- comparer les String avec `==` au lieu de `.equals()`
- utiliser les anciennes APIs de date dans les nouveaux modules
- stocker des heures locales sans contexte timezone en système global
- parser des dates sans format explicite

## Mini exemple

```java
public String buildAuditLine(String userId, Instant when, ZoneId zone) {
    ZonedDateTime zdt = when.atZone(zone);
    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");

    return new StringBuilder()
        .append("user=").append(userId)
        .append(" | at=").append(zdt.format(fmt))
        .toString();
}
```

Cet exemple combine StringBuilder + java.time + formatting dans un cas réaliste.

## À retenir

Pour des APIs cœur robustes en Java :

1. considérer `String` comme immutable et utiliser `StringBuilder` quand nécessaire
2. prendre `java.time` comme base pour les dates/heures
3. formatter/parser explicitement pour éviter les bugs de locale/timezone

Maîtriser cette étape évite beaucoup d'incidents en production.

