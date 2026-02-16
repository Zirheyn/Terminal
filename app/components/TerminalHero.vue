<template>
  <section class="brutal-panel-dark hero-with-image px-4 py-8 sm:px-8 sm:py-14">
    <div class="hero-content ml-0 w-full max-w-full text-left md:ml-auto md:max-w-xl md:text-right">
      <p class="hero-kicker">briac.dev // personal log</p>

      <h1 class="hero-display mt-5">
        <span class="block">DEV.</span>
        <span class="block">SEC.</span>
        <span class="block">OPS.</span>
      </h1>

      <div class="hero-divider" aria-hidden="true" />

      <p class="mt-6 ml-0 max-w-lg text-left text-sm text-zinc-300 sm:text-base md:ml-auto md:max-w-md md:text-right">
        Personal blog and portfolio by Briac. I share security write-ups, engineering experiments, and practical tools built in the open.
      </p>

      <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start md:justify-end">
        <UButton to="/blog" color="neutral" variant="outline" class="button-like w-full justify-center rounded-none border-2 border-zinc-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:border-white hover:bg-white hover:text-black sm:w-auto">
          Read the Blog
        </UButton>
        <UButton to="/projects" color="neutral" variant="outline" class="button-like w-full justify-center rounded-none border-2 border-zinc-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:border-white hover:bg-white hover:text-black sm:w-auto">
          View Projects
        </UButton>
      </div>
    </div>
  </section>
</template>
