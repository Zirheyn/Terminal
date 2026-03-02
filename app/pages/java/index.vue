<script setup lang="ts">
import { useI18n, useLocalePath } from '#i18n'

interface JavaRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

interface JavaRoadmapStepTranslation {
  title: string
  phase: string
  points: string[]
}

const stepsEn: JavaRoadmapStep[] = [
  {
    id: 1,
    phase: 'Foundations',
    title: 'Java Origins, Versions and LTS',
    side: 'right',
    points: [
      'History of Java and JVM ecosystem',
      'Release cadence and versioning model',
      'What LTS means and when to upgrade',
      'Current Java language state',
      'Where Java is used (software, backend, Android)'
    ],
    path: '/java/java-ecosystem-and-versioning-basics'
  },
  {
    id: 2,
    phase: 'Foundations',
    title: 'Install JDK and Tooling',
    side: 'left',
    points: ['Install JDK 21+', 'Set JAVA_HOME/PATH', 'Use IntelliJ or VS Code'],
    path: '/java/install-jdk-and-tooling'
  },
  {
    id: 3,
    phase: 'Core Syntax',
    title: 'JVM, JDK, JRE Mental Model',
    side: 'right',
    points: ['How bytecode works', 'Class loading basics', 'Compilation vs runtime'],
    path: '/java/core-syntax-jvm-jdk-jre-mental-model'
  },
  {
    id: 4,
    phase: 'Language Basics',
    title: 'Variables, Types, Operators',
    side: 'left',
    points: ['Primitives vs wrappers', 'Type casting', 'Arithmetic and logical ops'],
    path: '/java/language-basics-variables-types-operators'
  },
  {
    id: 5,
    phase: 'Language Basics',
    title: 'Control Flow',
    side: 'right',
    points: ['if/else, switch', 'for/while/do-while', 'break, continue, return'],
    path: '/java/language-basics-control-flow'
  },
  {
    id: 6,
    phase: 'Language Basics',
    title: 'Methods and Parameters',
    side: 'left',
    points: ['Method signatures', 'Pass-by-value behavior', 'Overloading'],
    path: '/java/language-basics-methods-and-parameters'
  },
  {
    id: 7,
    phase: 'OOP',
    title: 'Classes and Objects',
    side: 'right',
    points: ['Fields and constructors', 'Instance vs static members', 'Encapsulation'],
    path: '/java/oop-classes-and-objects'
  },
  {
    id: 8,
    phase: 'OOP',
    title: 'Inheritance and Polymorphism',
    side: 'left',
    points: ['extends, super', 'Method overriding', 'Dynamic dispatch'],
    path: '/java/oop-inheritance-and-polymorphism'
  },
  {
    id: 9,
    phase: 'OOP',
    title: 'Interfaces and Abstract Classes',
    side: 'right',
    points: ['Contract-first design', 'Default/static methods', 'Composition over inheritance'],
    path: '/java/oop-interfaces-and-abstract-classes'
  },
  {
    id: 10,
    phase: 'Error Handling',
    title: 'Exceptions',
    side: 'left',
    points: ['Checked vs unchecked', 'try/catch/finally', 'Custom exception types'],
    path: '/java/error-handling-exceptions'
  },
  {
    id: 11,
    phase: 'Core APIs',
    title: 'Strings and Date/Time',
    side: 'right',
    points: ['StringBuilder, immutability', 'java.time API', 'Formatting and parsing'],
    path: '/java/core-apis-strings-and-datetime'
  },
  {
    id: 12,
    phase: 'Core APIs',
    title: 'Collections Fundamentals',
    side: 'left',
    points: ['List, Set, Map', 'When to use each', 'Big-O basics'],
    path: '/java/core-apis-collections-fundamentals'
  },
  {
    id: 13,
    phase: 'Core APIs',
    title: 'Generics',
    side: 'right',
    points: ['Type parameters', 'Wildcards ? extends/super', 'Generic methods'],
    path: '/java/core-apis-generics'
  },
  {
    id: 14,
    phase: 'Core APIs',
    title: 'Enum, Record, Sealed Classes',
    side: 'left',
    points: ['Model finite states', 'Immutable DTOs with record', 'Restrict inheritance'],
    path: '/java/core-apis-enum-record-sealed-classes'
  },
  {
    id: 15,
    phase: 'Functional Java',
    title: 'Lambdas and Functional Interfaces',
    side: 'right',
    points: ['Predicate, Function, Consumer', 'Method references', 'Higher-order style'],
    path: '/java/functional-java-lambdas-and-functional-interfaces'
  },
  {
    id: 16,
    phase: 'Functional Java',
    title: 'Streams',
    side: 'left',
    points: ['map/filter/reduce', 'Collectors', 'Avoid overusing streams'],
    path: '/java/functional-java-streams'
  },
  {
    id: 17,
    phase: 'Functional Java',
    title: 'Optional',
    side: 'right',
    points: ['Null-safe flow', 'map/flatMap/orElse', 'API boundaries best practices'],
    path: '/java/functional-java-optional'
  },
  {
    id: 18,
    phase: 'I/O',
    title: 'Files, Paths, NIO.2',
    side: 'left',
    points: ['Read/write files', 'Directory traversal', 'Buffered APIs'],
    path: '/java/io-files-paths-nio2'
  },
  {
    id: 19,
    phase: 'Concurrency',
    title: 'Threads and Synchronization',
    side: 'right',
    points: ['Thread lifecycle', 'synchronized and locks', 'Race conditions'],
    path: '/java/concurrency-threads-and-synchronization'
  },
  {
    id: 20,
    phase: 'Concurrency',
    title: 'ExecutorService',
    side: 'left',
    points: ['Thread pools', 'Callable/Future', 'Graceful shutdown'],
    path: '/java/concurrency-executorservice'
  },
  {
    id: 21,
    phase: 'Concurrency',
    title: 'CompletableFuture',
    side: 'right',
    points: ['Async pipelines', 'Error handling', 'Composing async tasks'],
    path: '/java/concurrency-completablefuture'
  },
  {
    id: 22,
    phase: 'Build Tooling',
    title: 'Maven or Gradle',
    side: 'left',
    points: ['Dependency scopes', 'Plugins and lifecycle', 'Profiles'],
    path: '/java/build-tooling-maven-or-gradle'
  },
  {
    id: 23,
    phase: 'Data',
    title: 'SQL Fundamentals',
    side: 'right',
    points: ['Joins and indexes', 'Transactions', 'Query optimization basics'],
    path: '/java/data-sql-fundamentals'
  },
  {
    id: 24,
    phase: 'Data',
    title: 'JDBC',
    side: 'left',
    points: ['Connections and statements', 'Prepared statements', 'Mapping results'],
    path: '/java/data-jdbc'
  },
  {
    id: 25,
    phase: 'Data',
    title: 'JPA/Hibernate',
    side: 'right',
    points: ['Entity mapping', 'Lazy vs eager loading', 'N+1 and transaction boundaries'],
    path: '/java/data-jpa-hibernate'
  },
  {
    id: 26,
    phase: 'Backend',
    title: 'Backend API Essentials',
    side: 'left',
    points: ['Layered architecture', 'Configuration and validation', 'Error handling contracts'],
    path: '/java/backend-api-essentials'
  },
  {
    id: 27,
    phase: 'Security',
    title: 'Application Security Basics',
    side: 'right',
    points: ['AuthN/AuthZ concepts', 'Token/session approaches', 'Endpoint hardening'],
    path: '/java/security-application-security-basics'
  },
  {
    id: 28,
    phase: 'Testing',
    title: 'JUnit 5 + Mockito',
    side: 'left',
    points: ['Unit tests', 'Mocks and stubs', 'Test naming and structure'],
    path: '/java/testing-junit5-mockito'
  },
  {
    id: 29,
    phase: 'Delivery',
    title: 'Docker + CI/CD',
    side: 'right',
    points: ['Containerize app', 'Build pipelines', 'Deploy strategies'],
    path: '/java/delivery-docker-cicd'
  },
  {
    id: 30,
    phase: 'Production',
    title: 'Observability and Performance',
    side: 'left',
    points: ['Structured logs', 'Metrics and tracing', 'Profiling and tuning'],
    path: '/java/production-observability-and-performance'
  }
]

