---
title: "Héberger son propre LLM accessible via API"
description: "Interagir avec un LLM (Large Language Model) via une API peut s’avérer extrêmement utile dans une application web moderne. Que ce soit pour extraire des informations d’un texte, résumer un document, générer des réponses a"
date: 2025-06-09
tags: [api, llm]
draft: false
readingTime: 8 min
cover: /banner-test.jpg
---

Interagir avec un LLM (Large Language Model) via une API peut s’avérer extrêmement utile dans une application web moderne. Que ce soit pour extraire des informations d’un texte, résumer un document, générer des réponses automatisées ou encore créer des interfaces conversationnelles, les LLM sont devenus incontournables dans le domaine du développement logiciel.

## État du marché des LLM accessibles via API

Aujourd’hui, la solution la plus simple et la plus répandue consiste à utiliser les modèles de langage déjà disponibles en ligne via des API publiques. Le leader du secteur est sans conteste [OpenAI](https://openai.com/), avec ses modèles comme GPT-4 qui offrent une qualité de réponse exceptionnelle. D'autres acteurs tels que [Anthropic](https://www.anthropic.com/), [Google](https://deepmind.google/), ou encore [Mistral](https://mistral.ai/) proposent également des alternatives performantes.

Ces solutions sont puissantes, bien documentées et faciles à intégrer. Toutefois, elles présentent certaines limites :

- **Coût** : les appels API peuvent devenir onéreux à grande échelle.

| **Modèle** | **Description** | **Input** | **Output** |
| --- | --- | --- | --- |
| **GPT-4.1** | Modèle le plus intelligent pour les tâches complexes | $2.00 / 1M tokens | $8.00 / 1M tokens |
| **GPT-4.1 mini** | Équilibre entre rapidité et intelligence à un coût abordable | $0.40 / 1M tokens | $1.60 / 1M tokens |
| **GPT-4.1 nano** | Modèle le plus rapide et économique, idéal pour les tâches légères | $0.10 / 1M tokens | $0.40 / 1M tokens |
- **Dépendance à un service tiers** : vos données transitent par des serveurs externes, souvent hébergés à l’étranger (États-Unis).
- **Confidentialité** : pour des raisons de sécurité ou de conformité, certaines entreprises préfèrent garder le contrôle total sur les traitements réalisés par les LLM.
- **Latence ou indisponibilité** : dépendre d’un service externe peut introduire des retards ou des coupures de service critiques dans certaines applications.
- **Le respect des données à caractère personnel** : en Europe, le RGPD impose des règles strictes sur la manière dont les données personnelles sont collectées, stockées et traitées.

Dans ce contexte, il peut être pertinent d’héberger son propre modèle localement ou sur son infrastructure cloud.

Mais alors, comment faire ?

## Solutions existantes pour auto-héberger un LLM

Plusieurs solutions open source permettent aujourd’hui d’héberger un LLM en local ou sur une infrastructure privée. Voici une liste non exhaustive des principales options, avec un rapide benchmark pour comparer leurs points forts et limites :

| Solution | Facilité d’installation | Notes principales |
| --- | --- | --- |
| **Ollama** | Très simple | API locale, modèles pré-entraînés intégrés |
| **Hugging Face + Transformers** | Moyenne à complexe | Large choix de modèles, nécessite infra |
| **GPT4All** | Facile | Modèles quantifiés, communauté active |
| **OpenLLM** | Moyenne | Framework pour déployer divers LLM |

La solution à ce jour la plus populaire est Ollama, et c’est vers cette dernière que nous allons nous tourner.

### Découvrir Ollama

Ollama permet de télécharger et d’exécuter des modèles de langage comme LLaMA 2, Mistral, ou encore Gemma, en une seule commande. L’outil a été pensé pour les développeurs : il offre une expérience fluide, une documentation claire, et une gestion simple des modèles via une interface en ligne de commande (`ollama run`, `ollama pull`, etc.).

En quelques secondes, vous pouvez avoir un modèle opérationnel en local, prêt à répondre à vos requêtes.

La solution est open source, ce qui garantit une certaine transparence sur son fonctionnement, mais surtout la liberté de l’adapter ou de l’intégrer dans votre infrastructure selon vos besoins. Vous pouvez contribuer à son développement, l'étendre ou le packager avec d'autres outils.

[GitHub - ollama/ollama: Get up and running with Llama 3.3, DeepSeek-R1, Phi-4, Gemma 3, Mistral Small 3.1 and other large language models.](https://github.com/ollama/ollama)

### Ollama expose une API native

L’un des grands avantages d’Ollama, c’est qu’il expose automatiquement une API locale dès qu’un modèle est lancé. Cette API suit un format JSON proche de l’API d’OpenAI, ce qui facilite la transition si vous avez déjà une application qui consomme un modèle GPT.

Exemple de requête HTTP :

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "Explique-moi simplement ce qu’est un LLM.",
  "stream": false
}'
```

La réponse est rapide, locale, et ne dépend d’aucun service externe. Vous avez un contrôle total sur le comportement et la disponibilité du modèle.

Et voici les modèles de langage les plus populaires supportés par Ollama, avec leurs caractéristiques principales :

| **Modèle** | **Taille** | **Points forts** |
| --- | --- | --- |
| **LLaMA 2** | 7B / 13B / 70B | Puissant, bon équilibre coût/performance, support Meta AI |
| **Mistral** | 7B | Très rapide, bien optimisé, très bon en français |
| **Mixtral** | 12.9B (MoE) | Mixture of Experts, meilleure qualité pour moins de ressources |
| **Gemma** | 2B / 7B | Légers, conçus par Google, faciles à exécuter localement |
| **Phi-2** | 2.7B | Petit modèle très rapide, bonne qualité malgré sa taille |
| **Codellama** | 7B / 13B | Spécialisé en génération de code, supporte plusieurs langages |
| **Neural Chat** | 7B | Modèle orienté chatbot, optimisé pour l'interaction humaine |
| **OpenChat** | 7B | Basé sur LLaMA 2, fine-tuné pour la conversation |

Vous trouverez la liste des modèles compatibles ici :

[Ollama Search](https://ollama.com/search)

## Installation d’Ollama

L’un des grands avantages d’Ollama est sa simplicité d’installation. Que ce soit en local pour faire des tests rapides ou en production, Ollama s’adapte facilement à tous les contextes.

### Installation via Docker

[Docker: Accelerated Container Application Development](https://www.docker.com/)

Ollama propose une image Docker officielle ce qui permet de le déployer rapidement.

```bash
docker run -d --name ollama -p 11434:11434 ollama/ollama
```

[hub.docker.com](https://hub.docker.com/r/ollama/ollama)

Une fois le conteneur lancé, l’API est disponible sur `http://localhost:11434`. Il est ensuite possible de télécharger un modèle et de le faire tourner :

```bash
docker exec -it ollama ollama run mistral
```

Cela télécharge automatiquement le modèle Mistral si ce n’est pas déjà fait, et le met à disposition via l’API.

Une installation manuel est aussi disponible, vous trouverez la documentation ici : [https://github.com/ollama/ollama/blob/main/docs/linux.md](https://github.com/ollama/ollama/blob/main/docs/linux.md) 

Si vous n’êtes pas à l’aise avec un environnement Linux je vous conseille d’utiliser une solution de déploiement moderne comme Coolify.

[Coolify: The Open-Source & Self-Hostable Alternative to Heroku, Netlify, and Vercel](https://briacd.com/coolify-self-hostable)

Cela permet d’exposer Ollama dans un environnement cloud ou privé sans effort de configuration complexe.

## Intéragir avec le service Ollama

Une fois un modèle lancé, Ollama expose une API HTTP locale très simple à utiliser. Par défaut, elle est accessible à l’adresse suivante : `http://localhost:11434`

L’interaction avec le modèle s’effectue via des requêtes POST en JSON.

### Exemple d’appel :

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "Donne-moi une définition simple de l’intelligence artificielle.",
  "stream": false
}'
```

Réponse :

```json
{
  "model": "mistral",
  "created_at": "2023-08-04T19:22:45.499127Z",
  "response": "la réponse ici",
  "done": true,
  "context": [1, 2, 3],
  "total_duration": 10706818083,
  "load_duration": 6338219291,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 130079000,
  "eval_count": 259,
  "eval_duration": 4232710000
}
```

La réponse est retournée sous forme JSON, dans un format proche de celui utilisé par OpenAI, ce qui facilite la compatibilité avec des applications existantes.

## Découvrir les API natives d’Ollama

Voici un aperçu des principales routes disponibles :

| **Endpoint** | **Méthode** | **Description** |
| --- | --- | --- |
| `/api/generate` | POST | Génère une réponse à partir d’un prompt |
| `/api/chat` | POST | Lance une conversation multi-tours (type ChatGPT) |
| `/api/pull` | POST | Télécharge un modèle depuis le hub Ollama |
| `/api/push` | POST | Envoie un modèle personnalisé vers votre registre privé |
| `/api/show` | POST | Affiche des informations sur un modèle local |
| `/api/tags` | GET | Liste des modèles disponibles localement |
| `/api/delete` | DELETE | Supprime un modèle local |

Vous trouverez la documentation officielle directement dans le répertoire GitHub du projet :

[ollama/docs/api.md at main · ollama/ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

## Intégration en Spring Boot

Si vous utilisez Spring Boot, je vous conseille de vous baser sur Spring AI pour interagir avec Ollama. Cela permet une abstraction simple entre Spring Boot et des services d’IA dont Ollama.

[Ollama Embeddings :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/embeddings/ollama-embeddings.html)

## Sécurisation d’Ollama

C’est super, Ollama est déployé sur votre serveur et vous arrivez à communiquer avec lui mais maintenant comment le rendre privé, pour qu’il soit accessible uniquement par vos applications, et non exposé publiquement sur Internet sans authentification ?

Par défaut, Ollama expose son API HTTP sur le port `11434`, sans aucun système d’authentification. Cela fonctionne bien en local ou sur un réseau privé, mais en production, cela ouvre un risque important : n’importe qui peut envoyer des prompts et utiliser vos ressources.

Voici quelques approches pour restreindre l'accès à Ollama :

### Filtrer par adresse IP (niveau firewall)

- Autoriser uniquement l’adresse IP de ton serveur backend (ex : Spring Boot).
- Refuser toutes les connexions externes via un pare-feu comme `ufw`, `iptables` ou les règles réseau de votre fournisseur cloud.

### Protéger avec une authentification via un reverse proxy

Vous pouvez utilisez [Nginx Proxy Manager](https://nginxproxymanager.com/), [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy) ou [Traefik](https://traefik.io/traefik/) comme reverse proxy pour intercepter les requêtes et ajouter une couche de sécurité :

- Authentification par clé API
- Authentification HTTP Basic
- Authentification par token JWT

Si vous utilisez Coolify, cette option est directement disponible grâce au reverse proxy intégré.

![image.png](/blog-media/heberger-son-propre-llm-accessible-via-api/image.png)

Vous pouvez maintenant accéder à votre instance Ollama seulement avec un mot de passe. Je vous conseiller également d’ajouter un certificat SSL pour sécuriser l’accès en HTTPS.

Pour rester à la page des dernières sorties et changements, je vous conseille de consulter régulièrement les liens officiels d’Ollama :

[GitHub - ollama/ollama: Get up and running with Llama 3.3, DeepSeek-R1, Phi-4, Gemma 3, Mistral Small 3.1 and other large language models.](https://github.com/ollama/ollama)

[Ollama](https://ollama.com/)

🦙👋
