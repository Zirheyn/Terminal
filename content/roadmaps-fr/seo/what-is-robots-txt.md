---
title: "Qu’est-ce que robots.txt ?"
description: "Découvrez ce qu’est le fichier robots.txt, comment il fonctionne et pourquoi il est utile pour contrôler le comportement des robots d’exploration et améliorer le SEO technique d’un site."
date: 2025-02-03
tags: []
draft: false
readingTime: 5 min
cover: /banner-test.jpg
---

Le fichier robots.txt est un simple fichier texte utilisé par les sites web pour donner des instructions aux robots d’exploration. Il permet d’indiquer quelles parties d’un site peuvent être visitées ou non par certains crawlers, notamment ceux des moteurs de recherche comme Googlebot.

Ce fichier est placé à la racine du domaine. Par exemple, si votre site est `https://www.example.com`, le fichier sera accessible à l’adresse `https://www.example.com/robots.txt`.

Même s’il ne s’agit pas d’un outil de sécurité, le robots.txt reste un élément important du SEO technique et de la gestion de la performance d’un site.

## Comment fonctionne robots.txt

Lorsqu’un robot arrive sur un site, il cherche généralement à lire le fichier robots.txt avant de poursuivre son exploration. S’il trouve ce fichier, il analyse les règles qu’il contient pour savoir quels chemins il doit éviter.

Ces règles sont définies à l’aide de directives comme **User-agent**, **Disallow** et **Allow**.

- **User-agent** désigne le robot concerné par la règle.
- **Disallow** indique quels chemins ne doivent pas être explorés.
- **Allow** précise quelles URLs peuvent rester accessibles, même si un dossier parent est bloqué.

### Exemple simple de fichier robots.txt

```txt
User-agent: *
Disallow: /private/
Allow: /public/
```

Dans cet exemple, les règles s’appliquent à tous les robots. Le dossier `/private/` est bloqué, tandis que `/public/` reste autorisé.

## Pourquoi robots.txt est important

### Améliorer la performance du site

En empêchant les robots d’accéder à certaines zones inutiles, vous pouvez limiter les requêtes sur le serveur. Cela est particulièrement utile si votre site comporte des fichiers lourds, des pages techniques ou des paramètres sans intérêt SEO.

### Réduire les problèmes de contenu dupliqué

Certaines URLs peuvent afficher des contenus très proches ou identiques, notamment sur des pages filtrées, triées ou générées dynamiquement. Le robots.txt peut aider à limiter l’exploration de certaines de ces variantes.

### Éviter d’exposer des zones peu utiles

Sans être une solution de sécurité, le robots.txt peut empêcher les moteurs de consacrer du temps à explorer des pages de connexion, des environnements de test ou d’autres zones sans valeur pour la recherche.

### Orienter le crawl vers les pages importantes

Bien utilisé, ce fichier aide les moteurs à concentrer leur exploration sur les parties les plus utiles du site.

## Erreurs fréquentes à éviter

### Bloquer des pages importantes

Il arrive souvent de bloquer involontairement des pages qui devraient rester indexables, comme des fiches produits, des articles ou même la page d’accueil. Il faut toujours tester les règles avant de les déployer.

### Mal utiliser les wildcards

Les caractères comme `*` ou `$` sont pratiques, mais une mauvaise règle peut bloquer bien plus de pages que prévu.

Par exemple :

```txt
Disallow: /search*
```

Cette directive bloque toutes les URLs qui commencent par `/search`, ce qui peut parfois aller trop loin selon la structure du site.

### Oublier la gestion du rythme de crawl

Certains robots prennent en charge des directives comme `Crawl-delay`, qui permettent de ralentir le nombre de requêtes si le serveur est fragile.

```txt
User-agent: Googlebot
Crawl-delay: 10
```

Cela signifie que le robot doit attendre 10 secondes entre deux requêtes.

## Tester et valider robots.txt

Après avoir créé ou modifié le fichier, il est important de le tester. Google a longtemps proposé un robots.txt Tester dans Search Console, et il reste utile de vérifier ses règles avec des outils d’audit ou des crawlers SEO pour voir précisément quelles pages sont bloquées ou autorisées.

Le bon réflexe consiste à tester quelques URLs stratégiques avant la mise en production.

## Bonnes pratiques pour robots.txt

### Garder le fichier simple

Un robots.txt n’a pas besoin d’être compliqué. Des règles lisibles et limitées sont souvent plus sûres qu’un fichier surchargé.

### Ne pas bloquer les assets importants

Il faut éviter de bloquer les fichiers CSS, JavaScript ou images nécessaires au rendu de la page, car les moteurs peuvent en avoir besoin pour bien comprendre le contenu.

### Mettre le fichier à jour régulièrement

À mesure que le site évolue, le fichier doit lui aussi évoluer. Un robots.txt oublié peut devenir incohérent avec la structure réelle du site.

### Ne jamais s’en servir comme protection de sécurité

Si vous devez protéger une zone sensible, il faut mettre en place une vraie authentification côté serveur. Le robots.txt n’empêche pas un utilisateur ou un robot malveillant d’accéder à une URL connue.

Le fichier robots.txt est petit, mais il peut avoir un impact important sur la manière dont les moteurs explorent un site. En le structurant correctement, vous améliorez la gestion du crawl, limitez certaines explorations inutiles et gardez un meilleur contrôle sur la surface technique du site.
