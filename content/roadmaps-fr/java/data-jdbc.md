---
title: Data - JDBC
description: "Apprendre les fondamentaux JDBC pour le backend Java: connexions, prepared statements, transactions et mapping des resultats."
date: 2025-01-12
tags: [java, data, jdbc, sql]
draft: false
readingTime: 13 min
---

## Pourquoi cette etape est importante

JDBC est la base bas niveau de nombreuses bibliotheques data plus haut niveau.
Le comprendre aide a debugger les problemes de connexion, de SQL et de transactions.

## Composants principaux

- `DataSource` : point d'entree pour obtenir des connexions
- `Connection` : session BD
- `PreparedStatement` : SQL parametre
- `ResultSet` : lignes de resultat

## Exemple de requete

```java
String sql = "SELECT id, email FROM users WHERE id = ?";

try (Connection con = dataSource.getConnection();
     PreparedStatement ps = con.prepareStatement(sql)) {

    ps.setLong(1, 42L);

    try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
            long id = rs.getLong("id");
            String email = rs.getString("email");
            System.out.println(id + " " + email);
        }
    }
}
```

## Pourquoi les prepared statements sont essentiels

Ils :

- evitent l'injection SQL en separant requete et valeurs
- ameliorent la reutilisation des plans d'execution

Ne jamais construire une requete avec concat de string issue de l'utilisateur.

## Transactions JDBC

```java
try (Connection con = dataSource.getConnection()) {
    con.setAutoCommit(false);
    try {
        // plusieurs requetes
        con.commit();
    } catch (Exception e) {
        con.rollback();
        throw e;
    }
}
```

## Mapping des resultats

Mappe chaque ligne vers un objet metier ou un DTO.
Garde ce code explicite et testable.

```java
record UserRow(long id, String email) {}
```

## Erreurs frequentes

- ne pas fermer `Connection`, `Statement`, `ResultSet`
- SQL dynamique via concat non sure
- gestion transactionnelle fragile sans rollback
- ignorer silencieusement les exceptions SQL

## A retenir

1. JDBC donne du controle precis et facilite le debug
2. Utiliser `PreparedStatement` par defaut
3. Gerer proprement transactions et fermeture des ressources
4. Garder un mapping explicite et maintenable
