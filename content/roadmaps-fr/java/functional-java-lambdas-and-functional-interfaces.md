---
title: Java fonctionnel - Lambdas et interfaces fonctionnelles
description: Comprendre les lambdas Java, les interfaces fonctionnelles standard, les références de méthodes et le style higher-order avec des exemples backend.
date: 2025-01-03
tags: [java, functional, lambdas, interfaces]
draft: false
readingTime: 15 min
---

## Pourquoi cette étape est importante

Le backend Java moderne utilise le style fonctionnel partout :

- traitement de collections
- pipelines de validation
- callbacks et stratégies injectables
- APIs asynchrones composables

Quand tu maîtrises lambdas et interfaces fonctionnelles, ton code devient plus court, plus lisible et plus composable.

## Qu'est-ce qu'une lambda ?

Une lambda est une fonction anonyme : un petit comportement transmis comme une valeur.

```java
(x, y) -> x + y
```

Cette expression veut dire : "prendre deux paramètres et retourner leur somme."

## Anatomie d'une lambda

Une lambda a trois parties :

1. des paramètres
2. la flèche `->`
3. un corps (expression ou bloc)

Exemples :

```java
name -> name.trim()
(a, b) -> a + b
() -> "ready"
```

Pour une logique sur plusieurs lignes, utilise un corps en bloc :

```java
text -> {
    String normalized = text.trim().toLowerCase();
    return normalized;
}
```

## Inférence de type (target typing)

Une lambda n'a pas de type autonome.
Son type est déduit par le contexte cible (en général une interface fonctionnelle).

```java
Predicate<String> valid = s -> s.contains("@");
Comparator<Integer> asc = (a, b) -> Integer.compare(a, b);
```

La même forme de lambda peut donc représenter des contrats différents selon le contexte.

## Capture de variables et règle `effectively final`

Une lambda peut capturer des variables locales du scope externe, seulement si elles sont effectively final.

```java
int minLength = 3;
Predicate<String> longEnough = s -> s.length() >= minLength;
```

Ça fonctionne car `minLength` n'est pas modifiée ensuite.
Si tu la réassignes plus tard, la compilation échoue.

## Lambda vs classe anonyme

Avant les lambdas, on écrivait souvent des classes anonymes pour porter du comportement.

```java
Comparator<String> c1 = new Comparator<>() {
    @Override
    public int compare(String a, String b) {
        return a.compareToIgnoreCase(b);
    }
};

Comparator<String> c2 = (a, b) -> a.compareToIgnoreCase(b);
```

Les deux approches sont valides, mais les lambdas sont plus courtes et plus lisibles pour les comportements simples.

## Base des interfaces fonctionnelles

Une interface fonctionnelle contient exactement une méthode abstraite.

```java
@FunctionalInterface
public interface Formatter {
    String format(String input);
}
```

On peut l'implémenter avec une lambda :

```java
Formatter trimUpper = text -> text.trim().toUpperCase();
System.out.println(trimUpper.format("  briac  ")); // BRIAC
```

`@FunctionalInterface` est optionnelle mais recommandée. Elle évite d'ajouter par erreur une deuxième méthode abstraite.

## Interfaces fonctionnelles standard

Java fournit les principales dans `java.util.function`.

### `Predicate<T>` (test -> boolean)

```java
Predicate<String> hasAt = s -> s.contains("@");
System.out.println(hasAt.test("a@b.com")); // true
```

### `Function<T, R>` (transformer une entrée en sortie)

```java
Function<String, Integer> lengthFn = String::length;
System.out.println(lengthFn.apply("hello")); // 5
```

### `Consumer<T>` (consommer une valeur, sans retour)

```java
Consumer<String> log = s -> System.out.println("LOG: " + s);
log.accept("user created");
```

### `Supplier<T>` (produire une valeur, sans entrée)

```java
Supplier<Long> now = System::currentTimeMillis;
System.out.println(now.get());
```

## Références de méthodes

Les références de méthodes sont une forme compacte quand une lambda appelle seulement une méthode.

Exemples :

```java
Function<String, Integer> f1 = s -> s.length();
Function<String, Integer> f2 = String::length; // même comportement
```

Formes courantes :

- `ClassName::staticMethod`
- `instance::instanceMethod`
- `ClassName::instanceMethod` (premier argument comme receveur)
- `ClassName::new` (référence de constructeur)

Exemple constructeur :

```java
Supplier<List<String>> listFactory = ArrayList::new;
List<String> list = listFactory.get();
```

## Style higher-order en Java

Une méthode higher-order prend des fonctions en paramètre ou renvoie une fonction.

```java
public static List<String> filterAndMap(
    List<String> values,
    Predicate<String> predicate,
    Function<String, String> mapper
) {
    List<String> out = new ArrayList<>();
    for (String v : values) {
        if (predicate.test(v)) {
            out.add(mapper.apply(v));
        }
    }
    return out;
}
```

Utilisation :

```java
List<String> input = List.of(" api ", "db", " cache ");
List<String> result = filterAndMap(
    input,
    s -> s.trim().length() >= 3,
    s -> s.trim().toUpperCase()
);
System.out.println(result); // [API, CACHE]
```

Ce pattern revient souvent dans du code utilitaire réutilisable.

## Exemples backend concrets

### Injection de règle de validation

```java
public boolean validateToken(String token, Predicate<String> customRule) {
    return token != null && !token.isBlank() && customRule.test(token);
}
```

```java
boolean ok = validateToken("abc-123", t -> t.startsWith("abc-"));
```

### Callback de post-traitement

```java
public void processUser(String username, Consumer<String> onSuccess) {
    // logique métier...
    onSuccess.accept(username);
}
```

```java
processUser("briac", u -> System.out.println("processed: " + u));
```

## Erreurs fréquentes à éviter

- écrire des lambdas trop longues qui masquent l'intention
- forcer le style fonctionnel quand l'impératif est plus clair
- capturer un état externe mutable dans des lambdas
- créer des interfaces custom alors qu'une interface standard suffit

## Règles de lisibilité

1. Garder les lambdas courtes
2. Préférer les références de méthode quand c'est évident
3. Nommer les fonctions par comportement (`isValid`, `toDto`, `onError`)
4. Extraire la logique complexe dans des méthodes nommées

## Mini pattern d'entraînement

Avec une liste d'emails :

- garder seulement les emails valides
- normaliser en minuscules
- envoyer chaque valeur dans un consumer

```java
List<String> emails = List.of("A@EXAMPLE.COM", "invalid", "b@site.org");

Predicate<String> isEmail = e -> e.contains("@");
Function<String, String> normalize = String::toLowerCase;
Consumer<String> sink = e -> System.out.println("send: " + e);

for (String email : emails) {
    if (isEmail.test(email)) {
        sink.accept(normalize.apply(email));
    }
}
```

## À retenir

Pour de bonnes bases en Java fonctionnel :

1. maîtriser les lambdas comme valeurs de comportement
2. utiliser les interfaces standard (`Predicate`, `Function`, `Consumer`, `Supplier`)
3. appliquer les références de méthode pour gagner en lisibilité
4. utiliser le style higher-order quand il améliore la réutilisation et la clarté
