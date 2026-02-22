import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.union([z.string(), z.date()]).transform((value) => {
          if (typeof value === 'string') {
            return value
          }
          return value.toISOString().slice(0, 10)
        }),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        cover: z.string().optional(),
        readingTime: z.string().optional()
      })
    }),

    roadmaps: defineCollection({
      type: 'page',
      source: 'roadmaps/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.union([z.string(), z.date()]).transform((value) => {
          if (typeof value === 'string') {
            return value
          }
          return value.toISOString().slice(0, 10)
        }),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        cover: z.string().optional(),
        readingTime: z.string().optional()
      })
    }),

    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
        year: z.number(),
        cover: z.string().optional(),
        links: z
          .object({
            repo: z.string().optional(),
            demo: z.string().optional()
          })
          .default({})
      })
    }),
    
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional()
      })
    })
  }
})
