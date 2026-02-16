import tailwindcss from '@tailwindcss/vite'

const siteUrl = 'https://example.com'
const githubToken = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.GITHUB_TOKEN || ''

export default defineNuxtConfig({
  compatibilityDate: '2025-12-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()] as any
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      titleTemplate: '%s | Briac',
      meta: [
        {
          name: 'description',
          content: 'Blog et portfolio personnel orienté sécurité, recherche et ingénierie.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: 'Briac'
        },
        {
          property: 'og:title',
          content: 'Briac'
        },
        {
          property: 'og:description',
          content: 'Blog et portfolio personnel orienté sécurité, recherche et ingénierie.'
        },
        {
          property: 'og:url',
          content: siteUrl
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'RSS Feed',
          href: '/rss.xml'
        }
      ]
    }
  },
  runtimeConfig: {
    githubToken,
    public: {
      siteUrl,
      githubUsername: 'briacdev'
    }
  },
  nitro: {
    prerender: {
      routes: ['/rss.xml', '/sitemap.xml', '/robots.txt']
    }
  }
})
