---
title: "Wrapper ClamAV : Une solution antivirus via API"
description: "Les formulaires de téléchargement sont omniprésents dans les applications web. Que ce soit pour envoyer un CV, une image de profil ou un document quelconque, les utilisateurs s'attendent à pouvoir transmettre des fichiers"
date: 2025-04-28
tags: [api]
draft: false
readingTime: 14 min
cover: /banner-test.jpg
---

Les formulaires de téléchargement sont omniprésents dans les applications web. Que ce soit pour envoyer un CV, une image de profil ou un document quelconque, les utilisateurs s'attendent à pouvoir transmettre des fichiers. Mais cette fonctionnalité pratique peut devenir une porte d’entrée pour des fichiers malveillants.

## **Mais comment s'assurer que les fichiers transmis ne contiennent pas de malware ?**

> Malware : logiciel spécifiquement conçu pour perturber, endommager ou obtenir un accès non autorisé à un système informatique.
> 

### Quels sont les risques ?

Lorsque vous acceptez des fichiers sans les analyser, vous vous exposez à plusieurs menaces :

- Exécution de code malveillant : certains fichiers contiennent des scripts ou exécutables dangereux.
- Ransomware : si un utilisateur mal intentionné injecte un fichier cryptant les données du serveur, les conséquences peuvent être critiques.
- Propagation de malware : vos utilisateurs peuvent involontairement télécharger des fichiers contaminés qui infecteront d'autres utilisateurs.

### Comment s’en protéger ?

- Valider la taille du fichier transmis.
- Avoir une whitelist stricte des extensions (`.jpg`, `.png`, `.pdf`, etc.) → On évite les `.exe`, `.js`, `.php`, etc.
- Vérifier le type MIME réel du fichier (pas juste l’extension).

Mais est-ce suffisant ? La réponse est non ! Alors comment être sûr que les fichiers envoyés par nos utilisateurs ne sont pas infectés ?

<aside>
💡

**Une étape de sécurisation supplémentaire est d’utiliser un antivirus côté serveur !**

</aside>

L’idée est simple : chaque fichier téléchargé passe par un **antivirus** qui le scanne avant toute action serveur. Si le fichier est sain, le traitement continue. Sinon, il est rejeté.

