<script setup lang="ts">
const config = useRuntimeConfig()
const switchLocalePath = useSwitchLocalePath()
const { locale, t } = useI18n()
const currentLocale = computed(() => locale.value || 'en')

const githubUrl = computed(() => config.public.footerGithubUrl || '')
const linkedinUrl = computed(() => config.public.footerLinkedinUrl || '')
const emailHref = computed(() => {
  const email = config.public.footerEmail || ''
  return email ? `mailto:${email}` : ''
})
</script>

<template>
  <footer class="border-t-2 border-white py-8">
    <div class="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">terminal portfolio</p>
        <p class="mt-1 text-sm text-zinc-300">© {{ new Date().getFullYear() }} Briac.</p>
      </div>
      <div class="flex flex-wrap items-center justify-start gap-3 text-xs uppercase tracking-[0.12em] lg:justify-end">
        <div class="flex items-center gap-1" :aria-label="t('header.locale')">
          <NuxtLink
            :to="switchLocalePath('en')"
            :aria-current="currentLocale === 'en' ? 'true' : undefined"
            class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] no-underline transition"
            :class="currentLocale === 'en'
              ? '!border-white !bg-white !text-black'
              : 'text-zinc-100 hover:border-white hover:bg-white hover:text-black'"
          >
            EN
          </NuxtLink>
          <NuxtLink
            :to="switchLocalePath('fr')"
            :aria-current="currentLocale === 'fr' ? 'true' : undefined"
            class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] no-underline transition"
            :class="currentLocale === 'fr'
              ? '!border-white !bg-white !text-black'
              : 'text-zinc-100 hover:border-white hover:bg-white hover:text-black'"
          >
            FR
          </NuxtLink>
        </div>

        <a
          v-if="githubUrl"
          class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon name="i-simple-icons-github" class="size-3.5" />
          <span>GitHub</span>
        </a>
        <a
          v-if="linkedinUrl"
          class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black"
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon name="i-simple-icons-linkedin" class="size-3.5" />
          <span>LinkedIn</span>
        </a>
        <a
          v-if="emailHref"
          class="button-like inline-flex items-center gap-1.5 border border-zinc-600 px-2 py-1 no-underline hover:border-white hover:bg-white hover:text-black"
          :href="emailHref"
        >
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
