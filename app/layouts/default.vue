<template>
  <div class="site-shell min-h-screen bg-black text-zinc-100">
    <SiteHeader />
    <main class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
