export interface ProjectItem {
  path: string
  title: string
  description: string
  tags: string[]
  stack: string[]
  year: number
  active: boolean
  cover?: string
  body?: {
    toc?: {
      links?: Array<{
        id: string
        text: string
      }>
    }
  }
  links?: {
    repo?: string
    demo?: string
  }
}

export const useProjects = async () => {
  const projects = await queryCollection('projects')
    .order('year', 'DESC')
    .all() as ProjectItem[]

  return projects
}
