<script setup lang="ts">
import { useI18n } from '#i18n'

interface VueRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const stepsEn: VueRoadmapStep[] = [
  { id: 1, phase: 'Foundations', title: 'What Vue.js Is', side: 'left', points: ['Progressive framework mental model', 'When Vue is a good fit', 'Core ecosystem overview'] },
  { id: 2, phase: 'Tooling', title: 'Local Setup and Project Bootstrapping', side: 'right', points: ['Node.js and package manager basics', 'Create a Vite app', 'Understand the project structure'] },
  { id: 3, phase: 'Templates', title: 'Template Syntax and Directives', side: 'left', points: ['Text interpolation', 'v-bind and v-on', 'v-if, v-show, and v-for'] },
  { id: 4, phase: 'Reactivity', title: 'Reactivity Fundamentals', side: 'right', points: ['ref and reactive', 'computed values', 'watch and watchEffect basics'] },
  { id: 5, phase: 'Components', title: 'Components, Props, and Events', side: 'left', points: ['Split UI into reusable units', 'Pass data with props', 'Emit events to parents'] },
  { id: 6, phase: 'Components', title: 'Slots and Component Composition', side: 'right', points: ['Default and named slots', 'Layout composition patterns', 'Build flexible UI APIs'] },
  { id: 7, phase: 'Composition API', title: 'setup() and Composables', side: 'left', points: ['Understand script setup', 'Extract reusable logic', 'Keep business logic isolated'] },
  { id: 8, phase: 'Forms', title: 'Forms and v-model', side: 'right', points: ['Two-way binding', 'Checkbox, select, and custom component bindings', 'Validation flow basics'] },
  { id: 9, phase: 'Routing', title: 'Vue Router Essentials', side: 'left', points: ['Nested routes', 'Dynamic params', 'Navigation guards and route-aware UI'] },
  { id: 10, phase: 'State', title: 'State Management with Pinia', side: 'right', points: ['Store design basics', 'Actions and getters', 'When local state is enough'] },
  { id: 11, phase: 'Data Fetching', title: 'Async Data and API Calls', side: 'left', points: ['Loading and error states', 'Fetch on mount or route change', 'Prevent UI flicker and race conditions'] },
  { id: 12, phase: 'Styling', title: 'Styling Strategies', side: 'right', points: ['Scoped CSS', 'Utility-first styling', 'Design systems and component consistency'] },
  { id: 13, phase: 'Quality', title: 'Accessibility and UX', side: 'left', points: ['Keyboard navigation', 'Semantic HTML', 'Accessible forms and feedback states'] },
  { id: 14, phase: 'Quality', title: 'Testing Vue Applications', side: 'right', points: ['Vitest basics', 'Vue Test Utils', 'Component tests vs integration tests'] },
  { id: 15, phase: 'Performance', title: 'Performance and Rendering', side: 'left', points: ['Use keys correctly', 'Lazy load heavy components', 'Avoid unnecessary watchers and re-renders'] },
  { id: 16, phase: 'SSR', title: 'Nuxt and Server Rendering', side: 'right', points: ['Why move from Vue to Nuxt', 'SSR and SSG basics', 'Shared state and data fetching constraints'] },
  { id: 17, phase: 'Delivery', title: 'Build, Deploy, and Monitor', side: 'left', points: ['Production builds', 'Environment variables', 'Basic observability and error tracking'] },
  { id: 18, phase: 'Production', title: 'Production Patterns', side: 'right', points: ['Auth flows', 'Role-based UI', 'Scaling a frontend codebase over time'] }
]

