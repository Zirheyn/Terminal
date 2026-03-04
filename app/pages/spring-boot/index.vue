<script setup lang="ts">
import { useI18n } from '#i18n'

interface SpringBootRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const stepsEn: SpringBootRoadmapStep[] = [
  {
    id: 1,
    phase: 'Foundations',
    title: 'Spring Boot Fundamentals',
    side: 'left',
    points: ['What Spring Boot solves', 'Auto-configuration basics', 'Starter dependencies']
  },
  {
    id: 2,
    phase: 'Foundations',
    title: 'Project Setup',
    side: 'right',
    points: ['Initializr workflow', 'Folder conventions', 'Maven or Gradle setup']
  },
  {
    id: 3,
    phase: 'Core',
    title: 'Dependency Injection and Beans',
    side: 'left',
    points: ['Bean lifecycle', 'Constructor injection', 'Configuration classes']
  },
  {
    id: 4,
    phase: 'Core',
    title: 'Configuration and Profiles',
    side: 'right',
    points: ['application.yml strategy', 'local/staging/production profiles', 'Secrets management basics']
  },
  {
    id: 5,
    phase: 'Web',
    title: 'REST Controllers',
    side: 'left',
    points: ['Request mapping', 'Request/response DTOs', 'HTTP status handling']
  },
  {
    id: 6,
    phase: 'Web',
    title: 'Validation and Error Handling',
    side: 'right',
    points: ['Bean Validation', 'Global exception handling', 'Consistent API error contracts']
  },
  {
    id: 7,
    phase: 'Architecture',
    title: 'Layered Design',
    side: 'left',
    points: ['Controller/service/repository boundaries', 'Business logic placement', 'DTO mapping strategy']
  },
  {
    id: 8,
    phase: 'Data',
    title: 'Spring Data JPA Basics',
    side: 'right',
    points: ['Entities and repositories', 'CRUD and pagination', 'Query method conventions']
  },
  {
    id: 9,
    phase: 'Data',
    title: 'CriteriaBuilder and Dynamic Queries',
    side: 'left',
    points: ['Build type-safe predicates', 'Compose dynamic filters', 'Specification-style query composition']
  },
  {
    id: 10,
    phase: 'Data',
    title: 'Database Migrations',
    side: 'right',
    points: ['Flyway basics', 'Versioned migrations', 'Environment-safe schema changes']
  },
  {
    id: 11,
    phase: 'Security',
    title: 'Security Fundamentals',
    side: 'left',
    points: ['Authentication vs authorization', 'Filter chain mental model', 'Endpoint protection']
  },
  {
    id: 12,
    phase: 'Security',
    title: 'JWT and API Key Approaches',
    side: 'right',
    points: ['Token validation flow', 'Key rotation basics', 'Security trade-offs']
  },
  {
    id: 13,
    phase: 'Testing',
    title: 'Unit Testing',
    side: 'left',
    points: ['JUnit 5 structure', 'Mockito usage', 'Given/When/Then style']
  },
  {
    id: 14,
    phase: 'Testing',
    title: 'Integration Testing',
    side: 'right',
    points: ['Repository and API tests', 'Testcontainers setup', 'Stable test data strategy']
  },
  {
    id: 15,
    phase: 'Performance',
    title: 'Caching Strategy',
    side: 'left',
    points: ['Cache abstraction', 'TTL and eviction strategy', 'Cache invalidation patterns']
  },
  {
    id: 16,
    phase: 'Performance',
    title: 'Async Processing',
    side: 'right',
    points: ['@Async basics', 'Executor thread pools', 'Async error handling']
  },
  {
    id: 17,
    phase: 'Performance',
    title: 'Scheduled Jobs',
    side: 'left',
    points: ['@Scheduled patterns', 'Cron vs fixed delay/rate', 'Idempotent background tasks']
  },
  {
    id: 18,
    phase: 'Observability',
    title: 'Actuator, Metrics and Tracing',
    side: 'right',
    points: ['Health and readiness probes', 'Micrometer metrics', 'Trace correlation']
  },
  {
    id: 19,
    phase: 'Delivery',
    title: 'Build and Containerization',
    side: 'left',
    points: ['Executable jars', 'Docker image strategy', 'Runtime configuration']
  },
  {
    id: 20,
    phase: 'Delivery',
    title: 'CI/CD Pipeline',
    side: 'right',
    points: ['Test gates', 'Artifact publishing', 'Progressive deployment']
  },
  {
    id: 21,
    phase: 'Production',
    title: 'Production Hardening',
    side: 'left',
    points: ['Secure defaults', 'Rollback strategy', 'Operational runbook mindset']
  }
]

