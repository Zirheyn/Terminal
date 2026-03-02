---
title: APIs cœur - Fondamentaux des collections
description: Comprendre List, Set et Map en Java, quand utiliser chaque structure, et les bases de complexité Big-O utiles en pratique.
date: 2024-12-31
tags: [java, core-apis, collections, structures]
draft: false
readingTime: 13 min
---

## Pourquoi cette étape est importante

La majorité des fonctionnalités backend manipulent des structures en mémoire :

- stocker des résultats venant de la base
- dédupliquer des valeurs
- regrouper des données métier
- indexer des données pour des recherches rapides

Si tu choisis mal ta collection, ton code peut fonctionner mais devenir lent, coûteux en mémoire, ou fragile à l'échelle.

## Modèle mental : List vs Set vs Map

Pars toujours du besoin métier :

- `List<E>` : séquence ordonnée, doublons autorisés
- `Set<E>` : éléments uniques, pas de doublons
- `Map<K, V>` : association clé -> valeur

## `List` : collection ordonnée

Utilise une liste quand :

- l'ordre est important
- les doublons sont acceptés
- l'accès par index est utile

```java
List<String> tasks = new ArrayList<>();
tasks.add("scan");
tasks.add("audit");
tasks.add("scan"); // doublon autorisé

System.out.println(tasks.get(0)); // scan
```

### Implémentations courantes

- `ArrayList` : meilleur défaut dans la plupart des cas, accès index rapide
- `LinkedList` : utile pour insertions/suppressions fréquentes aux extrémités, moins fréquent en code applicatif moderne

## `Set` : priorité à l'unicité

Utilise un set quand :

- tu dois éviter les doublons
- tu fais beaucoup de vérifications de présence (`contains`)

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("security");
tags.add("java"); // ignoré

System.out.println(tags.size()); // 2
```

### Implémentations courantes

- `HashSet` : plus rapide pour vérification d'unicité
- `LinkedHashSet` : conserve l'ordre d'insertion
- `TreeSet` : set trié (ordre naturel ou comparateur)

## `Map` : recherche clé/valeur

Utilise une map quand :

- tu récupères une valeur à partir d'une clé
- tu veux des compteurs, index, tables de lookup

```java
Map<String, Integer> requestsByRegion = new HashMap<>();
requestsByRegion.put("eu-west-1", 120);
requestsByRegion.put("us-east-1", 180);

int eu = requestsByRegion.getOrDefault("eu-west-1", 0);
System.out.println(eu); // 120
```

### Implémentations courantes

- `HashMap` : défaut pour accès rapide par clé
- `LinkedHashMap` : conserve l'ordre d'insertion
- `TreeMap` : trié par clé

## Bases Big-O (vision pratique)

Big-O décrit comment le coût d'une opération évolue avec la taille des données.
Pas besoin de théorie avancée au quotidien, mais il faut connaître les ordres de grandeur principaux.

### Complexités typiques

Pour `ArrayList` :

- ajout en fin (`add`) : amorti `O(1)`
- accès index (`get(i)`) : `O(1)`
- insertion/suppression au milieu : `O(n)` (décalage des éléments)

Pour `HashSet` / `HashMap` :

- `add`, `contains`, `get`, `put` : en moyenne `O(1)`, pire cas `O(n)`

Pour `TreeSet` / `TreeMap` :

- ajout/recherche/suppression : `O(log n)`

## Choisir rapidement la bonne collection

Règle rapide :

1. Besoin d'ordre + doublons ? -> `ArrayList`
2. Besoin d'unicité ? -> `HashSet`
3. Besoin clé/valeur ? -> `HashMap`
4. Besoin de tri ? -> `TreeSet` / `TreeMap`
5. Besoin d'ordre d'insertion stable ? -> `LinkedHashSet` / `LinkedHashMap`

## Erreurs fréquentes à éviter

- utiliser `List.contains()` pour de gros volumes avec vérifications fréquentes
- oublier `equals()` et `hashCode()` sur des objets personnalisés dans `Set`/`Map`
- sur-utiliser `TreeMap`/`TreeSet` alors que le tri n'est pas nécessaire
- utiliser des types bruts au lieu des génériques (`List` au lieu de `List<String>`)

## Rappel `equals` / `hashCode`

Pour les collections basées sur hash, Java utilise d'abord `hashCode()`, puis `equals()` pour confirmer l'unicité.
Si ces méthodes sont mal implémentées, tu obtiens des doublons ou des bugs de lookup.

```java
public class UserKey {
    private final String email;

    public UserKey(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserKey)) return false;
        UserKey other = (UserKey) o;
        return Objects.equals(email, other.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}
```

## Mini exemple backend

```java
public record EndpointMetric(String endpoint, int latencyMs) {}

List<EndpointMetric> metrics = List.of(
    new EndpointMetric("/login", 120),
    new EndpointMetric("/login", 95),
    new EndpointMetric("/search", 220)
);

Set<String> uniqueEndpoints = new HashSet<>();
Map<String, Integer> maxLatencyByEndpoint = new HashMap<>();

for (EndpointMetric metric : metrics) {
    uniqueEndpoints.add(metric.endpoint());
    maxLatencyByEndpoint.merge(metric.endpoint(), metric.latencyMs(), Math::max);
}

System.out.println(uniqueEndpoints);       // [/login, /search]
System.out.println(maxLatencyByEndpoint);  // {/login=120, /search=220}
```

Une seule boucle combine :

- une `List` comme source
- un `Set` pour la déduplication
- une `Map` pour l'agrégation indexée

## À retenir

Pour bien utiliser les collections Java :

1. choisir selon l'intention (`ordre`, `unicité`, `lookup par clé`)
2. maîtriser les implémentations par défaut (`ArrayList`, `HashSet`, `HashMap`)
3. garder Big-O en tête pour éviter les problèmes de montée en charge
4. implémenter correctement `equals/hashCode` sur les objets clés
