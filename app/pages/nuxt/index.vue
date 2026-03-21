<script setup lang="ts">
import { useI18n } from '#i18n'

interface NuxtRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const stepsEn: NuxtRoadmapStep[] = [
  { id: 1, phase: 'Foundations', title: 'What Nuxt Is', side: 'left', points: ['Understand Nuxt as the meta-framework for Vue', 'SSR, SSG, SPA, and hybrid rendering mental model', 'When Nuxt is a better choice than plain Vue'] },
  { id: 2, phase: 'Setup', title: 'Project Setup and Tooling', side: 'right', points: ['Install Node.js and package manager', 'Create a Nuxt app', 'Understand dev server, build, and preview commands'] },
  { id: 3, phase: 'Architecture', title: 'Nuxt Directory Structure', side: 'left', points: ['pages, components, layouts, composables', 'server, middleware, plugins, content', 'How conventions reduce boilerplate'] },
  { id: 4, phase: 'Routing', title: 'File-Based Routing', side: 'right', points: ['Static routes', 'Dynamic params and catch-all pages', 'Nested pages and route organization'] },
  { id: 5, phase: 'UI', title: 'Layouts and Shared UI', side: 'left', points: ['Default and named layouts', 'Global navigation and footer patterns', 'Build reusable page shells'] },
  { id: 6, phase: 'Reactivity', title: 'Vue in Nuxt', side: 'right', points: ['Use refs, computed, and watchers correctly', 'script setup inside Nuxt pages and components', 'Keep state predictable across navigation'] },
  { id: 7, phase: 'Data', title: 'Data Fetching with useFetch and useAsyncData', side: 'left', points: ['Server-side vs client-side fetching', 'Caching and deduplication basics', 'Handle loading and error states cleanly'] },
  { id: 8, phase: 'Content', title: 'Nuxt Content and File-Based CMS', side: 'right', points: ['Write Markdown-driven pages', 'Model collections and frontmatter', 'Build blogs, docs, and roadmaps from files'] },
  { id: 9, phase: 'Server', title: 'Server Routes and API Endpoints', side: 'left', points: ['Create Nitro server endpoints', 'Use runtime config securely', 'Separate frontend concerns from server logic'] },
  { id: 10, phase: 'State', title: 'Composables and Shared State', side: 'right', points: ['Extract reusable logic', 'Use useState responsibly', 'Avoid over-centralizing simple local state'] },
  { id: 11, phase: 'Navigation', title: 'Middleware and Navigation Control', side: 'left', points: ['Route middleware basics', 'Auth and permission checks', 'Redirect patterns without breaking UX'] },
  { id: 12, phase: 'SEO', title: 'SEO and Meta Management', side: 'right', points: ['useSeoMeta and head management', 'Open Graph and social cards', 'Sitemaps, RSS, and robots basics'] },
  { id: 13, phase: 'Styling', title: 'Styling and UI Systems', side: 'left', points: ['Tailwind with Nuxt', 'UI libraries and component layers', 'Keep design tokens and spacing consistent'] },
  { id: 14, phase: 'Modules', title: 'Working with Nuxt Modules', side: 'right', points: ['Official modules mental model', 'When to add a module vs custom code', 'Avoid dependency sprawl'] },
  { id: 15, phase: 'Performance', title: 'Rendering and Performance', side: 'left', points: ['Choose SSR, SSG, or hybrid intentionally', 'Optimize images, payloads, and hydration', 'Understand route pre-rendering trade-offs'] },
  { id: 16, phase: 'Quality', title: 'Type Safety and Testing', side: 'right', points: ['TypeScript-first patterns', 'Basic component and integration tests', 'Protect critical flows with lightweight tests'] },
  { id: 17, phase: 'Delivery', title: 'Deployment and Runtime Environments', side: 'left', points: ['Node server vs static hosting', 'Environment variable strategy', 'Plan local, staging, and production clearly'] },
  { id: 18, phase: 'Production', title: 'Observability and Maintenance', side: 'right', points: ['Log useful events', 'Track errors and uptime', 'Evolve modules, content, and routes safely over time'] }
]

