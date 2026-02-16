export interface BlogPost {
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

export const usePosts = async () => {
  const posts = await queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all() as BlogPost[]

  return posts
}
