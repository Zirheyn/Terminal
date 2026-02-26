<script setup lang="ts">
import { useI18n } from '#i18n'

interface ToolItem {
  name: string
  url: string
  noteKey: string
}

interface ToolSection {
  titleKey: string
  tools: ToolItem[]
}

const { t } = useI18n()

const toolSections: ToolSection[] = [
  {
    titleKey: 'about.sections.backend',
    tools: [
      { name: 'Java', url: 'https://java.com/', noteKey: 'about.notes.java' },
      { name: 'Spring Boot', url: 'https://spring.io/projects/spring-boot', noteKey: 'about.notes.springBoot' },
      { name: 'Swagger / OpenAPI', url: 'https://swagger.io/', noteKey: 'about.notes.swagger' },
      { name: 'Apache Maven', url: 'https://maven.apache.org/', noteKey: 'about.notes.maven' },
      { name: 'Flyway', url: 'https://www.red-gate.com/products/flyway/community/', noteKey: 'about.notes.flyway' },
      { name: 'Pulse', url: 'https://pulse.briacd.com', noteKey: 'about.notes.pulse' }
    ]
  },
  {
    titleKey: 'about.sections.frontend',
    tools: [
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/', noteKey: 'about.notes.typescript' },
      { name: 'Vue.js', url: 'https://vuejs.org/', noteKey: 'about.notes.vue' },
      { name: 'Nuxt', url: 'https://nuxt.com/', noteKey: 'about.notes.nuxt' },
      { name: 'Nuxt UI', url: 'https://ui.nuxt.com/', noteKey: 'about.notes.nuxtUi' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', noteKey: 'about.notes.tailwind' },
      { name: 'shadcn/ui', url: 'https://ui.shadcn.com/', noteKey: 'about.notes.shadcn' }
    ]
  },
  {
    titleKey: 'about.sections.database',
    tools: [
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/', noteKey: 'about.notes.postgresql' },
      { name: 'DBeaver', url: 'https://dbeaver.io/', noteKey: 'about.notes.dbeaver' },
      { name: 'drawDB', url: 'https://www.drawdb.app/', noteKey: 'about.notes.drawdb' }
    ]
  },
  {
    titleKey: 'about.sections.ide',
    tools: [
      { name: 'IntelliJ IDEA', url: 'https://www.jetbrains.com/idea/', noteKey: 'about.notes.intellij' },
      { name: 'Visual Studio Code', url: 'https://code.visualstudio.com/', noteKey: 'about.notes.vscode' }
    ]
  },
  {
    titleKey: 'about.sections.versionControl',
    tools: [
      { name: 'Git', url: 'https://git-scm.com/', noteKey: 'about.notes.git' },
      { name: 'GitHub', url: 'https://github.com/', noteKey: 'about.notes.github' }
    ]
  },
  {
    titleKey: 'about.sections.infrastructure',
    tools: [
      { name: 'Coolify', url: 'https://coolify.io/', noteKey: 'about.notes.coolify' },
      { name: 'CloudPanel', url: 'https://www.cloudpanel.io/', noteKey: 'about.notes.cloudpanel' }
    ]
  },
  {
    titleKey: 'about.sections.dataAndFiles',
    tools: [
      { name: 'JSON Crack', url: 'https://jsoncrack.com/', noteKey: 'about.notes.jsonCrack' }
    ]
  }
]

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
  title: () => t('about.seo.title'),
  description: () => t('about.seo.description'),
  ogTitle: () => t('about.seo.ogTitle'),
  ogDescription: () => t('about.seo.description')
})
</script>

<template>
  <section class="space-y-8">
    <header class="space-y-3 border border-zinc-700 bg-zinc-950 p-5 sm:p-7">
      <p class="section-kicker">{{ t('about.kicker') }}</p>
      <h1 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">{{ t('about.title') }}</h1>
      <p class="max-w-3xl text-zinc-300">{{ t('about.description') }}</p>
    </header>

    <section class="border border-zinc-700 bg-zinc-950 p-5 sm:p-6">
      <div class="prose prose-invert blog-prose max-w-none">
        <p>{{ t('about.body1') }}</p>
        <p>{{ t('about.body2') }}</p>
      </div>
    </section>

    <section class="space-y-6">
      <div class="space-y-2">
        <p class="section-kicker">{{ t('about.toolingKicker') }}</p>
        <h2 class="text-2xl font-black uppercase tracking-tight sm:text-3xl">{{ t('about.toolingTitle') }}</h2>
      </div>

      <div class="space-y-6">
        <div v-for="section in toolSections" :key="section.titleKey" class="space-y-3">
          <h3 class="text-lg font-bold uppercase tracking-[0.08em] text-zinc-200">{{ t(section.titleKey) }}</h3>
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
                <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">{{ t('about.toolLabel') }}</p>
              </div>

              <h4 class="mb-2 text-lg font-bold uppercase leading-tight">{{ tool.name }}</h4>
              <p class="mb-5 text-sm leading-6 text-zinc-300">{{ t(tool.noteKey) }}</p>

              <div class="mt-auto flex items-end justify-between gap-3">
                <span class="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{{ toolHost(tool.url) }}</span>
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 no-underline transition group-hover:text-white"
                >
                  {{ t('about.open') }}
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
