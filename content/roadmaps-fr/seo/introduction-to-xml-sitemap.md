---
title: "Introduction au sitemap XML"
description: "Un sitemap XML aide les moteurs de recherche à découvrir, explorer et indexer les pages importantes d’un site. Découvrez son utilité, sa structure et les bonnes pratiques pour le mettre en place."
date: 2025-02-05
tags: []
draft: false
readingTime: 6 min
cover: /banner-test.jpg
---

Un sitemap XML est un fichier qui liste les URLs importantes d’un site web. Il sert de feuille de route pour les moteurs de recherche en leur indiquant quelles pages doivent être découvertes et explorées en priorité. Même s’il n’est pas un facteur de classement direct, il joue un rôle utile dans une stratégie SEO technique, en particulier sur les sites volumineux, récents ou riches en contenus.

Dans cet article, nous allons voir à quoi sert un sitemap XML, pourquoi il est utile et comment le créer puis le soumettre correctement.

## Qu’est-ce qu’un sitemap XML ?

Un sitemap XML est un fichier structuré destiné aux moteurs de recherche. Il contient la liste des URLs que vous jugez importantes pour l’exploration et l’indexation.

Un sitemap peut également contenir des informations supplémentaires comme :

- la date de dernière modification d’une page ;
- la fréquence à laquelle le contenu change ;
- la priorité relative d’une URL par rapport aux autres.

Ces indications n’obligent pas les moteurs à agir d’une certaine manière, mais elles peuvent les aider à mieux comprendre la structure du site.

## Pourquoi un sitemap XML est important

### Améliorer le crawl et l’indexation

Sans sitemap, un moteur doit surtout compter sur le maillage interne pour découvrir les pages. Sur certains sites complexes, cela peut ralentir la découverte de pages importantes. Le sitemap XML facilite cette exploration.

### Aider les grands sites

Les sites avec beaucoup de pages, une arborescence profonde ou des contenus régulièrement mis à jour bénéficient particulièrement d’un sitemap bien tenu à jour.

### Donner plus de visibilité aux pages utiles

Le sitemap aide les moteurs à repérer rapidement les URLs qui comptent réellement dans votre stratégie SEO.

### Être utile pour les nouveaux sites

Un site récent, avec peu de backlinks, peut mettre du temps à être bien découvert. Le sitemap XML peut accélérer cette phase initiale.

## Exemples d’URLs de sitemaps

Voici quelques exemples d’URLs souvent utilisées pour exposer des sitemaps :

- `https://www.example.com/sitemap.xml`
- `https://www.example.com/sitemap_index.xml`
- `https://www.example.com/blog/sitemap.xml`
- `https://www.example.com/products/sitemap.xml`
- `https://www.example.com/sitemaps/news-sitemap.xml`

En général, ces fichiers se terminent par `.xml` et peuvent être mentionnés dans le fichier `robots.txt` ou soumis directement dans Google Search Console.

## Comment créer un sitemap XML

Il existe plusieurs manières de créer un sitemap XML. Selon votre stack, vous pouvez le générer à la main, via un CMS, ou avec un outil dédié.

### Création manuelle

Un sitemap XML doit respecter une structure précise. Voici un exemple simple :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>http://www.example.com/</loc>
      <lastmod>2025-02-05</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>http://www.example.com/about/</loc>
      <lastmod>2025-02-01</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
</urlset>
```

Chaque balise `<url>` représente une page. La balise `<loc>` contient l’URL, et les autres champs donnent des informations complémentaires.

### Utiliser des générateurs de sitemap

Si vous ne voulez pas créer le fichier manuellement, plusieurs outils peuvent le faire automatiquement :

- [Yoast SEO](https://yoast.com/wordpress/plugins/seo/) pour WordPress ;
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) ;
- [Google Search Console](https://search.google.com/search-console) pour le suivi et la soumission.

## Comment soumettre un sitemap XML

Une fois le fichier créé, il est recommandé de le soumettre aux moteurs de recherche.

### Soumettre le sitemap dans Google Search Console

1. Connectez-vous à Google Search Console.
2. Sélectionnez votre propriété.
3. Ouvrez la section **Sitemaps**.
4. Saisissez l’URL de votre sitemap.
5. Cliquez sur **Submit**.

### Soumettre le sitemap dans Bing Webmaster Tools

Le fonctionnement est similaire dans Bing Webmaster Tools :

1. Connectez-vous à votre compte.
2. Sélectionnez votre site.
3. Ouvrez la section **Sitemaps**.
4. Ajoutez l’URL du sitemap.
5. Validez l’envoi.

Même si les moteurs peuvent découvrir le sitemap automatiquement s’il est mentionné dans `robots.txt`, une soumission manuelle reste utile.

## Bonnes pratiques pour un sitemap XML

### Garder le sitemap à jour

Dès qu’une page importante est ajoutée, supprimée ou modifiée, le sitemap doit refléter ce changement.

### Limiter le nombre d’URLs par fichier

Un sitemap peut contenir jusqu’à 50 000 URLs, mais il est souvent plus propre de découper les gros volumes en plusieurs sitemaps et d’utiliser un sitemap index.

### Utiliser des URLs absolues

Le sitemap doit toujours contenir des URLs complètes, avec le domaine, et non des chemins relatifs.

### Éviter les pages inutiles

N’ajoutez pas dans le sitemap des pages d’administration, de connexion ou des pages qui n’ont pas vocation à être indexées.

Le sitemap XML est un outil simple, mais très utile pour améliorer la découverte et l’indexation des contenus importants. Bien utilisé, il permet de mieux guider les moteurs, de détecter plus facilement certains problèmes de couverture et d’avoir une base technique plus propre pour le SEO.
