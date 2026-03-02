---
title: Data - Fondamentaux SQL
description: "Apprendre les concepts SQL essentiels pour le backend: joins, index, transactions et bases d'optimisation de requetes."
date: 2025-01-11
tags: [java, data, sql, databases]
draft: false
readingTime: 14 min
---

## Pourquoi cette etape est importante

Meme avec un ORM, la performance et la fiabilite backend dependent de la maitrise SQL.
Si tu ne sais pas lire un plan SQL ni comprendre les joins, les incidents prod deviennent difficiles a corriger.

## Operations de base

```sql
SELECT id, email
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 20;
```

A maitriser :

- `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`
- `INSERT`, `UPDATE`, `DELETE`

## Joins

```sql
SELECT u.id, u.email, o.total
FROM users u
JOIN orders o ON o.user_id = u.id;
```

Types de join importants :

- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN` (moins frequent)

Comprendre ce qui se passe quand des lignes manquent d'un cote.

## Index

Les index accelerent les recherches et tris, mais augmentent le cout des ecritures.

Bons candidats :

- colonnes souvent filtrees (`WHERE`)
- cles de jointure
- colonnes de tri (`ORDER BY`)

Mauvaise pratique :

- creer de nombreux index inutiles

## Transactions

Une transaction groupe des operations de maniere atomique.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

En cas d'erreur, un rollback doit restaurer la coherence.

## Bases d'optimisation

- selectionner seulement les colonnes utiles
- eviter `SELECT *` dans les chemins chauds
- paginer les gros volumes
- analyser les plans avec `EXPLAIN`

## Erreurs frequentes

- requetes repetitives type N+1
- index manquants sur colonnes de jointure/filtre
- transactions trop longues qui bloquent
- ignorer l'impact des niveaux d'isolation

## A retenir

1. SQL est une competence backend centrale, meme avec ORM
2. Maitriser joins, index et transactions
3. Utiliser `EXPLAIN` et mesurer avant d'optimiser a l'aveugle
4. Optimiser pour la lecture mais aussi pour le cout d'ecriture
