<script setup lang="ts">
import { useI18n } from '#i18n'

interface PostgreSqlRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const stepsEn: PostgreSqlRoadmapStep[] = [
  { id: 1, phase: 'Foundations', title: 'PostgreSQL Fundamentals', side: 'left', points: ['What PostgreSQL is', 'When to choose it', 'Core ecosystem overview'] },
  { id: 2, phase: 'Setup', title: 'Installation and Local Environment', side: 'right', points: ['Install Postgres locally', 'Configure users/databases', 'Use psql and GUI tools'] },
  { id: 3, phase: 'Setup', title: 'Database and Schema Basics', side: 'left', points: ['Create databases and schemas', 'Search path basics', 'Naming conventions'] },
  { id: 4, phase: 'Data Modeling', title: 'Data Types and Constraints', side: 'right', points: ['Core SQL types', 'CHECK/UNIQUE/NOT NULL', 'Primary and foreign keys'] },
  { id: 5, phase: 'Data Modeling', title: 'Table Design Principles', side: 'left', points: ['Normalization trade-offs', 'Modeling one-to-many and many-to-many', 'Choosing surrogate vs natural keys'] },
  { id: 6, phase: 'Querying', title: 'SELECT Fundamentals', side: 'right', points: ['Filtering and sorting', 'Pagination patterns', 'Projection best practices'] },
  { id: 7, phase: 'Querying', title: 'Joins and Aggregations', side: 'left', points: ['INNER/LEFT joins', 'GROUP BY/HAVING', 'Window function introduction'] },
  { id: 8, phase: 'Querying', title: 'Subqueries and CTEs', side: 'right', points: ['Correlated vs non-correlated subqueries', 'WITH/CTE patterns', 'Readability vs performance'] },
  { id: 9, phase: 'Indexing', title: 'Index Fundamentals', side: 'left', points: ['B-tree basics', 'Indexing filter and join columns', 'Write cost trade-offs'] },
  { id: 10, phase: 'Performance', title: 'EXPLAIN and Query Plans', side: 'right', points: ['Read EXPLAIN ANALYZE', 'Detect table scans and bad joins', 'Iterative tuning workflow'] },
  { id: 11, phase: 'Transactions', title: 'ACID and Isolation Levels', side: 'left', points: ['Transaction boundaries', 'Read committed vs repeatable read', 'Consistency guarantees'] },
  { id: 12, phase: 'Transactions', title: 'Locks and Concurrency', side: 'right', points: ['Row/table locks', 'Deadlock basics', 'Designing low-contention workflows'] },
  { id: 13, phase: 'Advanced Features', title: 'JSONB and Semi-Structured Data', side: 'left', points: ['Store and query JSONB', 'GIN indexes', 'When JSONB is a good fit'] },
  { id: 14, phase: 'Advanced Features', title: 'Full-Text Search', side: 'right', points: ['tsvector/tsquery basics', 'Ranking and dictionaries', 'Search index maintenance'] },
  { id: 15, phase: 'Operations', title: 'Migrations and Versioning', side: 'left', points: ['Migration workflow', 'Rollback strategy', 'Safe schema evolution'] },
  { id: 16, phase: 'Operations', title: 'Backup and Restore', side: 'right', points: ['pg_dump/pg_restore basics', 'Point-in-time recovery concepts', 'Backup verification'] },
  { id: 17, phase: 'Operations', title: 'Monitoring and Maintenance', side: 'left', points: ['Core DB metrics', 'Autovacuum basics', 'Routine maintenance tasks'] },
  { id: 18, phase: 'Production', title: 'Scaling and Reliability', side: 'right', points: ['Connection pooling', 'Replication basics', 'High-availability mindset'] }
]

