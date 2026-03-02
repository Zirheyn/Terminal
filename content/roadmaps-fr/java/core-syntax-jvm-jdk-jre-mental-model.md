---
title: Syntaxe de base - Modèle mental JVM, JDK, JRE
description: Comprendre le fonctionnement du bytecode Java, les bases du class loading, et la différence entre compilation et runtime.
date: 2024-12-22
tags: [java, jvm, jdk, jre, core-syntax]
draft: false
readingTime: 8 min
---

## Pourquoi cette étape est importante

La plupart des incompréhensions en Java viennent d'une confusion entre les outils et l'exécution.
Si tu comprends clairement les rôles du JDK/JRE/JVM, le flux du bytecode et le class loading, le debug devient beaucoup plus simple.

## JVM, JDK, JRE : modèle mental

Utilise cette séparation simple :

| Terme | Rôle principal | Contenu |
|---|---|---|
| JVM | Exécute le bytecode Java | Class loader, compilateur JIT, GC, moteur d'exécution |
| JRE | Environnement d'exécution | JVM + bibliothèques runtime |
| JDK | Kit de développement | JRE + compilateur (`javac`) + outils (`javadoc`, `jar`, etc.) |

### Note importante aujourd'hui

Sur les versions modernes (Java 11+), les équipes installent généralement un **JDK complet** partout (local, test, souvent production).
L'usage d'un JRE standalone est moins fréquent qu'avant.

## Comment fonctionne le bytecode

Le code source Java (`.java`) est compilé en bytecode (`.class`), puis exécuté par la JVM.

Flux :

1. Écriture du code source
2. Compilation avec `javac`
3. Exécution avec `java` (JVM)

### Exemple

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello JVM");
    }
}
```

Compiler et exécuter :

```bash
javac Main.java
java Main
```

Inspecter le bytecode généré :

```bash
javap -c Main
```

La JVM exécute ces instructions, puis optimise les chemins chauds via le JIT pendant l'exécution.

## Bases du class loading

Avant l'exécution, les classes doivent être chargées et préparées.

### Hiérarchie simplifiée des class loaders

- **Bootstrap ClassLoader** : classes cœur du JDK (`java.lang.*`, etc.)
- **Platform ClassLoader** : bibliothèques de la plateforme
- **Application ClassLoader** : classes de ton application via classpath/modulepath

### Phases du cycle de vie d'une classe

1. **Loading** : localisation et lecture du bytecode
2. **Linking** :
   - Verification (vérification du bytecode)
   - Preparation (allocation des champs statiques)
   - Resolution (liaison des références symboliques)
3. **Initialization** : exécution des blocs statiques et initialisation des valeurs statiques

Ce modèle explique des erreurs comme `ClassNotFoundException` ou `NoClassDefFoundError`.

## Compilation vs runtime

Ce sont deux types de problèmes différents.

### Compilation (avec `javac`)

Erreurs détectées avant l'exécution :

- erreurs de syntaxe
- incompatibilité de types
- symboles manquants

### Runtime (dans la JVM pendant l'exécution)

Erreurs détectées à l'exécution :

- `NullPointerException`
- `ArithmeticException`
- problèmes de classpath/class loading
- problèmes de performance ou mémoire

Tu peux donc compiler sans erreur et échouer au runtime.

## Checklist pratique

- Utiliser la même version de JDK en local, test et production
- Vérifier avec :

```bash
java -version
javac -version
```

- Garder un classpath/modulepath explicite dans les scripts
- Distinguer clairement erreurs de compilation et erreurs runtime dans les logs

## Erreurs fréquentes à éviter

- Installer uniquement un runtime alors qu'il faut compiler
- Mélanger plusieurs versions de Java entre IDE et terminal
- Penser que le chargement de classes est “plat” (il est hiérarchique)
- Interpréter les exceptions runtime comme des problèmes de compilation

## À retenir

Au plus simple :

- **Le JDK construit le code**
- **La JVM exécute le code**
- **Le bytecode fait le pont**
- **Le class loading pilote la disponibilité des classes au runtime**

Avec ce modèle clair, les prochaines étapes Java deviennent nettement plus faciles.
