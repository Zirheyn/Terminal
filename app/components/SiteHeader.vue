<script setup lang="ts">
import { useLocalePath } from '#i18n'

const route = useRoute()
const localePath = useLocalePath()

const navItems = [
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' }
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b-2 border-white bg-black/95 backdrop-blur">
    <div class="mx-auto grid h-16 w-full max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
      <NuxtLink :to="localePath('/')" class="site-logo inline-flex items-center gap-2 border-2 border-white bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-black no-underline">
        <span>[BRIAC]</span>
        <span class="hidden sm:inline">DEV</span>
      </NuxtLink>

      <nav aria-label="Main navigation" class="justify-self-end">
        <ul class="flex items-center gap-2 sm:gap-3">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="localePath(item.to)"
              class="button-like inline-flex border-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] no-underline transition"
              :class="route.path.startsWith(localePath(item.to)) ? 'border-white bg-white text-black' : 'border-zinc-600 text-zinc-100 hover:border-white hover:bg-white hover:text-black'"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
