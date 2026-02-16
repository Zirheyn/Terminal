export interface SeoRoadmapPost {
  path: string
  title: string
  description: string
  date: string
  tags: string[]
  draft: boolean
  readingTime?: string
  cover?: string
  body?: {
    toc?: {
      links?: Array<{
        id: string
        text: string
      }>
    }
  }
}

export const useSeoRoadmaps = async () => {
  const posts = await queryCollection('roadmaps')
    .where('draft', '=', false)
    .all() as SeoRoadmapPost[]

  const normalizeSeoPath = (path: string) => {
    if (path.startsWith('/seo/')) {
      return path
    }
    if (path.startsWith('/roadmaps/seo/')) {
      return path.replace('/roadmaps/seo/', '/seo/')
    }
    return path
  }

  return posts
    .filter((post) => post.path.startsWith('/seo/') || post.path.startsWith('/roadmaps/seo/'))
    .map((post) => ({
      ...post,
      path: normalizeSeoPath(post.path)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
