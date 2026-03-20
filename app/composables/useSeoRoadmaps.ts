import { useI18n } from '#i18n'
import { normalizeSeoRoadmapPath, sortSeoRoadmapItems } from '../data/seo-roadmap'

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

const queryCollectionLoose = queryCollection as unknown as (collection: string) => {
  where: (field: string, operator: '=', value: boolean) => { all: () => Promise<SeoRoadmapPost[]> }
}

export const useSeoRoadmaps = async () => {
  const { locale } = useI18n()

  const rawPosts = locale.value === 'fr'
    ? await queryCollectionLoose('roadmapsFr').where('draft', '=', false).all()
    : await queryCollection('roadmaps').where('draft', '=', false).all() as SeoRoadmapPost[]

  return sortSeoRoadmapItems(
    rawPosts
      .filter((post) =>
        post.path.startsWith('/seo/') ||
        post.path.startsWith('/roadmaps/seo/') ||
        post.path.startsWith('/roadmaps-fr/seo/')
      )
      .map((post) => ({
        ...post,
        path: normalizeSeoRoadmapPath(post.path),
        tags: post.tags ?? []
      }))
  )
}