const stepsFr: NuxtRoadmapStep[] = [
  { id: 1, phase: 'Fondations', title: 'Comprendre Nuxt', side: 'left', points: ['Comprendre Nuxt comme meta-framework de Vue', 'Mental model SSR, SSG, SPA et rendu hybride', 'Quand Nuxt est un meilleur choix que Vue seul'] },
  { id: 2, phase: 'Setup', title: 'Initialisation du projet et tooling', side: 'right', points: ['Installer Node.js et un package manager', 'Creer une application Nuxt', 'Comprendre les commandes dev, build et preview'] },
  { id: 3, phase: 'Architecture', title: 'Structure des dossiers Nuxt', side: 'left', points: ['pages, components, layouts, composables', 'server, middleware, plugins, content', 'Comment les conventions reduisent le boilerplate'] },
  { id: 4, phase: 'Routing', title: 'Routing base sur les fichiers', side: 'right', points: ['Routes statiques', 'Params dynamiques et catch-all pages', 'Pages imbriquees et organisation des routes'] },
  { id: 5, phase: 'UI', title: 'Layouts et interface partagee', side: 'left', points: ['Layout par defaut et layouts nommes', 'Patterns de header, footer et shell global', 'Construire une structure de page reutilisable'] },
  { id: 6, phase: 'Reactivite', title: 'Vue dans Nuxt', side: 'right', points: ['Bien utiliser refs, computed et watchers', 'script setup dans pages et composants Nuxt', 'Garder un state previsible pendant la navigation'] },
  { id: 7, phase: 'Data', title: 'Data fetching avec useFetch et useAsyncData', side: 'left', points: ['Fetch cote serveur vs cote client', 'Bases de cache et deduplication', 'Gerer proprement loading et erreurs'] },
  { id: 8, phase: 'Content', title: 'Nuxt Content et CMS base sur les fichiers', side: 'right', points: ['Ecrire des pages en Markdown', 'Modeliser des collections et le frontmatter', 'Construire blog, docs et roadmaps depuis des fichiers'] },
  { id: 9, phase: 'Server', title: 'Routes serveur et endpoints API', side: 'left', points: ['Creer des endpoints Nitro', 'Utiliser runtime config de maniere securisee', 'Separer logique frontend et logique serveur'] },
  { id: 10, phase: 'Etat', title: 'Composables et state partage', side: 'right', points: ['Extraire une logique reutilisable', 'Utiliser useState avec discipline', 'Eviter de centraliser inutilement un state local simple'] },
  { id: 11, phase: 'Navigation', title: 'Middleware et controle de navigation', side: 'left', points: ['Bases des route middleware', 'Checks d auth et de permissions', 'Patterns de redirection sans casser l UX'] },
  { id: 12, phase: 'SEO', title: 'SEO et gestion des metas', side: 'right', points: ['useSeoMeta et gestion du head', 'Open Graph et cartes sociales', 'Bases sitemap, RSS et robots'] },
  { id: 13, phase: 'Style', title: 'Styling et systemes UI', side: 'left', points: ['Tailwind avec Nuxt', 'Libs UI et couches de composants', 'Garder des design tokens et espacements coherents'] },
  { id: 14, phase: 'Modules', title: 'Travailler avec les modules Nuxt', side: 'right', points: ['Mental model des modules officiels', 'Quand ajouter un module vs du code custom', 'Eviter l explosion des dependances'] },
  { id: 15, phase: 'Performance', title: 'Rendu et performance', side: 'left', points: ['Choisir SSR, SSG ou hybride avec intention', 'Optimiser images, payloads et hydration', 'Comprendre les trade-offs du prerendering'] },
  { id: 16, phase: 'Qualite', title: 'Type safety et tests', side: 'right', points: ['Patterns TypeScript first', 'Bases des tests de composants et d integration', 'Couvrir les flows critiques avec des tests legers'] },
  { id: 17, phase: 'Delivery', title: 'Deploiement et environnements', side: 'left', points: ['Serveur Node vs hebergement statique', 'Strategie de variables d environnement', 'Bien separer local, staging et production'] },
  { id: 18, phase: 'Production', title: 'Observabilite et maintenance', side: 'right', points: ['Logger les evenements utiles', 'Suivre erreurs et uptime', 'Faire evoluer modules, contenu et routes sans risque'] }
]

const { locale } = useI18n()

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: "Parcours d'apprentissage",
      title: 'Roadmap Nuxt',
      description: 'Un parcours progressif pour apprendre Nuxt serieusement, de la structure du framework au rendu hybride, au contenu et au deploiement en production.',
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap Nuxt | Briac',
      seoDescription: 'Roadmap visuelle Nuxt, des fondamentaux Vue/Nuxt aux patterns de production.',
      seoOgTitle: 'Roadmap Nuxt | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'Nuxt Roadmap',
      description: 'A progressive path to learn Nuxt properly, from framework structure and rendering modes to content, server routes, and production deployment.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'Nuxt Roadmap | Briac',
      seoDescription: 'Visual Nuxt roadmap from framework fundamentals to production-ready application patterns.',
      seoOgTitle: 'Nuxt Roadmap | Briac // Terminal Portfolio'
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
  <section class="nuxt-roadmap space-y-8">
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

    <RoadmapArticleFeed roadmap-name="Nuxt" :search-terms="['nuxt']" search-query="nuxt" />
  </section>
</template>

<style scoped>
.nuxt-roadmap {
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