const stepsFr: VueRoadmapStep[] = [
  { id: 1, phase: 'Fondations', title: 'Comprendre Vue.js', side: 'left', points: ['Mental model du framework progressif', 'Quand Vue est un bon choix', 'Vue d ensemble de l ecosysteme'] },
  { id: 2, phase: 'Tooling', title: 'Setup local et creation du projet', side: 'right', points: ['Bases Node.js et package manager', 'Creer une app avec Vite', 'Comprendre la structure du projet'] },
  { id: 3, phase: 'Templates', title: 'Syntaxe template et directives', side: 'left', points: ['Interpolation de texte', 'v-bind et v-on', 'v-if, v-show et v-for'] },
  { id: 4, phase: 'Reactivite', title: 'Fondamentaux de la reactivite', side: 'right', points: ['ref et reactive', 'Valeurs computed', 'Bases de watch et watchEffect'] },
  { id: 5, phase: 'Composants', title: 'Composants, props et events', side: 'left', points: ['Decouper l UI en elements reutilisables', 'Passer des donnees avec les props', 'Remonter des events au parent'] },
  { id: 6, phase: 'Composants', title: 'Slots et composition de composants', side: 'right', points: ['Slots par defaut et nommes', 'Patterns de composition de layout', 'Construire des composants flexibles'] },
  { id: 7, phase: 'Composition API', title: 'setup() et composables', side: 'left', points: ['Comprendre script setup', 'Extraire une logique reutilisable', 'Isoler la logique metier'] },
  { id: 8, phase: 'Formulaires', title: 'Formulaires et v-model', side: 'right', points: ['Binding bidirectionnel', 'Checkbox, select et composants custom', 'Bases du flux de validation'] },
  { id: 9, phase: 'Routing', title: 'Fondamentaux de Vue Router', side: 'left', points: ['Routes imbriquees', 'Parametres dynamiques', 'Guards et UI liee a la route'] },
  { id: 10, phase: 'Etat', title: 'Gestion d etat avec Pinia', side: 'right', points: ['Bases de design de store', 'Actions et getters', 'Quand l etat local suffit'] },
  { id: 11, phase: 'Data Fetching', title: 'Donnees asynchrones et appels API', side: 'left', points: ['Etats loading et error', 'Fetcher au montage ou au changement de route', 'Eviter le flicker UI et les race conditions'] },
  { id: 12, phase: 'Style', title: 'Strategies de styling', side: 'right', points: ['CSS scope', 'Approche utility-first', 'Design system et coherence des composants'] },
  { id: 13, phase: 'Qualite', title: 'Accessibilite et UX', side: 'left', points: ['Navigation clavier', 'HTML semantique', 'Formulaires et feedback accessibles'] },
  { id: 14, phase: 'Qualite', title: 'Tester une application Vue', side: 'right', points: ['Bases de Vitest', 'Vue Test Utils', 'Tests de composants vs integration'] },
  { id: 15, phase: 'Performance', title: 'Performance et rendu', side: 'left', points: ['Bien utiliser les keys', 'Lazy load des composants lourds', 'Eviter watchers et re-renders inutiles'] },
  { id: 16, phase: 'SSR', title: 'Nuxt et rendu serveur', side: 'right', points: ['Pourquoi passer de Vue a Nuxt', 'Bases SSR et SSG', 'Contraintes de state partage et data fetching'] },
  { id: 17, phase: 'Delivery', title: 'Build, deploy et monitoring', side: 'left', points: ['Builds de production', 'Variables d environnement', 'Bases d observabilite et de suivi des erreurs'] },
  { id: 18, phase: 'Production', title: 'Patterns de production', side: 'right', points: ['Flows d authentification', 'UI avec gestion des roles', 'Faire evoluer un frontend dans le temps'] }
]

const { locale } = useI18n()

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: "Parcours d'apprentissage",
      title: 'Roadmap Vue.js',
      description: 'Un parcours progressif pour apprendre Vue.js proprement, de la reactivite de base aux applications frontend structurees et deployables.',
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap Vue.js | Briac',
      seoDescription: 'Roadmap visuelle Vue.js, des bases aux patterns frontend de production.',
      seoOgTitle: 'Roadmap Vue.js | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'Vue.js Roadmap',
      description: 'A progressive path to learn Vue.js properly, from core reactivity to structured, production-ready frontend applications.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'Vue.js Roadmap | Briac',
      seoDescription: 'Visual Vue.js roadmap from fundamentals to production-ready frontend patterns.',
      seoOgTitle: 'Vue.js Roadmap | Briac // Terminal Portfolio'
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
  <section class="vue-roadmap space-y-8">
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
.vue-roadmap {
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
