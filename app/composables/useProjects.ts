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
  const rawProjects = await queryCollection('projects')
    .order('year', 'DESC')
    .all()

  const projects: ProjectItem[] = rawProjects.map((project) => {
    const source = project as unknown as Record<string, unknown>
    const stack = Array.isArray(source.stack)
      ? source.stack.filter((item): item is string => typeof item === 'string')
      : []
    const active = typeof source.active === 'boolean' ? source.active : false

    return {
      ...project,
      tags: project.tags ?? [],
      stack,
      active
    }
  })

  return projects
}