const localePath = useLocalePath()
const { locale } = useI18n()

const frStepTextById: Record<number, JavaRoadmapStepTranslation> = {
  1: {
    phase: 'Fondations',
    title: 'Origines de Java, versions et LTS',
    points: [
      'Histoire de Java et ecosysteme JVM',
      'Cadence des releases et modele de versioning',
      'Ce que signifie LTS et quand migrer',
      'Etat actuel du langage Java',
      'Ou Java est utilise (logiciels, backend, Android)'
    ]
  },
  2: {
    phase: 'Fondations',
    title: 'Installer le JDK et l outillage',
    points: ['Installer JDK 21+', 'Configurer JAVA_HOME/PATH', 'Utiliser IntelliJ ou VS Code']
  },
  3: {
    phase: 'Syntaxe coeur',
    title: 'Modele mental JVM, JDK, JRE',
    points: ['Fonctionnement du bytecode', 'Bases du class loading', 'Compilation vs execution']
  },
  4: {
    phase: 'Bases du langage',
    title: 'Variables, types, operateurs',
    points: ['Primitifs vs wrappers', 'Cast de types', 'Operateurs arithmetiques et logiques']
  },
  5: {
    phase: 'Bases du langage',
    title: 'Controle de flux',
    points: ['if/else, switch', 'for/while/do-while', 'break, continue, return']
  },
  6: {
    phase: 'Bases du langage',
    title: 'Methodes et parametres',
    points: ['Signatures de methodes', 'Semantique pass-by-value', 'Surcharge (overloading)']
  },
  7: {
    phase: 'POO',
    title: 'Classes et objets',
    points: ['Champs et constructeurs', 'Membres instance vs static', 'Encapsulation']
  },
  8: {
    phase: 'POO',
    title: 'Heritage et polymorphisme',
    points: ['extends, super', 'Redefinition de methodes', 'Dispatch dynamique']
  },
  9: {
    phase: 'POO',
    title: 'Interfaces et classes abstraites',
    points: ['Design contract-first', 'Methodes default/static', 'Composition plutot que heritage']
  },
  10: {
    phase: 'Gestion des erreurs',
    title: 'Exceptions',
    points: ['Checked vs unchecked', 'try/catch/finally', 'Types d exceptions personnalisees']
  },
  11: {
    phase: 'APIs coeur',
    title: 'Strings et Date/Time',
    points: ['StringBuilder, immutabilite', 'API java.time', 'Formatage et parsing']
  },
  12: {
    phase: 'APIs coeur',
    title: 'Fondamentaux des collections',
    points: ['List, Set, Map', 'Quand utiliser chaque structure', 'Bases de complexite Big-O']
  },
  13: {
    phase: 'APIs coeur',
    title: 'Generiques',
    points: ['Parametres de type', 'Wildcards ? extends/super', 'Methodes generiques']
  },
  14: {
    phase: 'APIs coeur',
    title: 'Enum, Record, Sealed Classes',
    points: ['Modeliser des etats finis', 'DTO immuables avec record', 'Restreindre l heritage']
  },
  15: {
    phase: 'Java fonctionnel',
    title: 'Lambdas et interfaces fonctionnelles',
    points: ['Predicate, Function, Consumer', 'References de methodes', 'Style higher-order']
  },
  16: {
    phase: 'Java fonctionnel',
    title: 'Streams',
    points: ['map/filter/reduce', 'Collectors', 'Eviter la sur-utilisation des streams']
  },
  17: {
    phase: 'Java fonctionnel',
    title: 'Optional',
    points: ['Flux null-safe', 'map/flatMap/orElse', 'Bonnes pratiques aux frontieres d API']
  },
  18: {
    phase: 'I/O',
    title: 'Fichiers, Paths, NIO.2',
    points: ['Lire/ecrire des fichiers', 'Parcours de repertoires', 'APIs bufferisees']
  },
  19: {
    phase: 'Concurrence',
    title: 'Threads et synchronisation',
    points: ['Cycle de vie des threads', 'synchronized et locks', 'Race conditions']
  },
  20: {
    phase: 'Concurrence',
    title: 'ExecutorService',
    points: ['Pools de threads', 'Callable/Future', 'Graceful shutdown']
  },
  21: {
    phase: 'Concurrence',
    title: 'CompletableFuture',
    points: ['Pipelines asynchrones', 'Gestion des erreurs', 'Composition de taches async']
  },
  22: {
    phase: 'Outils de build',
    title: 'Maven ou Gradle',
    points: ['Scopes de dependances', 'Plugins et cycle de vie', 'Profils']
  },
  23: {
    phase: 'Donnees',
    title: 'Fondamentaux SQL',
    points: ['Joins et index', 'Transactions', 'Bases d optimisation de requetes']
  },
  24: {
    phase: 'Donnees',
    title: 'JDBC',
    points: ['Connexions et statements', 'Prepared statements', 'Mapping des resultats']
  },
  25: {
    phase: 'Donnees',
    title: 'JPA/Hibernate',
    points: ['Mapping d entites', 'Lazy vs eager loading', 'N+1 et frontieres transactionnelles']
  },
  26: {
    phase: 'Backend',
    title: 'Essentials API backend',
    points: ['Architecture en couches', 'Configuration et validation', 'Contrats de gestion d erreurs']
  },
  27: {
    phase: 'Securite',
    title: 'Bases de la securite applicative',
    points: ['Concepts AuthN/AuthZ', 'Approches token/session', 'Durcissement des endpoints']
  },
  28: {
    phase: 'Tests',
    title: 'JUnit 5 + Mockito',
    points: ['Tests unitaires', 'Mocks et stubs', 'Nommage et structure des tests']
  },
  29: {
    phase: 'Delivery',
    title: 'Docker + CI/CD',
    points: ['Containeriser l application', 'Pipelines de build', 'Strategies de deploiement']
  },
  30: {
    phase: 'Production',
    title: 'Observabilite et performance',
    points: ['Logs structures', 'Metriques et tracing', 'Profiling et tuning']
  }
}