Le plus connu à mon sens est le célèbre [VirusTotal](https://www.virustotal.com/gui/home/upload).

Oui mais… combien ça coûte ?

![Prix de VirusTotal](/blog-media/wrapper-clamav-une-solution-antivirus-via-api/image.png)

Prix de VirusTotal

Aïe... 🤕

## La solution : Wrapper un antivirus 👾

Comment pouvons-nous wrapper efficacement un antivirus pour scanner nos fichiers avant de les enregistrer de façon permanente sur nos serveurs ?

> En programmation informatique, une fonction wrapper est un programme dont la fonction principale est d'appeler une autre fonction, un autre programme.
> 

### Quel antivirus utiliser ?

[ClamAV](https://www.clamav.net/) est un antivirus open-source conçu pour détecter un large éventail de menaces : virus, trojans, malwares, etc. Il est léger, rapide, et dispose d’une base de définitions régulièrement mise à jour. Il est maintenu par Cisco.

ClamAV est un antivirus de type signature-based, ce qui signifie qu’il détecte les malwares en les comparant à une base de signatures virales connues.

ClamAV propose deux outils principaux :

- `clamscan` : un binaire en ligne de commande pour scanner des fichiers.
- `clamd` : un daemon qui écoute et analyse des fichiers via un socket (plus rapide que `clamscan`).

[GitHub - Cisco-Talos/clamav: ClamAV - Documentation is here: https://docs.clamav.net](https://github.com/Cisco-Talos/clamav)

### Super, mais alors comment wrapper `clamd` dans notre application ?

Pour interagir avec ClamAV, il existe deux approches :

1. Appeler le binaire `clamscan` avec un `ProcessBuilder` Java. Facile à implémenter, mais lent car un nouveau processus est lancé à chaque scan.
2. Utiliser `clamd` via un client TCP. Plus rapide et scalable. On envoie le fichier via un socket au daemon qui répond avec le résultat. C’est donc cette solution que nous allons utiliser.

### Installation de `clamd` et `freshclam` sur Linux

```bash
sudo apt install clamav clamav-daemon
```

Avant de lancer le démon `clamd`, tu dois mettre à jour la base de signatures :

```bash
sudo freshclam
```

Puis on démarre et active le service `clamd` :

```bash
sudo systemctl enable clamav-daemon
```

On vérifie que `clamd` est actif :

```bash
sudo systemctl status clamav-daemon
```

Et on scan un fichier manuellement

```bash
clamscan fichier.txt
```

[Installing - ClamAV Documentation](https://docs.clamav.net/manual/Installing.html)

## Développement du Wrapper Clamd

Exemple dans une application Spring Boot.

### 💼 Définir l’interface API

```java
@ResponseStatus(HttpStatus.OK)
@PostMapping("/api/v1/scans")
public ScanResultDto scanFile(@RequestParam("file") MultipartFile file) {
    return clamavService.scanFile(file);
}
```

Ce bloc de code définit un endpoint REST `POST /api/v1/scans` qui permet à un client d’envoyer un fichier à analyser. Le fichier est reçu via un champ `file` dans la requête multipart, puis transmis au service `clamavService` qui effectue le scan antivirus avec ClamAV. Le résultat est retourné au client sous forme d’un objet `ScanResultDto`, avec un code HTTP 200 si tout se passe bien.

[Understanding RESTful APIs: A guide with Spring Boot](https://briacd.com/api-rest-spring-boot)

### 📦 Définir la structure de notre DTO

```java
@Data
@AllArgsConstructor
public class ScanResultDto {
    private String filename;
    private String extension;
    private long sizeInBytes;
    private long scanDurationMillis;
    private boolean isInfected;
    private String virusName;
    private String rawResponse;
}
```

Notre service devra retourner un objet `ScanResultDto` avec toutes les infos utiles : nom du fichier, extension, taille, durée du scan, infection ou non, nom du virus et la réponse brute.

[Understanding DTOs in Java Spring Boot](https://briacd.com/dto-java-spring-boot)

### 👏 Créer une classe de service `ClamavService`

Dans cette partie, on va voir comment analyser un fichier en Java à l’aide d’un serveur ClamAV distant.

Le but de notre méthode :

1. Recevoir un fichier uploadé (`MultipartFile`)
2. Se connecter au serveur ClamAV (host/port configurables)
3. Envoyer le contenu du fichier pour analyse
4. Récupérer le résultat pour savoir s’il est infecté ou non
5. Retourner un objet `ScanResultDto` propre

Voici le code du service :

```java
@Service
@Slf4j
public class ClamavService {

    @Value("${clamd.host}")
    private String clamavHost;

    @Value("${clamd.port}")
    private int clamavPort;

    @Value("${clamd.maxfilesize}")
    private String maxFileSize;

    public ScanResultDto scanFile(MultipartFile file) {
        long maxSizeInBytes = parseDataSize(maxFileSize);
        if (file.getSize() > maxSizeInBytes) {
            throw new ClamAVScanException("File too large for ClamAV");
        }

        try (Socket socket = new Socket(clamavHost, clamavPort);
             OutputStream out = socket.getOutputStream();
             InputStream in = socket.getInputStream();
             InputStream fileStream = file.getInputStream()) {

            out.write("nINSTREAM\n".getBytes());

            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = fileStream.read(buffer)) != -1) {
                out.write(intToByteArray(bytesRead));
                out.write(buffer, 0, bytesRead);
            }

            out.write(intToByteArray(0));
            out.flush();

            byte[] responseBuffer = new byte[1024];
            int responseSize = in.read(responseBuffer);
            String response = new String(responseBuffer, 0, responseSize).trim();

            boolean isInfected = response.contains("FOUND");
            String virusName = isInfected ? response.split("FOUND")[0].split(":")[1].trim() : null;

            return new ScanResultDto(
                file.getOriginalFilename(),
                extractExtension(file.getOriginalFilename()),
                file.getSize(),
                System.currentTimeMillis(),
                isInfected,
                virusName,
                response
            );

        } catch (IOException e) {
            throw new ClamAVScanException("ClamAV scan error: " + e.getMessage());
        }
    }

    private byte[] intToByteArray(int value) {
        return new byte[]{
            (byte) (value >>> 24),
            (byte) (value >>> 16),
            (byte) (value >>> 8),
            (byte) value
        };
    }

    private long parseDataSize(String size) {
        size = size.toUpperCase().replace("B", "");
        long multiplier = 1;
        if (size.endsWith("K")) multiplier = 1024;
        else if (size.endsWith("M")) multiplier = 1024 * 1024;
        else if (size.endsWith("G")) multiplier = 1024 * 1024 * 1024;
        return Long.parseLong(size.replaceAll("[^0-9]", "")) * multiplier;
    }

    private String extractExtension(String filename) {
        return filename != null && filename.contains(".")
                ? filename.substring(filename.lastIndexOf('.') + 1)
                : "";
    }
}
```

Si on découpe le code pour le comprendre on voit les parties suivantes :

## ⚙️ Configuration dynamique

```java
@Value("${clamd.host}")
private String clamavHost;

@Value("${clamd.port}")
private int clamavPort;

@Value("${clamd.maxfilesize}")
private String maxFileSize;
```

Ce sont ces propriétés qui seront utilisées par notre service pour communiquer avec le serveur ClamAV.

### 🔍 Détail des propriétés

- `clamd.host` C’est l’adresse IP ou le nom d’hôte où tourne le service ClamD (le démon de ClamAV).
- **`clamd.port`** Le port TCP sur lequel ClamD écoute les connexions.
    
    Par défaut, ClamD écoute sur le port 3310, mais cela dépend de ta configuration (`clamd.conf`).
    
- `clamd.maxfilesize` Une sécurité côté applicatif : on va refuser les fichiers trop volumineux pour éviter les surcharges ou les abus.

Voilà donc mon application.properties

```java
clamd.host=127.0.0.1
clamd.port=3310
clamd.maxfilesize=10MB

spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

J’ai également surchargé deux properties de Spring pour éviter les blocages des requêtes API.

## 🧠 Validation de la taille du fichier

```java
long maxSizeInBytes = parseDataSize(maxFileSize);
if (file.getSize() > maxSizeInBytes) {
    throw new ClamAVScanException("File too large for ClamAV");
}
```

- Avant d'envoyer un fichier à ClamAV, on vérifie qu’il respecte une taille maximale.
- Sinon, on lève une exception personnalisée pour ne pas saturer le serveur.

Pour avoir une chaîne lisible par l'humain (comme `"50M"`, `"10K"`, `"1G"`) en valeur numérique en octets on utilise la méthode :

```java
private long parseDataSize(String size) {
    size = size.toUpperCase().replace("B", "");
    long multiplier = 1;
    if (size.endsWith("K")) multiplier = 1024;
    else if (size.endsWith("M")) multiplier = 1024 * 1024;
    else if (size.endsWith("G")) multiplier = 1024 * 1024 * 1024;
    return Long.parseLong(size.replaceAll("[^0-9]", "")) * multiplier;
}
```

## 🔌 Connexion au serveur ClamAV

```java
try (Socket socket = new Socket(clamavHost, clamavPort);
     OutputStream out = socket.getOutputStream();
     InputStream in = socket.getInputStream();
     InputStream fileStream = file.getInputStream()) {
```

Pour ouvrir à chaque utilisation :

- Une socket TCP vers le serveur ClamAV (`clamavHost`, `clamavPort`)
- Un flux pour écrire (envoyer le fichier)
- Un flux pour lire la réponse
- Le flux du fichier à scanner

## 📤 Envoi du fichier au serveur

```java
out.write("nINSTREAM\n".getBytes());
```

Pour indiquer à clamd qu’on va lui streamer un fichier (protocole `INSTREAM`).

Ensuite :

```java
byte[] buffer = new byte[8192];
int bytesRead;
while ((bytesRead = fileStream.read(buffer)) != -1) {
    out.write(intToByteArray(bytesRead));
    out.write(buffer, 0, bytesRead);
}
out.write(intToByteArray(0));
out.flush();
```

Pour lire le fichier en petits morceaux (8Ko à la fois) et on les envoie à ClamAV avec la taille précisée avant chaque bloc.

Ici on utilise la méthode intToByteArray() pour convertit un entier Java (`int`) en tableau de 4 octets (bytes) au format Big Endian. Ce format est requis par le protocole `INSTREAM` de ClamAV pour lui indiquer la taille d’un bloc de données avant de lui envoyer ce bloc.Puis on indique à ClamAV qu’on a terminé d’envoyer les données (en envoyant un bloc de taille 0).

## 📥 Lecture du résultat

```java
byte[] responseBuffer = new byte[1024];
int responseSize = in.read(responseBuffer);
String response = new String(responseBuffer, 0, responseSize).trim()
```

On attend la réponse du serveur ClamAV.

Typiquement, ClamAV renvoie :

```
stream: OK
```

ou

```
stream: Eicar-Test-Signature FOUND
```

## 🛡️ Interprétation du résultat

```java
boolean isInfected = response.contains("FOUND");
String virusName = isInfected ? response.split("FOUND")[0].split(":")[1].trim() : null;
```

- Si le mot-clé `FOUND` est présent, c’est qu’un virus a été détecté !
- Sinon, le fichier est sain.

### 📦 Construction de l’objet de réponse

```java
String originalFilename = file.getOriginalFilename();
String extension = originalFilename != null && originalFilename.contains(".")
        ? originalFilename.substring(originalFilename.lastIndexOf('.') + 1)
        : "";

return new ScanResultDto(
        originalFilename,
        extension,
        file.getSize(),
        duration,
        isInfected,
        virusName,
        response
);
```

Ici on utilise la méthode extractExtension() pour extraire l’extension du fichier (comme `"pdf"`, `"jpg"`, `"exe"`) à partir du nom.

Ok, donc à ce stade, on est capable d’appeler notre API en lui passant un fichier MultipartFile, de streamer ce fichier vers Clamd, de récupérer le résultat du scan et de construire notre objet de réponse.

## QUID des mises à jour de la base d’empreinte de ClamAV ?

Pour régler ce problème, nous allons utiliser les @ScheduledTasks de Spring Boot. Cela va nous permettre d’exécuter du code, et donc une mise à jour, à intervalle régulier.

Pour mettre à jour la base d’empreintes de ClamAV, il existe l’outil freshclam, le gestionnaire de mises à jour de ClamAV.

On veut donc une méthode qui : 

1. S’exécute tous les jours à minuit
2. Lance la commande `freshclam`
3. Loggue les résultats
4. Vérifie si ça s’est bien passé
5. Gère les erreurs sans bloquer l’app

On a donc le code suivant :

```java
@Scheduled(cron = "0 0 0 * * *") //Scheduled to run every day at midnight
public void updateVirusDefinitions() {
    log.info("Starting ClamAV virus database update via freshclam...");

    try {
        ProcessBuilder pb = new ProcessBuilder("freshclam");
        pb.redirectErrorStream(true);

        Process process = pb.start();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                log.info("[freshclam] {}", line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode == 0) {
            log.info("ClamAV database successfully updated.");
        } else {
            log.error("freshclam exited with code {}", exitCode);
        }

    } catch (Exception e) {
        log.error("Error while running freshclam update", e);
    }
}
public void updateVirusDefinitions() {
    log.info("Starting ClamAV virus database update via freshclam...");

    try {
        ProcessBuilder pb = new ProcessBuilder("freshclam");
        pb.redirectErrorStream(true);

        Process process = pb.start();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                log.info("[freshclam] {}", line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode == 0) {
            log.info("ClamAV database successfully updated.");
        } else {
            log.error("freshclam exited with code {}", exitCode);
        }

    } catch (Exception e) {
        log.error("Error while running freshclam update", e);
    }
}
```

### 🕒 Planification automatique

```java
@Scheduled(cron = "0 0 0 * * *") // Scheduled to run every day at midnight
```

- C’est une annotation Spring qui exécute automatiquement la méthode `updateVirusDefinitions()` tous les jours à minuit.
- Le cron `"0 0 0 * * *"` signifie : `seconde = 0`, `minute = 0`, `heure = 0`, tous les jours, tous les mois.

> ✅ Nécessite d’avoir @EnableScheduling activé dans ta config Spring Boot.
> 

### ⚙️ Exécution du processus `freshclam`

```java
ProcessBuilder pb = new ProcessBuilder("freshclam");
pb.redirectErrorStream(true);
```

- `ProcessBuilder` sert à lancer une commande système depuis Java (comme dans un terminal).
- Ici, il lance le binaire `freshclam`, qui met à jour la base de définitions de virus.
- `redirectErrorStream(true)` fusionne la sortie standard et la sortie d’erreur pour ne rien manquer dans les logs.

### 📥 Lecture des logs de freshclam

```java
Process process = pb.start();

try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(process.getInputStream()))) {
    String line;
    while ((line = reader.readLine()) != null) {
        log.info("[freshclam] {}", line);
    }
}
```

- Le processus est lancé.
- On lit chaque ligne de sortie du processus et on l’affiche dans les logs de l’appli avec un petit préfixe `[freshclam]`.

### ✅ Vérification du résultat

```java
int exitCode = process.waitFor();
if (exitCode == 0) {
    log.info("ClamAV database successfully updated.");
} else {
    log.error("freshclam exited with code {}", exitCode);
}
```

- `waitFor()` bloque jusqu’à ce que le processus se termine.
- Si le code de sortie = 0, tout s’est bien passé.
- Sinon, une erreur est loggée avec le code de sortie.

### 🧯 Gestion des erreurs

```java
} catch (Exception e) {
    log.error("Error while running freshclam update", e);
}
```

- Si une erreur survient à n’importe quelle étape (commande introuvable, crash, problème de droits...), elle est attrapée et loggée proprement sans bloquer le reste de l’application.

## 🧪 Test de l’API

Pour tester ton antivirus, télécharge un faux fichier EICAR (inoffensif, utilisé pour les tests).

[secure.eicar.org](https://secure.eicar.org/eicar.com.txt)

Puis upload-le sur ton endpoint `/scan`.

```bash
curl -X POST http://localhost:8080/api/v1/scans \
	-F "file=@/home/Documents/test.txt"
```

```json
{
    "filename": "test.txt",
    "extension": "txt",
    "sizeInBytes": 68,
    "scanDurationMillis": 12,
    "virusName": "Win.Test.EICAR_HDB-1",
    "rawResponse": "stream: Win.Test.EICAR_HDB-1 FOUND",
    "infected": true
}
```

## Installation et déploiement de l’API

Après avoir développé notre API de scan antivirus avec ClamAV, il est temps de simplifier son installation et son lancement. Pour cela, on utilise Docker (pour créer une image de l’application) et Docker Compose (pour tout automatiser : build + run).

### 🛠️ Construction de l’image Docker

On commence par créer un `Dockerfile` qui :

1. Construit l'application Java (`mvn clean package`)
2. Installe ClamAV et OpenJDK sur une image Fedora
3. Configure `clamd` pour être accessible en TCP sur `localhost:3310`
4. Met à jour la base de signatures virales avec `freshclam`
5. Lance à la fois `clamd` et l’application Java

Voici le contenu du `Dockerfile` :

```docker
# Étape de construction
FROM maven:latest AS builder
WORKDIR /app

# Construire l'application Java
COPY . .
RUN mvn clean package -DskipTests

# Image finale basée sur Fedora
FROM fedora:latest
WORKDIR /app

# Installer ClamAV, clamd, freshclam et OpenJDK
RUN dnf install -y clamav clamav-update clamav-server-systemd java-21-openjdk && \
    dnf clean all

# Préparer les fichiers de configuration ClamAV
RUN mkdir -p /etc/clamav && \
    cp /etc/clamd.d/scan.conf /etc/clamav/clamd.conf && \
    cp /etc/freshclam.conf /etc/clamav/freshclam.conf

# Modifier la configuration pour clamd
RUN sed -i 's/^Example/#Example/' /etc/clamav/clamd.conf && \
    sed -i 's/^#TCPSocket 3310/TCPSocket 3310/' /etc/clamav/clamd.conf && \
    sed -i 's/^#TCPAddr 127.0.0.1/TCPAddr 127.0.0.1/' /etc/clamav/clamd.conf && \
    sed -i 's|^LocalSocket .*|#LocalSocket /run/clamd.scan/clamd.sock|' /etc/clamav/clamd.conf

# Mettre à jour la base de données de virus
RUN freshclam --config-file=/etc/clamav/freshclam.conf

# Copier le fichier JAR généré
COPY --from=builder /app/target/clamav-api.jar /app/app.jar

# Lancer à la fois clamd et l'application Java
CMD clamd --config-file=/etc/clamav/clamd.conf & java -jar /app/app.jar
```

### 🧠 Ce que fait notre Dockerfile  :

| Étape | Action |
| --- | --- |
| Construction | Compile l’app Java avec Maven |
| Système | Bascule sur Fedora pour installer les outils Linux nécessaires |
| Installation de ClamAV | Installe `clamav`, `clamav-update`, `clamd`, et OpenJDK |
| Configuration de ClamAV | Active le mode TCP (nécessaire pour que ton app puisse parler à Clamd) |
| Mise à jour de la DB | Utilise `freshclam` pour récupérer les dernières signatures |
| Exécution | Démarre `clamd` **et** ton app dans le même conteneur |

### 📦 Mise en place de Docker Compose

Maintenant que notre image est prête, Docker Compose va nous permettre de tout déployer automatiquement avec un seul fichier `docker-compose.yml`.

Voici le `docker-compose.yml` :

```docker
version: '3'

services:
  clamav-api:
    build: .
    container_name: clamscan-api
    ports:
      - "8080:8080"
    restart: unless-stopped
```

| Élément | Description |
| --- | --- |
| `version: '3'` | Utilise la version 3 du format Docker Compose |
| `services` | Définit la liste des services à déployer (ici, un seul : `clamav-api`) |
| `clamav-api` | Nom interne du service (utilisé pour les dépendances réseau par exemple) |
| `build: .` | Construit l'image Docker à partir du `Dockerfile` situé dans le répertoire courant |
| `container_name: clamscan-api` | Force un nom personnalisé pour le conteneur (au lieu d'un nom généré automatiquement) |
| `ports` | Expose le port `8080` du conteneur sur `localhost:8080` pour accéder à l'API |
| `restart: unless-stopped` | Redémarre automatiquement le conteneur si celui-ci s'arrête inopinément (très utile en production) |

Avec ces deux fichiers on peux lancer l'application en une seule commande :

```bash
docker compose up -d
```

ClamAV est prêt, la base de données est à jour, ton API est déployée, et tout communique en TCP localement entre l'app et Clamd. Simple et efficace !

## Solution clé en main

Si vous ne souhaitez pas gérer le développent et la maintenance de l’antivirus vous-même, j’ai mis en ligne une version web disponible à l’URL [https://clamscan.com](https://clamscan.com/)

[ClamScan - Scan file by API](https://clamscan.com/)

Une API public arrive bientôt également.

Bon dev 👋
