<script setup lang="ts">
interface SeoRoadmapStep {
  id: number
  phase: string
  title: string
  side: 'left' | 'right'
  points: string[]
  path?: string
}

const steps: SeoRoadmapStep[] = [
  {
    id: 1,
    phase: 'Foundations',
    title: 'Basics of SEO',
    side: 'left',
    points: ['What SEO is and why it matters', 'Organic vs paid visibility', 'Core ranking principles']
  },
  {
    id: 2,
    phase: 'Foundations',
    title: 'Role of SEO',
    side: 'right',
    points: ['SEO in product growth', 'Acquisition and retention impact', 'Long-term compounding effects']
  },
  {
    id: 3,
    phase: 'Foundations',
    title: 'Keyword Research in SEO',
    side: 'left',
    points: ['Search intent mapping', 'Topic clustering', 'Keyword prioritization']
  },
  {
    id: 4,
    phase: 'Foundations',
    title: 'How Search Algorithms Work',
    side: 'right',
    points: ['Crawling and indexing basics', 'Ranking signals overview', 'Why relevance and authority matter'],
    path: '/seo/understanding-how-search-engine-algorithms-work'
  },
  {
    id: 5,
    phase: 'Site Architecture',
    title: 'Structure Your Website for SEO',
    side: 'left',
    points: ['Clear hierarchy', 'Internal linking strategy', 'Topic clustering'],
    path: '/seo/how-to-structure-a-website-for-better-seo'
  },
  {
    id: 6,
    phase: 'Technical SEO',
    title: 'SEO-Friendly URL Structure',
    side: 'right',
    points: ['Simple and stable slugs', 'No keyword stuffing', 'Consistent conventions'],
    path: '/seo/a-guide-to-seo-friendly-url-structure'
  },
  {
    id: 7,
    phase: 'Technical SEO',
    title: 'Mobile SEO',
    side: 'left',
    points: ['Mobile-first indexing', 'Responsive UX', 'Touch-friendly navigation']
  },
  {
    id: 8,
    phase: 'Technical SEO',
    title: 'Robots.txt Fundamentals',
    side: 'right',
    points: ['Control crawler access', 'Avoid accidental blocking', 'Validate directives'],
    path: '/seo/what-is-robots-txt'
  },
  {
    id: 9,
    phase: 'Technical SEO',
    title: 'XML Sitemap Setup',
    side: 'left',
    points: ['Expose important URLs', 'Handle canonical pages', 'Submit and monitor'],
    path: '/seo/introduction-to-xml-sitemap'
  },
  {
    id: 10,
    phase: 'Technical SEO',
    title: 'Site Speed Optimization',
    side: 'right',
    points: ['Core Web Vitals basics', 'Rendering and asset optimization', 'Performance budget mindset']
  },
  {
    id: 11,
    phase: 'International SEO',
    title: 'Multi-language SEO',
    side: 'left',
    points: ['Language targeting strategy', 'Locale-aware architecture', 'Regional content consistency']
  },
  {
    id: 12,
    phase: 'On-Page SEO',
    title: 'Meta Tags',
    side: 'right',
    points: ['Title and meta descriptions', 'Indexation directives', 'SERP snippet quality']
  },
  {
    id: 13,
    phase: 'On-Page SEO',
    title: 'Heading Tags and Content Hierarchy',
    side: 'left',
    points: ['H1/H2/H3 semantics', 'Readable structure', 'Keyword placement with intent'],
    path: '/seo/understanding-heading-tags-in-seo'
  },
  {
    id: 14,
    phase: 'On-Page SEO',
    title: 'Title Tag Optimization',
    side: 'right',
    points: ['Title clarity', 'SERP CTR impact', 'Brand + keyword balance'],
    path: '/seo/title-tag-a-key-element-in-seo'
  },
  {
    id: 15,
    phase: 'On-Page SEO',
    title: 'Noindex Strategy',
    side: 'left',
    points: ['When to hide pages', 'Avoid index bloat', 'Audit noindex usage'],
    path: '/seo/understanding-the-noindex-meta-tag-in-seo'
  },
  {
    id: 16,
    phase: 'On-Page SEO',
    title: 'Keyword Usage and Placement',
    side: 'right',
    points: ['Match query intent', 'Avoid stuffing', 'Place terms naturally in strategic sections']
  },
  {
    id: 17,
    phase: 'On-Page SEO',
    title: 'Content Quality',
    side: 'left',
    points: ['Depth and clarity', 'Unique value per page', 'Content freshness strategy']
  },
  {
    id: 18,
    phase: 'On-Page SEO',
    title: 'Internal Linking',
    side: 'right',
    points: ['Contextual anchors', 'Topical relevance', 'Crawl depth control']
  },
  {
    id: 19,
    phase: 'Media SEO',
    title: 'Image Optimization',
    side: 'left',
    points: ['Compression and formats', 'Alt text quality', 'Performance impact'],
    path: '/seo/image-optimization-for-seo'
  },
  {
    id: 20,
    phase: 'International SEO',
    title: 'Hreflang Tags',
    side: 'right',
    points: ['Language targeting', 'Regional variants', 'Avoid duplicate language conflicts'],
    path: '/seo/understanding-hrefang-tags-and-their-importance-in-seo'
  },
  {
    id: 21,
    phase: 'On-Page SEO',
    title: 'Open Graph and Social Metadata',
    side: 'left',
    points: ['Control social previews', 'Consistent brand snippets', 'Improve share CTR']
  },
  {
    id: 22,
    phase: 'On-Page SEO',
    title: 'Duplicate Content',
    side: 'right',
    points: ['Canonical strategy', 'Prevent URL variants duplication', 'Consolidate ranking signals']
  },
  {
    id: 23,
    phase: 'Authority',
    title: 'Backlinks and Link Signals',
    side: 'left',
    points: ['Link quality > quantity', 'Natural acquisition', 'Anchor profile awareness'],
    path: '/seo/understanding-backlinks-and-their-importance-in-seo'
  },
  {
    id: 24,
    phase: 'Off-Page SEO',
    title: 'Social Signals',
    side: 'right',
    points: ['Amplify content reach', 'Engagement-driven discovery', 'Brand trust reinforcement']
  },
  {
    id: 25,
    phase: 'Off-Page SEO',
    title: 'Brand Mentions',
    side: 'left',
    points: ['Unlinked mentions tracking', 'Authority correlation', 'Digital PR opportunities']
  },
  {
    id: 26,
    phase: 'Off-Page SEO',
    title: 'Guest Blogging',
    side: 'right',
    points: ['Editorial placement quality', 'Topical relevance', 'Avoid low-quality link schemes']
  },
  {
    id: 27,
    phase: 'Off-Page SEO',
    title: 'Content Marketing',
    side: 'left',
    points: ['Content distribution loops', 'Lead magnet strategy', 'Evergreen assets']
  },
  {
    id: 28,
    phase: 'Entity & Rich Results',
    title: 'Structured Data Markup',
    side: 'right',
    points: ['Schema.org basics', 'Rich snippets eligibility', 'Validation and monitoring'],
    path: '/seo/structured-data-markup-enhancing-seo-and-search-visibility'
  },
  {
    id: 29,
    phase: 'Brand & Domain',
    title: 'Choosing a Domain for SEO',
    side: 'left',
    points: ['Brandability and trust', 'Domain history checks', 'Long-term naming strategy'],
    path: '/seo/choosing-your-domain-name-for-seo'
  },
  {
    id: 30,
    phase: 'SEO Analytics & Reporting',
    title: 'Google Analytics',
    side: 'right',
    points: ['Measure organic sessions', 'Track landing page performance', 'Segment acquisition channels']
  },
  {
    id: 31,
    phase: 'SEO Analytics & Reporting',
    title: 'Google Search Console',
    side: 'left',
    points: ['Coverage and indexing checks', 'Query and page performance', 'Technical issue alerts']
  },
  {
    id: 32,
    phase: 'SEO Analytics & Reporting',
    title: 'Traffic Analysis',
    side: 'right',
    points: ['Trends and seasonality', 'Content decay detection', 'Opportunity prioritization']
  },
  {
    id: 33,
    phase: 'SEO Tools',
    title: 'SEMrush',
    side: 'left',
    points: ['Competitive keyword insights', 'Backlink analysis', 'Site audit workflows']
  },
  {
    id: 34,
    phase: 'SEO Tools',
    title: 'PageSpeed Insights',
    side: 'right',
    points: ['CWV diagnostics', 'Performance opportunities', 'Template-level optimization']
  },
  {
    id: 35,
    phase: 'SEO Tools',
    title: 'Google Keyword Planner',
    side: 'left',
    points: ['Search volume validation', 'Topic expansion ideas', 'Intent-informed planning']
  }
]

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
          <NuxtLink
            v-if="step.path"
            :to="step.path"
            class="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 no-underline hover:underline"
          >
            Open Tutorial >
          </NuxtLink>
          <p v-else class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Coming soon
          </p>
        </div>
      </article>
    </div>

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
