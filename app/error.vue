<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const isNotFound = computed(() => (useError().value?.statusCode || 500) === 404)
</script>

<template>
  <div class="mx-auto my-10 w-full max-w-4xl px-4 sm:my-16 sm:px-6">
    <section class="brutal-panel-dark overflow-hidden border-2 border-zinc-600">
      <div class="flex items-center justify-between border-b border-zinc-700 bg-zinc-950 px-4 py-3 sm:px-6">
        <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">system fault</p>
        <p class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">error log</p>
      </div>

      <div class="grid gap-6 p-5 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div class="border border-zinc-700 bg-black p-4 text-left">
          <p class="text-[10px] uppercase tracking-[0.18em] text-zinc-500">status code</p>
          <p class="mt-2 text-5xl font-black leading-none text-white sm:text-6xl">{{ error.statusCode || 500 }}</p>
          <p class="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-500">
            {{ isNotFound ? 'resource missing' : 'request failed' }}
          </p>
        </div>

        <div class="space-y-5">
          <div class="space-y-2">
            <h1 class="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              {{ error.statusMessage || 'Unexpected Error' }}
            </h1>
            <p class="max-w-2xl text-sm leading-7 text-zinc-300">
              {{ error.message || 'The request could not be completed. Check the URL or return to a stable route.' }}
            </p>
          </div>

          <div class="border border-zinc-700 bg-zinc-950 p-3 text-xs leading-6 text-zinc-400">
            This screen is intentionally minimal: no stack trace is exposed in production routes.
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              to="/"
              color="neutral"
              variant="outline"
              class="button-like rounded-none border border-zinc-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-white hover:text-black"
            >
              Return Home
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
