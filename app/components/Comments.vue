<script setup lang="ts">
import Giscus from '@giscus/vue'

// You can also pass these as props if you want dynamic configuration per page
const giscusConfig = {
  repo: "zirheyn/terminal",
  repoId: "R_kgDOR9mXRg",
  category: "General",
  categoryId: "DIC_kwDOR9mXRs4C6a-A",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  theme: "dark_protanopia",
  lang: "en",
  loading: "lazy",
}
</script>

<template>
  <div class="comments-container">
    <ClientOnly>
      <Giscus
        v-bind="giscusConfig"
        host="https://giscus.app"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 2rem;
}
</style>