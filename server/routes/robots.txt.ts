export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const body = [`User-agent: *`, `Allow: /`, `Sitemap: ${config.public.siteUrl}/sitemap.xml`].join('\n')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return body
})
