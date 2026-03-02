---
title: APIs cœur - Génériques
description: Comprendre les génériques Java avec paramètres de type, wildcards extends/super et méthodes génériques pour un code plus sûr et réutilisable.
date: 2025-01-01
tags: [java, core-apis, generics, type-safety]
draft: false
readingTime: 14 min
---

## Pourquoi cette étape est importante

Les génériques sont l'un des outils les plus importants de Java pour écrire du code sûr et réutilisable.
Sans génériques, les collections et APIs utilisent `Object`, ce qui crée des erreurs de cast à l'exécution.
Avec les génériques, les erreurs sont détectées dès la compilation.

---

## Le problème que résolvent les génériques

Avant les génériques, on pouvait mettre n'importe quoi dans une liste :

```java
List raw = new ArrayList();
raw.add("hello");
raw.add(42);
```

Ça compile, mais les erreurs de type arrivent plus tard à la lecture.

Avec les génériques :

```java
List<String> names = new ArrayList<>();
names.add("briac");
// names.add(42); // erreur de compilation
```

Java impose alors le type attendu.

---

## Paramètres de type

Un paramètre de type est un type “placeholder” (`T`, `E`, `K`, `V`) défini sur des classes, interfaces ou méthodes.

Conventions courantes :

- `T` -> type générique
- `E` -> type d'élément (collections)
- `K`, `V` -> clé/valeur pour les maps

Exemple avec une classe générique :

```java
public class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
```

Utilisation :

```java
Box<String> textBox = new Box<>();
textBox.set("hello");
String value = textBox.get();
```

---

## Paramètres bornés

Parfois, il faut limiter les types autorisés.

```java
public class NumberBox<T extends Number> {
    private T value;

    public NumberBox(T value) {
        this.value = value;
    }

    public double toDouble() {
        return value.doubleValue();
    }
}
```

`T extends Number` signifie que seuls les types numériques sont permis (`Integer`, `Double`, etc.).

---

## Wildcards : `? extends` et `? super`

Les wildcards rendent les APIs flexibles quand les types exacts diffèrent.

### `? extends T` (producteur)

À utiliser quand on lit des valeurs en `T`.

```java
public static double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number n : numbers) {
        total += n.doubleValue();
    }
    return total;
}
```

On peut passer `List<Integer>`, `List<Double>`, etc.
Mais on ne peut en général pas ajouter de nouvelles valeurs (sauf `null`), car le sous-type concret est inconnu.

### `? super T` (consommateur)

À utiliser quand on écrit des valeurs de type `T`.

```java
public static void addDefaults(List<? super Integer> target) {
    target.add(0);
    target.add(1);
}
```

On peut passer `List<Integer>`, `List<Number>` ou `List<Object>`.

### Règle rapide : PECS

- Producer -> `extends`
- Consumer -> `super`

---

## Méthodes génériques

Une méthode peut définir ses propres paramètres de type, indépendamment de la classe.

```java
public static <T> T first(List<T> list) {
    if (list == null || list.isEmpty()) {
        throw new IllegalArgumentException("list is empty");
    }
    return list.get(0);
}
```

Utilisation :

```java
String firstName = first(List.of("alice", "bob"));
Integer firstNumber = first(List.of(10, 20));
```

On peut aussi borner les méthodes génériques :

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
```

---

## Et l'effacement de type (type erasure) ?

Les génériques Java utilisent l'effacement de type :

- les infos de type sont en grande partie supprimées à l'exécution
- `List<String>` et `List<Integer>` sont toutes deux `List` au runtime

Conséquences pratiques :

- impossible de faire `new T()`
- impossible d'utiliser `instanceof List<String>`
- quand il faut le type runtime, passer `Class<T>`

Exemple :

```java
public static <T> T create(Class<T> type) throws Exception {
    return type.getDeclaredConstructor().newInstance();
}
```

---

## Erreurs fréquentes à éviter

- utiliser des types bruts (`List` au lieu de `List<String>`)
- sur-utiliser `<?>` et perdre les informations de type utiles
- confondre `List<Number>` et `List<Integer>` (pas de relation parent/enfant)
- forcer des casts non sûrs qui annulent le bénéfice des génériques

---

## Mini exemple backend

```java
public record ApiResponse<T>(boolean success, T data, String error) {}

public static <T> ApiResponse<T> ok(T data) {
    return new ApiResponse<>(true, data, null);
}

public static <T> ApiResponse<T> fail(String message) {
    return new ApiResponse<>(false, null, message);
}
```

Utilisation :

```java
ApiResponse<String> r1 = ok("created");
ApiResponse<Integer> r2 = ok(201);
ApiResponse<Void> r3 = fail("invalid token");
```

Un seul modèle, fortement typé pour plusieurs formats de payload.

---

## À retenir

Pour bien utiliser les génériques Java :

1. utiliser les paramètres de type pour la sûreté à la compilation
2. appliquer des bornes quand l'API impose des contraintes
3. utiliser `? extends` et `? super` avec la logique PECS
4. utiliser les méthodes génériques pour rendre les utilitaires réutilisables
5. éviter les types bruts et les casts non sûrs
