<script setup lang="ts">
import { useI18n } from '#i18n'

interface AiRoadmapStep {
  id: number
  title: string
  phase: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const stepsEn: AiRoadmapStep[] = [
  { id: 1, phase: 'Foundations', title: 'What AI Actually Is', side: 'left', points: ['AI vs machine learning vs deep learning', 'Narrow AI vs general AI', 'Where modern AI fits in real products'] },
  { id: 2, phase: 'Foundations', title: 'Math and Statistics You Need', side: 'right', points: ['Vectors and matrices intuition', 'Probability basics', 'Train, validation, and test mindset'] },
  { id: 3, phase: 'Data', title: 'Data Quality and Preparation', side: 'left', points: ['Structured vs unstructured data', 'Cleaning and labeling basics', 'Bias and leakage risks'] },
  { id: 4, phase: 'Models', title: 'Supervised Learning Basics', side: 'right', points: ['Classification vs regression', 'Features and targets', 'Overfitting and underfitting'] },
  { id: 5, phase: 'Models', title: 'Unsupervised Learning and Embeddings', side: 'left', points: ['Clustering basics', 'Similarity search intuition', 'Embeddings in modern AI systems'] },
  { id: 6, phase: 'LLMs', title: 'Transformer and Token Mental Model', side: 'right', points: ['Tokens and context window', 'Attention intuition', 'Inference vs training'] },
  { id: 7, phase: 'Prompting', title: 'Prompt Engineering Fundamentals', side: 'left', points: ['Clear instructions', 'Role, context, and examples', 'Output constraints and delimiters'] },
  { id: 8, phase: 'LLMs', title: 'Model Selection and Tradeoffs', side: 'right', points: ['Quality vs latency vs cost', 'Hosted vs local models', 'Open weights vs closed APIs'] },
  { id: 9, phase: 'RAG', title: 'Retrieval-Augmented Generation', side: 'left', points: ['Chunking and indexing', 'Vector search basics', 'Grounding answers in source data'] },
  { id: 10, phase: 'Evaluation', title: 'Evals and Failure Analysis', side: 'right', points: ['Golden datasets', 'Hallucination patterns', 'Measure task success'] },
  { id: 11, phase: 'Safety', title: 'Safety, Privacy, and Guardrails', side: 'left', points: ['PII and sensitive data handling', 'Prompt injection basics', 'Moderation and policy checks'] },
  { id: 12, phase: 'Agents', title: 'Tools, Functions, and Agents', side: 'right', points: ['Function calling', 'Tool orchestration', 'When agents are actually useful'] },
  { id: 13, phase: 'Serving', title: 'Inference APIs and Serving', side: 'left', points: ['Request and response design', 'Batching and streaming', 'Rate limits and retries'] },
  { id: 14, phase: 'Serving', title: 'Local AI Stack', side: 'right', points: ['Ollama and local runtimes', 'CPU and GPU constraints', 'Private deployment patterns'] },
  { id: 15, phase: 'Product', title: 'UX for AI Features', side: 'left', points: ['Human-in-the-loop design', 'Fallback and uncertainty handling', 'Prompt and response UX'] },
  { id: 16, phase: 'MLOps', title: 'Versioning and Experiment Tracking', side: 'right', points: ['Prompt and model versioning', 'Dataset reproducibility', 'Experiment logs and comparisons'] },
  { id: 17, phase: 'Production', title: 'Monitoring and Cost Control', side: 'left', points: ['Latency, token, and error metrics', 'Drift and quality regressions', 'Cache and spend management'] },
  { id: 18, phase: 'Production', title: 'Production AI Systems', side: 'right', points: ['RAG plus tools plus auth', 'Deployment patterns', 'Iterate safely over time'] }
]

const stepsFr: AiRoadmapStep[] = [
  { id: 1, phase: 'Fondations', title: 'Comprendre ce qu est vraiment l IA', side: 'left', points: ['IA vs machine learning vs deep learning', 'IA faible vs IA generale', 'Ou l IA moderne s integre dans les produits'] },
  { id: 2, phase: 'Fondations', title: 'Les bases de maths et de stats utiles', side: 'right', points: ['Intuition des vecteurs et matrices', 'Bases de probabilites', 'Logique train, validation et test'] },
  { id: 3, phase: 'Data', title: 'Qualite et preparation des donnees', side: 'left', points: ['Donnees structurees vs non structurees', 'Nettoyage et annotation', 'Risques de biais et de fuite de donnees'] },
  { id: 4, phase: 'Modeles', title: 'Bases du supervised learning', side: 'right', points: ['Classification vs regression', 'Features et target', 'Overfitting et underfitting'] },
  { id: 5, phase: 'Modeles', title: 'Unsupervised learning et embeddings', side: 'left', points: ['Bases du clustering', 'Intuition de la similarite', 'Role des embeddings dans les systemes modernes'] },
  { id: 6, phase: 'LLMs', title: 'Comprendre les transformers et les tokens', side: 'right', points: ['Tokens et fenetre de contexte', 'Intuition de l attention', 'Difference entre inference et entrainement'] },
  { id: 7, phase: 'Prompting', title: 'Fondamentaux du prompt engineering', side: 'left', points: ['Instructions claires', 'Role, contexte et exemples', 'Contraintes de sortie et delimiteurs'] },
  { id: 8, phase: 'LLMs', title: 'Choisir un modele et comprendre les compromis', side: 'right', points: ['Qualite vs latence vs cout', 'Modeles heberges vs locaux', 'Open weights vs APIs fermees'] },
  { id: 9, phase: 'RAG', title: 'Retrieval-Augmented Generation', side: 'left', points: ['Chunking et indexation', 'Bases de la recherche vectorielle', 'Reponses ancrees dans les sources'] },
  { id: 10, phase: 'Evaluation', title: 'Evaluer et analyser les echecs', side: 'right', points: ['Golden datasets', 'Patterns d hallucination', 'Mesurer le succes d une tache'] },
  { id: 11, phase: 'Securite', title: 'Securite, vie privee et garde-fous', side: 'left', points: ['PII et donnees sensibles', 'Bases du prompt injection', 'Moderation et controles de politique'] },
  { id: 12, phase: 'Agents', title: 'Tools, fonctions et agents', side: 'right', points: ['Function calling', 'Orchestration des outils', 'Quand les agents sont vraiment utiles'] },
  { id: 13, phase: 'Serving', title: 'APIs d inference et serving', side: 'left', points: ['Design des requetes et reponses', 'Batching et streaming', 'Rate limits et retries'] },
  { id: 14, phase: 'Serving', title: 'Stack IA locale', side: 'right', points: ['Ollama et runtimes locaux', 'Contraintes CPU et GPU', 'Patterns de deploiement prive'] },
  { id: 15, phase: 'Produit', title: 'UX pour les fonctionnalites IA', side: 'left', points: ['Approche human-in-the-loop', 'Gestion des fallback et de l incertitude', 'UX des prompts et des reponses'] },
  { id: 16, phase: 'MLOps', title: 'Versioning et suivi d experimentations', side: 'right', points: ['Versioning des prompts et modeles', 'Reproductibilite des datasets', 'Logs et comparaisons d experiments'] },
  { id: 17, phase: 'Production', title: 'Monitoring et controle des couts', side: 'left', points: ['Latence, tokens et erreurs', 'Drift et regressions de qualite', 'Gestion du cache et des depenses'] },
  { id: 18, phase: 'Production', title: 'Systemes IA en production', side: 'right', points: ['RAG, outils et authentification', 'Patterns de deploiement', 'Faire evoluer le systeme en securite'] }
]

const { locale } = useI18n()

const pageUi = computed(() => locale.value === 'fr'
  ? {
      kicker: "Parcours d'apprentissage",
      title: "Roadmap IA",
      description: "Un parcours progressif pour comprendre l IA moderne, des fondamentaux jusqu aux systemes de production bases sur les LLMs, le RAG et les agents.",
      open: 'Ouvrir le tutoriel >',
      soon: 'Bientot disponible',
      seoTitle: 'Roadmap IA | Briac',
      seoDescription: 'Roadmap visuelle IA, des bases jusqu aux systemes de production avec LLMs, RAG, serving et evaluation.',
      seoOgTitle: 'Roadmap IA | Briac // Terminal Portfolio'
    }
  : {
      kicker: 'Learning Path',
      title: 'AI Roadmap',
      description: 'A progressive path to understand modern AI, from core concepts to production systems built with LLMs, RAG, agents, and serving stacks.',
      open: 'Open Tutorial >',
      soon: 'Coming soon',
      seoTitle: 'AI Roadmap | Briac',
      seoDescription: 'Visual AI roadmap from fundamentals to production systems using LLMs, RAG, serving, and evaluation.',
      seoOgTitle: 'AI Roadmap | Briac // Terminal Portfolio'
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
  <section class="ai-roadmap space-y-8">
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

    <RoadmapArticleFeed roadmap-name="AI" :search-terms="['ai']" search-query="ai" />
  </section>
</template>

<style scoped>
.ai-roadmap {
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
