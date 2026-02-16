<script setup lang="ts">
const about = await queryCollection('pages').path('/about').first()

if (!about) {
  throw createError({ statusCode: 404, statusMessage: 'About page not found' })
}

useSeoMeta({
  title: 'About',
  description: about.description || 'À propos',
  ogTitle: 'About | Briac // Terminal Portfolio',
  ogDescription: about.description || 'À propos'
})
</script>

<template>
  <section class="space-y-6">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">{{ about.title }}</h1>
      <p v-if="about.description" class="text-zinc-300">{{ about.description }}</p>
    </header>

    <ContentRenderer :value="about" class="prose prose-invert max-w-none" />
  </section>
</template>
