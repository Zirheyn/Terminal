<script setup lang="ts">
const posts = await usePosts()
const projects = await useProjects()

const latestPosts = computed(() => posts.slice(0, 3))
const featuredProjects = computed(() => projects.slice(0, 3))
const featuredRoadmaps = [
  {
    path: '/java',
    title: 'Java Roadmap',
    description: 'A to Z learning path from Java fundamentals to production-grade backend engineering.',
    tags: ['roadmap', 'java'],
    cover: '/roadmaps/java-roadmap.webp'
  },
  {
    path: '/seo',
    title: 'SEO Roadmap',
    description: 'Step-by-step roadmap from SEO fundamentals to technical execution and long-term growth.',
    tags: ['roadmap', 'seo'],
    cover: '/roadmaps/seo-roadmap.webp'
  }
]

interface GithubStats {
  metrics: {
    publicReposLabel: string
    totalStarsLabel: string
    contributionsLastYearLabel: string
    followersLabel: string
  }
  calendar: {
    weeks: Array<Array<{
      date: string
      count: number
      level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
    }>>
    streak: {
      current: number
      longest: number
      activeDays30: number
    }
  }
  repos: Array<{
    name: string
    status: string
    stars: number
    pushedDaysAgo: number
    url: string
  }>
}

const { data: githubStats } = await useFetch<GithubStats>('/api/github-stats', {
  server: true
})

const metrics = computed(() => ({
  publicRepos: githubStats.value?.metrics.publicReposLabel || '0',
  totalStars: githubStats.value?.metrics.totalStarsLabel || '0',
  contributionsYear: githubStats.value?.metrics.contributionsLastYearLabel || 'N/A',
  followers: githubStats.value?.metrics.followersLabel || '0'
}))

const activeRepos = computed(() => githubStats.value?.repos || [])
const calendarWeeks = computed(() => githubStats.value?.calendar.weeks || [])
const hoveredContribution = ref<{ date: string, count: number } | null>(null)

const contributionLevelClass = (level: string) => {
  if (level === 'FOURTH_QUARTILE') return 'contrib-lvl-4'
  if (level === 'THIRD_QUARTILE') return 'contrib-lvl-3'
  if (level === 'SECOND_QUARTILE') return 'contrib-lvl-2'
  if (level === 'FIRST_QUARTILE') return 'contrib-lvl-1'
  return 'contrib-lvl-0'
}

const contributionHoverLabel = computed(() => {
  if (!hoveredContribution.value) {
    return 'Hover a cell to inspect daily contributions.'
  }

  const formattedDate = new Date(hoveredContribution.value.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const suffix = hoveredContribution.value.count > 1 ? 'contributions' : 'contribution'
  return `${formattedDate}: ${hoveredContribution.value.count} ${suffix}`
})

useSeoMeta({
  title: 'Developer Portfolio, Security Research and Engineering Blog',
  description: 'Personal website by Briac with cybersecurity write-ups, backend engineering notes, production tooling, projects, and practical roadmaps.',
  ogTitle: 'Briac | Developer Portfolio, Security Research and Engineering Blog',
  ogDescription: 'Personal website by Briac with cybersecurity write-ups, backend engineering notes, production tooling, projects, and practical roadmaps.',
  twitterTitle: 'Briac | Developer Portfolio, Security Research and Engineering Blog',
  twitterDescription: 'Cybersecurity write-ups, backend engineering notes, projects, and practical roadmaps.'
})
</script>

<template>
  <div class="relative space-y-10 overflow-hidden sm:space-y-14">
    <ClientOnly>
      <ThreeAsciiBackground />
    </ClientOnly>

    <div class="relative z-10 space-y-10 sm:space-y-14">
      <TerminalHero />

      <section class="brutal-panel-dark p-4 sm:p-6">
        <div class="mb-3 flex items-center justify-between gap-3 border-b border-zinc-700 pb-2">
          <p class="section-kicker">Live Ops</p>
          <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">real-time status</p>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <div class="panel-window p-4 lg:col-span-2">
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Contribution Graph</p>
              <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{{ metrics.contributionsYear }} in 1y</p>
            </div>
            <div class="contrib-heatmap" :style="{ gridTemplateColumns: `repeat(${calendarWeeks.length || 53}, minmax(0, 1fr))` }">
              <div v-for="(week, weekIndex) in calendarWeeks" :key="`week-${weekIndex}`" class="contrib-week">
                <div
                  v-for="day in week"
                  :key="day.date"
                  class="contrib-cell"
                  :class="contributionLevelClass(day.level)"
                  :title="`${day.date}: ${day.count} contributions`"
                  tabindex="0"
                  @mouseenter="hoveredContribution = { date: day.date, count: day.count }"
                  @mouseleave="hoveredContribution = null"
                  @focus="hoveredContribution = { date: day.date, count: day.count }"
                  @blur="hoveredContribution = null"
                />
              </div>
            </div>
            <p class="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-400">{{ contributionHoverLabel }}</p>
          </div>
        </div>

        <div class="mt-4 grid gap-4 lg:grid-cols-2">
          <div class="panel-window p-4">
            <p class="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Performance Metrics</p>
            <ul class="space-y-2">
              <li class="metric-row">
                <span>Public Repos</span>
                <strong>{{ metrics.publicRepos }}</strong>
              </li>
              <li class="metric-row">
                <span>Total Stars</span>
                <strong>{{ metrics.totalStars }}</strong>
              </li>
              <li class="metric-row">
                <span>Contributions (1y)</span>
                <strong>{{ metrics.contributionsYear }}</strong>
              </li>
              <li class="metric-row">
                <span>Followers</span>
                <strong>{{ metrics.followers }}</strong>
              </li>
            </ul>
          </div>

          <div class="panel-window p-4">
            <p class="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Repository Activity</p>
            <ul class="space-y-2 text-xs">
              <li v-for="repo in activeRepos" :key="repo.name" class="node-row">
                <a :href="repo.url" target="_blank" rel="noopener noreferrer" class="no-underline hover:underline">
                  {{ repo.name }}
                </a>
                <span>{{ repo.status }}</span>
                <span>{{ repo.pushedDaysAgo }}d · ★{{ repo.stars }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="brutal-panel-dark p-5 sm:p-6">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <p class="section-kicker">Knowledge Base</p>
            <h2 class="section-title">Latest Articles</h2>
          </div>
          <NuxtLink class="button-like section-link" to="/blog">View all</NuxtLink>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <PostCard v-for="post in latestPosts" :key="post.path" :post="post" />
        </div>
      </section>

      <section class="brutal-panel-dark p-5 sm:p-6">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <p class="section-kicker">Execution Layer</p>
            <h2 class="section-title">Featured Projects</h2>
          </div>
          <NuxtLink class="button-like section-link" to="/projects">View all</NuxtLink>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <ProjectCard v-for="project in featuredProjects" :key="project.path" :project="project" />
        </div>
      </section>

      <section class="brutal-panel-dark p-5 sm:p-6">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <p class="section-kicker">Learning Paths</p>
            <h2 class="section-title">Roadmaps</h2>
          </div>
          <NuxtLink class="button-like section-link" to="/roadmaps">View all</NuxtLink>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <PostCard v-for="roadmap in featuredRoadmaps" :key="roadmap.path" :post="roadmap" />
        </div>
      </section>
    </div>
  </div>
</template>
