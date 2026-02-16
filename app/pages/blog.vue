<script setup lang="ts">
const search = ref('')
const posts = await usePosts()

const filteredPosts = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) {
    return posts
  }

  return posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.tags.join(' ').toLowerCase().includes(term)
    )
  })
})

useSeoMeta({
  title: 'Blog',
  description: 'Articles récents sur la sécurité, le tooling et le développement web.',
  ogTitle: 'Blog | Briac // Terminal Portfolio',
  ogDescription: 'Articles récents sur la sécurité, le tooling et le développement web.'
})
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Blog</h1>
      <p class="text-zinc-300">Recherche locale côté client et tri par date décroissante.</p>
    </div>

    <SearchInput v-model="search" placeholder="Filter by title, description, tags..." />

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PostCard v-for="post in filteredPosts" :key="post.path" :post="post" />
    </div>

    <p v-if="!filteredPosts.length" class="border border-zinc-700 p-4 text-zinc-400">
      No matching article.
    </p>
  </section>
</template>
