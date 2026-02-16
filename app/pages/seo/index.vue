<script setup lang="ts">
interface SeoRoadmapStep {
  id: number
  phase: string
  title: string
  side: 'left' | 'right'
  points: string[]
  path: string
}

const steps: SeoRoadmapStep[] = [
  {
    id: 1,
    phase: 'Foundations',
    title: 'How Search Algorithms Work',
    side: 'left',
    points: ['Crawling and indexing basics', 'Ranking signals overview', 'Why relevance and authority matter'],
    path: '/seo/understanding-how-search-engine-algorithms-work'
  },
  {
    id: 2,
    phase: 'Site Architecture',
    title: 'Structure Your Website for SEO',
    side: 'right',
    points: ['Clear hierarchy', 'Internal linking strategy', 'Topic clustering'],
    path: '/seo/how-to-structure-a-website-for-better-seo'
  },
  {
    id: 3,
    phase: 'Technical SEO',
    title: 'Robots.txt Fundamentals',
    side: 'left',
    points: ['Control crawler access', 'Avoid accidental blocking', 'Validate directives'],
    path: '/seo/what-is-robots-txt'
  },
  {
    id: 4,
    phase: 'Technical SEO',
    title: 'XML Sitemap Setup',
    side: 'right',
    points: ['Expose important URLs', 'Handle canonical pages', 'Submit and monitor'],
    path: '/seo/introduction-to-xml-sitemap'
  },
  {
    id: 5,
    phase: 'On-Page SEO',
    title: 'Heading Tags and Content Hierarchy',
    side: 'left',
    points: ['H1/H2/H3 semantics', 'Readable structure', 'Keyword placement with intent'],
    path: '/seo/understanding-heading-tags-in-seo'
  },
  {
    id: 6,
    phase: 'On-Page SEO',
    title: 'Title Tag Optimization',
    side: 'right',
    points: ['Title clarity', 'SERP CTR impact', 'Brand + keyword balance'],
    path: '/seo/title-tag-a-key-element-in-seo'
  },
  {
    id: 7,
    phase: 'On-Page SEO',
    title: 'SEO-Friendly URL Structure',
    side: 'left',
    points: ['Simple and stable slugs', 'No keyword stuffing', 'Consistent conventions'],
    path: '/seo/a-guide-to-seo-friendly-url-structure'
  },
  {
    id: 8,
    phase: 'On-Page SEO',
    title: 'Noindex Strategy',
    side: 'right',
    points: ['When to hide pages', 'Avoid index bloat', 'Audit noindex usage'],
    path: '/seo/understanding-the-noindex-meta-tag-in-seo'
  },
  {
    id: 9,
    phase: 'Media SEO',
    title: 'Image Optimization',
    side: 'left',
    points: ['Compression and formats', 'Alt text quality', 'Performance impact'],
    path: '/seo/image-optimization-for-seo'
  },
  {
    id: 10,
    phase: 'International SEO',
    title: 'Hreflang Tags',
    side: 'right',
    points: ['Language targeting', 'Regional variants', 'Avoid duplicate language conflicts'],
    path: '/seo/understanding-hrefang-tags-and-their-importance-in-seo'
  },
  {
    id: 11,
    phase: 'Authority',
    title: 'Backlinks and Link Signals',
    side: 'left',
    points: ['Link quality > quantity', 'Natural acquisition', 'Anchor profile awareness'],
    path: '/seo/understanding-backlinks-and-their-importance-in-seo'
  },
  {
    id: 12,
    phase: 'Entity & Rich Results',
    title: 'Structured Data Markup',
    side: 'right',
    points: ['Schema.org basics', 'Rich snippets eligibility', 'Validation and monitoring'],
    path: '/seo/structured-data-markup-enhancing-seo-and-search-visibility'
  },
  {
    id: 13,
    phase: 'Brand & Domain',
    title: 'Choosing a Domain for SEO',
    side: 'left',
    points: ['Brandability and trust', 'Domain history checks', 'Long-term naming strategy'],
    path: '/seo/choosing-your-domain-name-for-seo'
  },
  {
    id: 14,
    phase: 'Learning Path',
    title: 'SEO Roadmap Overview',
    side: 'right',
    points: ['Prioritization by impact', 'Execution order', 'Continuous monitoring loop'],
    path: '/seo/search-engine-optimization-seo-roadmap'
  }
]

const posts = await useSeoRoadmaps()

useSeoMeta({
  title: 'SEO Roadmap',
  description: 'Visual SEO roadmap from fundamentals to advanced technical and content optimization topics.',
  ogTitle: 'SEO Roadmap | Briac',
  ogDescription: 'Visual SEO roadmap from fundamentals to advanced technical and content optimization topics.'
})
</script>

<template>
  <section class="seo-roadmap space-y-8">
    <header class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">Learning Path</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">SEO Roadmap</h1>
      <p class="max-w-3xl text-zinc-300">
        A step-by-step path from SEO fundamentals to technical implementation, content quality, and long-term growth.
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
          <NuxtLink :to="step.path" class="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 no-underline hover:underline">
            Open Tutorial >
          </NuxtLink>
        </div>
      </article>
    </div>

    <section class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-6">
      <p class="section-kicker">All Tutorials</p>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article v-for="post in posts" :key="post.path" class="brutal-card group flex h-full flex-col p-4">
          <h3 class="mb-2 text-lg font-bold uppercase leading-tight">
            <NuxtLink :to="post.path" class="no-underline">
              {{ post.title }}
            </NuxtLink>
          </h3>
          <p class="mb-4 text-zinc-300">{{ post.description }}</p>
          <div class="mt-auto flex items-end justify-between gap-3">
            <div class="flex flex-wrap gap-2">
              <TagPill v-for="tag in post.tags || []" :key="tag" :label="tag" />
            </div>
            <NuxtLink :to="post.path" class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 no-underline transition group-hover:text-white">
              open &gt;
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.seo-roadmap {
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
