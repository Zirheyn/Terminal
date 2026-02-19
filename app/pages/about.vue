<script setup lang="ts">
interface ToolItem {
  name: string
  url: string
  note: string
}

interface ToolSection {
  title: string
  tools: ToolItem[]
}

const toolSections: ToolSection[] = [
  {
    title: 'Backend',
    tools: [
      { name: 'Java', url: 'https://java.com/', note: 'Core language for backend systems.' },
      { name: 'Spring Boot', url: 'https://spring.io/projects/spring-boot', note: 'Rapid development for production APIs.' },
      { name: 'Swagger / OpenAPI', url: 'https://swagger.io/', note: 'API documentation and contract-first workflows.' },
      { name: 'Apache Maven', url: 'https://maven.apache.org/', note: 'Build lifecycle and dependency management.' },
      { name: 'Flyway', url: 'https://www.red-gate.com/products/flyway/community/', note: 'Versioned SQL migrations in delivery pipelines.' },
      { name: 'Glowroot', url: 'https://glowroot.org/', note: 'Low-overhead Java APM for diagnostics.' }
    ]
  },
  {
    title: 'Frontend',
    tools: [
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/', note: 'Typed JavaScript for maintainable frontends.' },
      { name: 'Vue.js', url: 'https://vuejs.org/', note: 'Component-based UI architecture.' },
      { name: 'Nuxt', url: 'https://nuxt.com/', note: 'Full-stack Vue framework for SSR, SSG, and content sites.' },
      { name: 'Nuxt UI', url: 'https://ui.nuxt.com/', note: 'Composable UI primitives aligned with Nuxt workflows.' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', note: 'Utility-first styling for fast and consistent interfaces.' },
      { name: 'shadcn/ui', url: 'https://ui.shadcn.com/', note: 'Reusable component patterns and design conventions.' }
    ]
  },
  {
    title: 'Database',
    tools: [
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/', note: 'Primary relational database.' },
      { name: 'DBeaver', url: 'https://dbeaver.io/', note: 'Database management and query tooling.' },
      { name: 'drawDB', url: 'https://www.drawdb.app/', note: 'Schema diagrams and SQL generation.' }
    ]
  },
  {
    title: 'IDE',
    tools: [
      { name: 'IntelliJ IDEA', url: 'https://www.jetbrains.com/idea/', note: 'Main IDE for Java and backend work.' },
      { name: 'Visual Studio Code', url: 'https://code.visualstudio.com/', note: 'Lightweight editor for web and infra tasks.' }
    ]
  },
  {
    title: 'Version Control',
    tools: [
      { name: 'Git', url: 'https://git-scm.com/', note: 'Versioning and collaboration baseline.' },
      { name: 'GitHub', url: 'https://github.com/', note: 'Code hosting, review, and delivery workflows.' }
    ]
  },
  {
    title: 'Infrastructure',
    tools: [
      { name: 'Coolify', url: 'https://coolify.io/', note: 'Self-hosted deployment platform.' },
      { name: 'CloudPanel', url: 'https://www.cloudpanel.io/', note: 'Server and hosting control panel.' }
    ]
  },
  {
    title: 'Data and Files',
    tools: [
      { name: 'JSON Crack', url: 'https://jsoncrack.com/', note: 'Visualize JSON and complex object structures.' }
    ]
  }
]

const about = await queryCollection('pages').path('/about').first()

if (!about) {
  throw createError({ statusCode: 404, statusMessage: 'About page not found' })
}

const faviconUrl = (url: string) => {
  try {
    return new URL('/favicon.ico', url).toString()
  } catch {
    return '/fallback-tool.svg'
  }
}

const toolHost = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

const faviconFallbackUrl = (url: string) => {
  const host = toolHost(url)
  if (!host) {
    return '/fallback-tool.svg'
  }
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
}

useSeoMeta({
  title: 'About',
  description: about.description || 'Freelance developer profile and technical stack.',
  ogTitle: 'About | Briac',
  ogDescription: about.description || 'Freelance developer profile and technical stack.'
})
</script>

<template>
  <section class="space-y-8">
    <header class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">Profile</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">{{ about.title }}</h1>
      <p v-if="about.description" class="max-w-3xl text-zinc-300">{{ about.description }}</p>
    </header>

    <section class="border border-zinc-700 bg-zinc-950 p-5 sm:p-6">
      <ContentRenderer :value="about" class="prose prose-invert blog-prose max-w-none" />
    </section>

    <section class="space-y-6">
      <div class="space-y-2">
        <p class="section-kicker">Tooling</p>
        <h2 class="text-2xl font-black uppercase tracking-tight sm:text-3xl">Current Stack</h2>
      </div>

      <div class="space-y-6">
        <div v-for="section in toolSections" :key="section.title" class="space-y-3">
          <h3 class="text-lg font-bold uppercase tracking-[0.08em] text-zinc-200">{{ section.title }}</h3>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article v-for="tool in section.tools" :key="tool.url" class="brutal-card group flex h-full flex-col p-4">
              <div class="mb-3 flex items-center gap-3">
                <img
                  :src="faviconUrl(tool.url)"
                  :alt="`${tool.name} favicon`"
                  class="size-5 bg-black object-contain"
                  loading="lazy"
                  @error="(event) => {
                    const img = event.target as HTMLImageElement
                    const fallback = faviconFallbackUrl(tool.url)
                    if (img.src !== fallback) {
                      img.src = fallback
                      return
                    }
                    img.src = '/fallback-tool.svg'
                  }"
                >
                <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">tool</p>
              </div>

              <h4 class="mb-2 text-lg font-bold uppercase leading-tight">{{ tool.name }}</h4>
              <p class="mb-5 text-sm leading-6 text-zinc-300">{{ tool.note }}</p>

              <div class="mt-auto flex items-end justify-between gap-3">
                <span class="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{{ toolHost(tool.url) }}</span>
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 no-underline transition group-hover:text-white"
                >
                  open &gt;
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