const stepsFr: PostgreSqlRoadmapStep[] = [
  { id: 1, phase: 'Fondations', title: 'Fondamentaux PostgreSQL', side: 'left', points: ['Ce qu est PostgreSQL', 'Quand le choisir', 'Vue d ensemble de l ecosysteme'] },
  { id: 2, phase: 'Setup', title: 'Installation et environnement local', side: 'right', points: ['Installer Postgres en local', 'Configurer users/bases', 'Utiliser psql et des outils GUI'] },
  { id: 3, phase: 'Setup', title: 'Bases de database et schema', side: 'left', points: ['Creer des bases et schemas', 'Bases du search_path', 'Conventions de nommage'] },
  { id: 4, phase: 'Modelisation', title: 'Types de donnees et contraintes', side: 'right', points: ['Types SQL principaux', 'CHECK/UNIQUE/NOT NULL', 'Primary et foreign keys'] },
  { id: 5, phase: 'Modelisation', title: 'Principes de design de tables', side: 'left', points: ['Trade-offs de normalisation', 'Modeliser one-to-many et many-to-many', 'Choisir surrogate vs natural keys'] },
  { id: 6, phase: 'Requetes', title: 'Fondamentaux SELECT', side: 'right', points: ['Filtrage et tri', 'Patterns de pagination', 'Bonnes pratiques de projection'] },
  { id: 7, phase: 'Requetes', title: 'Joins et aggregations', side: 'left', points: ['INNER/LEFT joins', 'GROUP BY/HAVING', 'Introduction aux window functions'] },
  { id: 8, phase: 'Requetes', title: 'Sous-requetes et CTE', side: 'right', points: ['Sous-requetes correlees vs non correlees', 'Patterns WITH/CTE', 'Lisibilite vs performance'] },
  { id: 9, phase: 'Indexation', title: 'Fondamentaux des index', side: 'left', points: ['Bases des index B-tree', 'Indexer les colonnes de filtre et jointure', 'Trade-offs cout ecriture'] },
  { id: 10, phase: 'Performance', title: 'EXPLAIN et plans de requetes', side: 'right', points: ['Lire EXPLAIN ANALYZE', 'Detecter table scans et mauvais joins', 'Workflow de tuning iteratif'] },
  { id: 11, phase: 'Transactions', title: 'ACID et niveaux d isolation', side: 'left', points: ['Frontieres transactionnelles', 'Read committed vs repeatable read', 'Garanties de coherence'] },
  { id: 12, phase: 'Transactions', title: 'Locks et concurrence', side: 'right', points: ['Verrous ligne/table', 'Bases des deadlocks', 'Concevoir des workflows a faible contention'] },
  { id: 13, phase: 'Fonctionnalites avancees', title: 'JSONB et donnees semi-structurees', side: 'left', points: ['Stocker et requeter JSONB', 'Index GIN', 'Quand JSONB est pertinent'] },
  { id: 14, phase: 'Fonctionnalites avancees', title: 'Recherche plein texte', side: 'right', points: ['Bases tsvector/tsquery', 'Ranking et dictionnaires', 'Maintenance des index de recherche'] },
  { id: 15, phase: 'Operations', title: 'Migrations et versioning', side: 'left', points: ['Workflow de migration', 'Strategie de rollback', 'Evolution de schema sans risque'] },
  { id: 16, phase: 'Operations', title: 'Backup et restore', side: 'right', points: ['Bases pg_dump/pg_restore', 'Concepts de point-in-time recovery', 'Verification des sauvegardes'] },
  { id: 17, phase: 'Operations', title: 'Monitoring et maintenance', side: 'left', points: ['Metriques DB principales', 'Bases de l autovacuum', 'Taches de maintenance recurrentes'] },
  { id: 18, phase: 'Production', title: 'Scalabilite et fiabilite', side: 'right', points: ['Connection pooling', 'Bases de la replication', 'Mentalite haute disponibilite'] }
]

const { locale } = useI18n()

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: "Parcours d'apprentissage",
      title: 'Roadmap PostgreSQL',
      description: 'Un parcours progressif des bases SQL jusqu a la performance, la fiabilite et les operations en production.',
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap PostgreSQL | Briac',
      seoDescription: 'Roadmap visuelle PostgreSQL, des fondamentaux a la production.',
      seoOgTitle: 'Roadmap PostgreSQL | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'PostgreSQL Roadmap',
      description: 'A progressive path from SQL fundamentals to PostgreSQL performance, reliability, and production operations.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'PostgreSQL Roadmap | Briac',
      seoDescription: 'Visual PostgreSQL roadmap from fundamentals to production operations.',
      seoOgTitle: 'PostgreSQL Roadmap | Briac // Terminal Portfolio'
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
  <section class="postgresql-roadmap space-y-8">
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

    <RoadmapArticleFeed roadmap-name="PostgreSQL" :search-terms="['postgresql']" search-query="postgresql" />
  </section>
</template>

<style scoped>
.postgresql-roadmap {
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
