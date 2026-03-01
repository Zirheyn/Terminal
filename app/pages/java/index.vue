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

const steps: JavaRoadmapStep[] = [
  {
    id: 1,
    phase: 'Foundations',
    title: 'Install JDK and Tooling',
    side: 'left',
    points: ['Install JDK 21+', 'Set JAVA_HOME/PATH', 'Use IntelliJ or VS Code'],
    path: '/java/install-jdk-and-tooling'
  },
  {
    id: 2,
    phase: 'Core Syntax',
    title: 'JVM, JDK, JRE Mental Model',
    side: 'right',
    points: ['How bytecode works', 'Class loading basics', 'Compilation vs runtime']
  },
  {
    id: 3,
    phase: 'Language Basics',
    title: 'Variables, Types, Operators',
    side: 'left',
    points: ['Primitives vs wrappers', 'Type casting', 'Arithmetic and logical ops']
  },
  {
    id: 4,
    phase: 'Language Basics',
    title: 'Control Flow',
    side: 'right',
    points: ['if/else, switch', 'for/while/do-while', 'break, continue, return']
  },
  {
    id: 5,
    phase: 'Language Basics',
    title: 'Methods and Parameters',
    side: 'left',
    points: ['Method signatures', 'Pass-by-value behavior', 'Overloading']
  },
  {
    id: 6,
    phase: 'OOP',
    title: 'Classes and Objects',
    side: 'right',
    points: ['Fields and constructors', 'Instance vs static members', 'Encapsulation']
  },
  {
    id: 7,
    phase: 'OOP',
    title: 'Inheritance and Polymorphism',
    side: 'left',
    points: ['extends, super', 'Method overriding', 'Dynamic dispatch']
  },
  {
    id: 8,
    phase: 'OOP',
    title: 'Interfaces and Abstract Classes',
    side: 'right',
    points: ['Contract-first design', 'Default/static methods', 'Composition over inheritance']
  },
  {
    id: 9,
    phase: 'Error Handling',
    title: 'Exceptions',
    side: 'left',
    points: ['Checked vs unchecked', 'try/catch/finally', 'Custom exception types']
  },
  {
    id: 10,
    phase: 'Core APIs',
    title: 'Strings and Date/Time',
    side: 'right',
    points: ['StringBuilder, immutability', 'java.time API', 'Formatting and parsing']
  },
  {
    id: 11,
    phase: 'Core APIs',
    title: 'Collections Fundamentals',
    side: 'left',
    points: ['List, Set, Map', 'When to use each', 'Big-O basics']
  },
  {
    id: 12,
    phase: 'Core APIs',
    title: 'Generics',
    side: 'right',
    points: ['Type parameters', 'Wildcards ? extends/super', 'Generic methods']
  },
  {
    id: 13,
    phase: 'Core APIs',
    title: 'Enum, Record, Sealed Classes',
    side: 'left',
    points: ['Model finite states', 'Immutable DTOs with record', 'Restrict inheritance']
  },
  {
    id: 14,
    phase: 'Functional Java',
    title: 'Lambdas and Functional Interfaces',
    side: 'right',
    points: ['Predicate, Function, Consumer', 'Method references', 'Higher-order style']
  },
  {
    id: 15,
    phase: 'Functional Java',
    title: 'Streams',
    side: 'left',
    points: ['map/filter/reduce', 'Collectors', 'Avoid overusing streams']
  },
  {
    id: 16,
    phase: 'Functional Java',
    title: 'Optional',
    side: 'right',
    points: ['Null-safe flow', 'map/flatMap/orElse', 'API boundaries best practices']
  },
  {
    id: 17,
    phase: 'I/O',
    title: 'Files, Paths, NIO.2',
    side: 'left',
    points: ['Read/write files', 'Directory traversal', 'Buffered APIs']
  },
  {
    id: 18,
    phase: 'Concurrency',
    title: 'Threads and Synchronization',
    side: 'right',
    points: ['Thread lifecycle', 'synchronized and locks', 'Race conditions']
  },
  {
    id: 19,
    phase: 'Concurrency',
    title: 'ExecutorService',
    side: 'left',
    points: ['Thread pools', 'Callable/Future', 'Graceful shutdown']
  },
  {
    id: 20,
    phase: 'Concurrency',
    title: 'CompletableFuture',
    side: 'right',
    points: ['Async pipelines', 'Error handling', 'Composing async tasks']
  },
  {
    id: 21,
    phase: 'Build Tooling',
    title: 'Maven or Gradle',
    side: 'left',
    points: ['Dependency scopes', 'Plugins and lifecycle', 'Profiles']
  },
  {
    id: 22,
    phase: 'Data',
    title: 'SQL Fundamentals',
    side: 'right',
    points: ['Joins and indexes', 'Transactions', 'Query optimization basics']
  },
  {
    id: 23,
    phase: 'Data',
    title: 'JDBC',
    side: 'left',
    points: ['Connections and statements', 'Prepared statements', 'Mapping results']
  },
  {
    id: 24,
    phase: 'Data',
    title: 'JPA/Hibernate',
    side: 'right',
    points: ['Entity mapping', 'Lazy vs eager loading', 'N+1 and transaction boundaries']
  },
  {
    id: 25,
    phase: 'Backend',
    title: 'Spring Boot Essentials',
    side: 'left',
    points: ['Controllers and services', 'Configuration/profiles', 'Validation and error responses']
  },
  {
    id: 26,
    phase: 'Security',
    title: 'Spring Security Basics',
    side: 'right',
    points: ['AuthN/AuthZ concepts', 'JWT/session approaches', 'Endpoint protection']
  },
  {
    id: 27,
    phase: 'Testing',
    title: 'JUnit 5 + Mockito',
    side: 'left',
    points: ['Unit tests', 'Mocks and stubs', 'Test naming and structure']
  },
  {
    id: 28,
    phase: 'Testing',
    title: 'Integration Tests',
    side: 'right',
    points: ['SpringBootTest', 'Testcontainers', 'Repository/API integration']
  },
  {
    id: 29,
    phase: 'Delivery',
    title: 'Docker + CI/CD',
    side: 'left',
    points: ['Containerize app', 'Build pipelines', 'Deploy strategies']
  },
  {
    id: 30,
    phase: 'Production',
    title: 'Observability and Performance',
    side: 'right',
    points: ['Structured logs', 'Metrics and tracing', 'Profiling and tuning']
  }
]

const localePath = useLocalePath()
const { locale } = useI18n()
const cta = computed(() => locale.value === 'fr'
  ? { open: 'Ouvrir le tutoriel >', soon: 'Bientôt disponible' }
  : { open: 'Open Tutorial >', soon: 'Coming soon' }
)

useSeoMeta({
  title: 'Java Roadmap',
  description: 'Visual Java learning roadmap from fundamentals to production-grade backend engineering.',
  ogTitle: 'Java Roadmap | Briac // Terminal Portfolio',
  ogDescription: 'Visual Java learning roadmap from fundamentals to production-grade backend engineering.'
})
</script>

<template>
  <section class="java-roadmap space-y-8">
    <header class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">Learning Path</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">Java Roadmap A to Z</h1>
      <p class="max-w-3xl text-zinc-300">
        A practical path to go from Java fundamentals to building, testing, and shipping real backend systems.
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
            {{ cta.open }}
          </NuxtLink>
          <p v-else class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {{ cta.soon }}
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
