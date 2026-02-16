import { queryCollection } from '@nuxt/content/server'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl
  const posts = await queryCollection(event, 'posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const items = posts
    .map((post) => {
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${siteUrl}${post.path}</link>`,
        `<guid>${siteUrl}${post.path}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        '</item>'
      ].join('')
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Briac // Terminal Portfolio</title><link>${siteUrl}</link><description>RSS feed du blog</description>${items}</channel></rss>`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
