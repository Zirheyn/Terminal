<template>
  <footer class="border-t-2 border-white py-8">
    <div class="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">terminal portfolio</p>
        <p class="mt-1 text-sm text-zinc-300">© {{ new Date().getFullYear() }} Briac.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em]">
        <a class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black" href="https://github.com/placeholder" target="_blank" rel="noopener noreferrer">
          <UIcon name="i-simple-icons-github" class="size-3.5" />
          <span>GitHub</span>
        </a>
        <a class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black" href="https://linkedin.com/in/placeholder" target="_blank" rel="noopener noreferrer">
          <UIcon name="i-simple-icons-linkedin" class="size-3.5" />
          <span>LinkedIn</span>
        </a>
        <a class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black" href="mailto:briacd@pm.me">
          <UIcon name="i-lucide-mail" class="size-3.5" />
          <span>Email</span>
        </a>
        <a class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black" href="/rss.xml">
          <UIcon name="i-lucide-rss" class="size-3.5" />
          <span>RSS</span>
        </a>
      </div>
    </div>
  </footer>
</template>
