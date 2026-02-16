export interface ProjectItem {
  path: string
  title: string
  description: string
  tags: string[]
  year: number
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