const steps = computed<JavaRoadmapStep[]>(() => {
  if (locale.value !== 'fr') {
    return stepsEn
  }

  return stepsEn.map((step) => {
    const translation = frStepTextById[step.id]
    if (!translation) {
      return step
    }
    return {
      ...step,
      title: translation.title,
      phase: translation.phase,
      points: translation.points
    }
  })
})

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: 'Parcours d apprentissage',
      title: 'Roadmap Java de A a Z',
      description: 'Un parcours pratique pour passer des fondamentaux Java a la conception, au test et a la livraison de systemes backend.',
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap Java | Briac',
      seoDescription: 'Roadmap visuelle pour apprendre Java, des bases jusqu a la production backend.',
      seoOgTitle: 'Roadmap Java | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'Java Roadmap A to Z',
      description: 'A practical path to go from Java fundamentals to building, testing, and shipping real backend systems.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'Java Roadmap | Briac',
      seoDescription: 'Visual Java learning roadmap from fundamentals to production-grade backend engineering.',
      seoOgTitle: 'Java Roadmap | Briac // Terminal Portfolio'
    }
)

useSeoMeta({
  title: () => pageUi.value.seoTitle,
  description: () => pageUi.value.seoDescription,
  ogTitle: () => pageUi.value.seoOgTitle,
  ogDescription: () => pageUi.value.seoDescription
})
</script>

