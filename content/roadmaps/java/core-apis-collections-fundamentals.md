---
title: Core APIs - Collections Fundamentals
description: Understand Java List, Set, and Map, when to use each one, and the Big-O basics that influence performance decisions.
date: 2024-12-31
tags: [java, core-apis, collections, data-structures]
draft: false
readingTime: 13 min
---

## Why this step matters

Most backend features rely on in-memory data structures:

- storing results from a database
- deduplicating values
- grouping data for business rules
- indexing data for fast lookups

If you choose the wrong collection, your code may still work but become slow, memory-heavy, or error-prone at scale.

## Mental model: List vs Set vs Map

Think in terms of your business need:

- `List<E>`: ordered sequence, duplicates allowed
- `Set<E>`: unique elements, no duplicates
- `Map<K, V>`: key-value association

## `List`: ordered collection

Use a list when:

- order matters
- duplicates are valid
- index-based access is useful

```java
List<String> tasks = new ArrayList<>();
tasks.add("scan");
tasks.add("audit");
tasks.add("scan"); // duplicate allowed

System.out.println(tasks.get(0)); // scan
```

### Common implementations

- `ArrayList`: best default for most cases, fast random access
- `LinkedList`: useful for frequent insert/remove at ends, less common in modern app code

## `Set`: uniqueness first

Use a set when:

- you must avoid duplicates
- membership checks are frequent (`contains`)

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("security");
tags.add("java"); // ignored

System.out.println(tags.size()); // 2
```

### Common implementations

- `HashSet`: fastest general-purpose uniqueness checks
- `LinkedHashSet`: preserves insertion order
- `TreeSet`: sorted set (natural order or custom comparator)

## `Map`: key-value lookup

Use a map when:

- you retrieve values by key
- you need counters, indexes, lookup tables

```java
Map<String, Integer> requestsByRegion = new HashMap<>();
requestsByRegion.put("eu-west-1", 120);
requestsByRegion.put("us-east-1", 180);

int eu = requestsByRegion.getOrDefault("eu-west-1", 0);
System.out.println(eu); // 120
```

### Common implementations

- `HashMap`: default for fast key-based access
- `LinkedHashMap`: keeps insertion order
- `TreeMap`: sorted by key

## Big-O basics (practical view)

Big-O gives the growth trend of operation cost when data grows.
You do not need math-heavy theory for daily backend work, but you should know common patterns.

### Typical complexity

For `ArrayList`:

- append (`add` at end): amortized `O(1)`
- read by index (`get(i)`): `O(1)`
- insert/remove in middle: `O(n)` (shift elements)

For `HashSet` / `HashMap`:

- `add`, `contains`, `get`, `put`: average `O(1)`, worst-case `O(n)`

For `TreeSet` / `TreeMap`:

- add/get/remove: `O(log n)`

## Choosing the right collection quickly

Use this quick rule:

1. Need ordering + duplicates? -> `ArrayList`
2. Need uniqueness only? -> `HashSet`
3. Need key/value lookup? -> `HashMap`
4. Need sorted data? -> `TreeSet` / `TreeMap`
5. Need predictable insertion order? -> `LinkedHashSet` / `LinkedHashMap`

## Common mistakes to avoid

- using `List.contains()` for heavy membership checks on large datasets
- ignoring `equals()` and `hashCode()` in custom objects used inside `Set`/`Map`
- overusing `TreeMap`/`TreeSet` when sorting is not required
- using raw types instead of generics (`List` instead of `List<String>`)

## `equals` / `hashCode` reminder

For hash-based collections, Java uses `hashCode()` then `equals()` to identify uniqueness.
If these methods are incorrect, duplicates or lookup bugs appear.

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

## Mini backend example

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

This single loop uses:

- a `List` as source data
- a `Set` for deduplication
- a `Map` for indexed aggregation

## Takeaway

For robust Java collection usage:

1. choose by intent first (`order`, `uniqueness`, `key lookup`)
2. know default implementations (`ArrayList`, `HashSet`, `HashMap`)
3. keep Big-O in mind to avoid hidden scaling issues
4. implement `equals/hashCode` correctly for custom key objects
