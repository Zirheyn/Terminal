---
title: Bases du langage - Variables, Types, Opérateurs
description: Comprendre la déclaration de variables en Java, primitifs vs wrappers, casting et opérateurs arithmétiques/logiques avec des exemples concrets.
date: 2024-12-23
tags: [java, language-basics, types, operators]
draft: false
readingTime: 10 min
---

## Pourquoi cette étape est importante

Beaucoup de bugs en Java débutant viennent d'une mauvaise compréhension des types et des opérateurs.
Si tu maîtrises tôt les variables, les types et les opérations logiques, ton code devient plus fiable et plus facile à relire.

## Variables en Java

Une variable est un conteneur nommé qui stocke une valeur.
En Java, chaque variable possède un type connu à la compilation.

### Déclaration et initialisation

```java
int age = 28;
String name = "Briac";
boolean active = true;
```

Tu peux aussi déclarer puis assigner ensuite :

```java
double price;
price = 19.99;
```

### Variables `final` (constantes)

Utilise `final` quand la valeur ne doit pas changer :

```java
final double VAT_RATE = 0.20;
```

Une variable `final` est assignée une fois et ne peut pas être réaffectée.

## Primitifs vs wrappers

Java possède 8 types primitifs.
Les wrappers sont les versions objet des primitifs, utiles avec les collections, les génériques et les APIs orientées objets.

| Primitif | Wrapper | Usage typique |
|---|---|---|
| `byte` | `Byte` | entiers très petits |
| `short` | `Short` | petits entiers |
| `int` | `Integer` | choix par défaut pour les entiers |
| `long` | `Long` | grands entiers |
| `float` | `Float` | décimaux (moins précis) |
| `double` | `Double` | choix par défaut pour les décimaux |
| `char` | `Character` | caractère Unicode |
| `boolean` | `Boolean` | indicateur vrai/faux |

### Différences clés

- Primitif : plus rapide, pas de null, stocké comme valeur brute
- Wrapper : objet, peut être `null`, utile avec les types génériques (`List<Integer>`)

### Autoboxing et unboxing

Java convertit automatiquement dans certains cas :

```java
Integer boxed = 10;   // autoboxing (int -> Integer)
int unboxed = boxed;  // unboxing (Integer -> int)
```

Attention aux wrappers null :

```java
Integer count = null;
// int n = count; // NullPointerException au runtime
```

## Type casting

Le casting consiste à convertir un type vers un autre.

### Widening cast (implicite, sûr)

D'un type plus petit vers un type plus grand compatible :

```java
int i = 42;
long l = i;      // implicite
double d = l;    // implicite
```

### Narrowing cast (explicite, risque de perte)

D'un type plus grand vers un type plus petit :

```java
double d = 9.75;
int i = (int) d; // 9 (partie décimale perdue)
```

Exemple de dépassement :

```java
int value = 130;
byte b = (byte) value; // -126 (overflow)
```

### Bonne pratique

- Préférer les conversions widening
- Utiliser le narrowing seulement quand c'est volontaire
- Vérifier les bornes avant conversion

## Opérateurs arithmétiques

Principaux opérateurs :

- `+` addition
- `-` soustraction
- `*` multiplication
- `/` division
- `%` modulo

```java
int a = 10;
int b = 3;
System.out.println(a / b); // 3 (division entière)
System.out.println(a % b); // 1
```

Pour une division décimale, utiliser `double` :

```java
double result = 10.0 / 3;
System.out.println(result); // 3.333...
```

### Incrément et décrément

```java
int x = 5;
x++; // x = 6
x--; // x = 5
```

## Opérateurs relationnels et logiques

Les opérateurs relationnels comparent des valeurs :

- `==`, `!=`, `>`, `<`, `>=`, `<=`

Les opérateurs logiques combinent des expressions booléennes :

- `&&` ET
- `||` OU
- `!` NON

```java
int age = 20;
boolean hasTicket = true;

boolean canEnter = age >= 18 && hasTicket;
```

### Short-circuit

`&&` et `||` arrêtent l'évaluation dès que le résultat est connu.
C'est utile pour écrire des vérifications null-safe :

```java
String email = null;
if (email != null && email.contains("@")) {
    System.out.println("Format d'email valide");
}
```

## Erreurs fréquentes à éviter

- Utiliser `==` pour comparer le contenu de `String` (utiliser `.equals()`)
- Oublier le comportement de la division entière
- Faire des castings sans vérifier les bornes
- Unboxer un wrapper nullable

## Mini exemples pratiques

### Exemple 1 : moyenne fiable

```java
double sum = 17;
int count = 4;
double avg = sum / count; // 4.25
```

### Exemple 2 : règle d'éligibilité

```java
int age = 17;
boolean parentalConsent = true;
boolean allowed = age >= 18 || parentalConsent;
```

## À retenir

À ce stade, concentre-toi sur trois règles :

1. Choisir le bon type dès le départ
2. Caster de façon explicite et prudente
3. Garder les conditions booléennes lisibles

Ces bases sont indispensables pour la suite : control flow, méthodes et programmation orientée objet.