<template>
  <section class="java-roadmap space-y-8">
    <header class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">{{ pageUi.kicker }}</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">{{ pageUi.title }}</h1>
      <p class="max-w-3xl text-zinc-300">
        {{ pageUi.description }}
      </p>
    </header>

    <div class="roadmap-wrap">
      <div class="roadmap-line" aria-hidden="true" />

      <article
        v-for="step in steps"
        :key="step.id"
        class="roadmap-node"
        :class="step.side === 'left' ? 'node-left' : 'node-right'"
      >
        <div class="node-dot" aria-hidden="true">{{ step.id }}</div>

        <div class="node-card">
          <p class="node-phase">{{ step.phase }}</p>
          <h2 class="node-title">{{ step.title }}</h2>
          <ul class="node-list">
            <li v-for="point in step.points" :key="point">{{ point }}</li>
          </ul>
          <NuxtLink
            v-if="step.path"
            :to="localePath(step.path)"
            class="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 no-underline hover:underline"
          >
            {{ pageUi.open }}
          </NuxtLink>
          <p v-else class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {{ pageUi.soon }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.java-roadmap {
  max-width: 1100px;
  margin: 0 auto;
}

.roadmap-wrap {
  position: relative;
  display: grid;
  gap: 1.4rem;
  padding: 0.5rem 0;
}

.roadmap-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(to bottom, #2d2d2d, #8a8a8a 45%, #2d2d2d);
}

.roadmap-node {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.node-left .node-card {
  grid-column: 1;
  margin-right: 2rem;
}

.node-right .node-card {
  grid-column: 2;
  margin-left: 2rem;
}

.node-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2rem;
  height: 2rem;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border: 2px solid #fff;
  background: #000;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  z-index: 2;
}

.node-card {
  border: 2px solid #3e3e3e;
  background: #070707;
  padding: 1rem;
  transition: border-color 120ms ease, transform 120ms ease;
}

.node-card:hover {
  border-color: #fff;
  transform: translateY(-2px);
}

.node-phase {
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9f9f9f;
}

.node-title {
  margin: 0.4rem 0 0.7rem 0;
  font-size: clamp(1rem, 0.9rem + 0.35vw, 1.35rem);
  line-height: 1.15;
  text-transform: uppercase;
}

.node-list {
  margin: 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.45rem;
  color: #d8d8d8;
}

.node-list li {
  line-height: 1.45;
}

@media (max-width: 900px) {
  .roadmap-line {
    left: 0.7rem;
    transform: none;
  }

  .roadmap-node {
    grid-template-columns: 1fr;
    padding-left: 2rem;
  }

  .node-left .node-card,
  .node-right .node-card {
    grid-column: 1;
    margin: 0;
  }

  .node-dot {
    left: 0.7rem;
    transform: translate(-50%, -50%);
  }
}
</style>
