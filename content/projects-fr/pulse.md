---
title: Pulse
description: Agent APM Java local pour Spring Boot 3+ avec metriques SQL, HTTP et JVM exposees dans une interface web offline integree.
tags: [java, apm, observability, monitoring]
stack: [java, spring-boot]
year: 2026
active: true
links:
  repo: https://github.com/briacdev/pulse
  demo: https://pulse.briacd.com/
---

## Contexte du projet

Pulse est ne d'une contrainte simple : garder le diagnostic applicatif en local.

Beaucoup d'outils de monitoring supposent un collecteur externe, un dashboard heberge, ou un service supplementaire a maintenir. Pulse prend la direction inverse. Il s'attache directement a la JVM comme `-javaagent`, demarre avec l'application, collecte les signaux utiles, puis expose le tout dans une interface web locale.

Le resultat est un workflow APM leger, pense pour les developpeurs et les equipes qui veulent de la visibilite sans ajouter une plateforme d'observabilite complete.

## Ce que Pulse collecte

### Activite SQL

- instrumentation JDBC pour `Statement` et `PreparedStatement`
- duree des requetes, erreurs et type d'operation SQL
- enrichissement via le contexte Spring
- correlation SQL vers HTTP avec `traceId` ou fallback thread/temps

### Activite HTTP

- transactions par endpoint avec methode et chemin
- statut, latence et suivi des erreurs
- hotspots echantillonnes et visibilite sur les call stacks
- metadonnees de requete avec masquage et filtrage des donnees sensibles

### Metriques JVM

- utilisation du heap
- CPU du process
- threads et activite du garbage collector
- latence HTTP moyenne et indicateurs p95

## Mode de fonctionnement

Pulse est concu pour rester simple dans des environnements proches de la production :

- aucun collecteur externe
- aucune base de donnees supplementaire
- aucune dependance cloud obligatoire
- un seul JAR agent lance avec la JVM cible

Cela en fait un bon outil pour le debug local, l'analyse offline, la validation en staging, et les environnements self-hosted ou la telemetrie ne doit pas sortir de la machine.

## Mode de lancement

Le modele d'integration reste volontairement minimal :

```bash
java \
  -javaagent:/path/to/pulse/target/pulse-1.0.0-agent.jar=port=17321 \
  -jar /path/to/your-app.jar
```

Une fois l'application demarree, Pulse expose une UI locale et une API sur le port configure.

## Pourquoi ce projet est utile

Pulse ne cherche pas a remplacer une stack d'observabilite enterprise complete. Sa valeur est ailleurs :

- visibilite immediate avec une mise en place minimale
- diagnostic plus simple pour les applications Spring Boot
- meilleur controle des metadonnees HTTP et SQL sensibles
- fonctionnement offline-first pour les environnements restreints

C'est donc un bon choix pour les equipes qui veulent une couche de troubleshooting concrete avant d'introduire une infrastructure plus lourde.

## Direction actuelle

Le projet se concentre sur un runtime compact tout en ameliorant la qualite des signaux collectes :

- meilleure correlation entre requetes HTTP et execution SQL
- vues plus claires sur les hotspots et call stacks
- metriques JVM stables pour le diagnostic quotidien
- interface locale assez simple pour etre utile sans onboarding

## Liens externes

- Produit : [pulse.briacd.com](https://pulse.briacd.com/)
- Repository : [github.com/briacdev/pulse](https://github.com/briacdev/pulse)