const stepsFr: SpringBootRoadmapStep[] = [
  {
    id: 1,
    phase: 'Fondations',
    title: 'Fondamentaux Spring Boot',
    side: 'left',
    points: ['Ce que Spring Boot apporte', 'Bases de l auto-configuration', 'Dependances starters']
  },
  {
    id: 2,
    phase: 'Fondations',
    title: 'Initialisation du projet',
    side: 'right',
    points: ['Workflow Initializr', 'Conventions de dossiers', 'Setup Maven ou Gradle']
  },
  {
    id: 3,
    phase: 'Coeur',
    title: 'Injection de dependances et beans',
    side: 'left',
    points: ['Cycle de vie des beans', 'Injection par constructeur', 'Classes de configuration']
  },
  {
    id: 4,
    phase: 'Coeur',
    title: 'Configuration et profils',
    side: 'right',
    points: ['Strategie application.yml', 'Profils local/staging/production', 'Bases de gestion des secrets']
  },
  {
    id: 5,
    phase: 'Web',
    title: 'Controllers REST',
    side: 'left',
    points: ['Mapping des requetes', 'DTO de requete/reponse', 'Gestion des statuts HTTP']
  },
  {
    id: 6,
    phase: 'Web',
    title: 'Validation et gestion des erreurs',
    side: 'right',
    points: ['Bean Validation', 'Exception handling global', 'Contrats d erreurs API coherents']
  },
  {
    id: 7,
    phase: 'Architecture',
    title: 'Design en couches',
    side: 'left',
    points: ['Frontieres controller/service/repository', 'Placement de la logique metier', 'Strategie de mapping DTO']
  },
  {
    id: 8,
    phase: 'Donnees',
    title: 'Bases Spring Data JPA',
    side: 'right',
    points: ['Entites et repositories', 'CRUD et pagination', 'Conventions de methodes de requete']
  },
  {
    id: 9,
    phase: 'Donnees',
    title: 'CriteriaBuilder et requetes dynamiques',
    side: 'left',
    points: ['Construire des predicats type-safe', 'Composer des filtres dynamiques', 'Composition de requetes style Specification']
  },
  {
    id: 10,
    phase: 'Donnees',
    title: 'Migrations de base de donnees',
    side: 'right',
    points: ['Bases Flyway', 'Migrations versionnees', 'Changements de schema safe par environnement']
  },
  {
    id: 11,
    phase: 'Securite',
    title: 'Fondamentaux securite',
    side: 'left',
    points: ['Authentification vs autorisation', 'Modele mental filter chain', 'Protection des endpoints']
  },
  {
    id: 12,
    phase: 'Securite',
    title: 'Approches JWT et API Key',
    side: 'right',
    points: ['Flux de validation de token', 'Bases de rotation des cles', 'Trade-offs de securite']
  },
  {
    id: 13,
    phase: 'Tests',
    title: 'Tests unitaires',
    side: 'left',
    points: ['Structure JUnit 5', 'Utilisation Mockito', 'Style Given/When/Then']
  },
  {
    id: 14,
    phase: 'Tests',
    title: 'Tests d integration',
    side: 'right',
    points: ['Tests repository et API', 'Setup Testcontainers', 'Strategie de donnees de test stable']
  },
  {
    id: 15,
    phase: 'Performance',
    title: 'Strategie de cache',
    side: 'left',
    points: ['Abstraction de cache', 'Strategie TTL et eviction', 'Patterns d invalidation de cache']
  },
  {
    id: 16,
    phase: 'Performance',
    title: 'Traitements async',
    side: 'right',
    points: ['Bases de @Async', 'Pools de threads Executor', 'Gestion des erreurs async']
  },
  {
    id: 17,
    phase: 'Performance',
    title: 'Taches planifiees',
    side: 'left',
    points: ['Patterns @Scheduled', 'Cron vs fixed delay/rate', 'Taches de fond idempotentes']
  },
  {
    id: 18,
    phase: 'Observabilite',
    title: 'Actuator, metriques et tracing',
    side: 'right',
    points: ['Health/readiness probes', 'Metriques Micrometer', 'Correlation des traces']
  },
  {
    id: 19,
    phase: 'Delivery',
    title: 'Build et containerisation',
    side: 'left',
    points: ['Jars executables', 'Strategie d image Docker', 'Configuration runtime']
  },
  {
    id: 20,
    phase: 'Delivery',
    title: 'Pipeline CI/CD',
    side: 'right',
    points: ['Quality gates de test', 'Publication d artefacts', 'Deploiement progressif']
  },
  {
    id: 21,
    phase: 'Production',
    title: 'Durcissement production',
    side: 'left',
    points: ['Defaults securises', 'Strategie de rollback', 'Mentalite runbook operationnel']
  }
]

const { locale } = useI18n()

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: "Parcours d'apprentissage",
      title: 'Roadmap Spring Boot',
      description: "Une feuille de route progressive pour passer des bases Spring Boot a l'architecture, la securite, le testing et la production.",
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap Spring Boot | Briac',
      seoDescription: 'Roadmap visuelle Spring Boot, des fondamentaux a la production.',
      seoOgTitle: 'Roadmap Spring Boot | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'Spring Boot Roadmap',
      description: 'A progressive path from Spring Boot foundations to architecture, security, testing, and production operations.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'Spring Boot Roadmap | Briac',
      seoDescription: 'Visual Spring Boot roadmap from fundamentals to production delivery.',
      seoOgTitle: 'Spring Boot Roadmap | Briac // Terminal Portfolio'
    }
)

const steps = computed(() => locale.value === 'fr' ? stepsFr : stepsEn)

useSeoMeta({
  title: () => pageUi.value.seoTitle,
  description: () => pageUi.value.seoDescription,
  ogTitle: () => pageUi.value.seoOgTitle,
  ogDescription: () => pageUi.value.seoDescription
})
</script>

<template>
  <section class="springboot-roadmap space-y-8">
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
            :to="step.path"
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
.springboot-roadmap {
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
