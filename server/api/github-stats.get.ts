interface GithubUser {
  login: string
  name: string | null
  html_url: string
  avatar_url: string
  blog: string | null
  public_repos: number
  followers: number
  following: number
  updated_at: string
}

interface GithubRepo {
  name: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  pushed_at: string
  html_url: string
}

interface GithubEvent {
  type: string
  created_at: string
  payload?: {
    commits?: Array<{ sha: string }>
  }
}

interface CalendarDay {
  date: string
  count: number
  level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
}

interface GithubContribResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        totalCommitContributions: number
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              date: string
              contributionCount: number
              contributionLevel: CalendarDay['level']
            }>
          }>
        }
      }
    }
  }
}

const formatNumber = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return String(value)
}

const toDateKey = (date: Date): string => date.toISOString().slice(0, 10)

const levelFromCount = (count: number): CalendarDay['level'] => {
  if (count <= 0) {
    return 'NONE'
  }
  if (count === 1) {
    return 'FIRST_QUARTILE'
  }
  if (count <= 3) {
    return 'SECOND_QUARTILE'
  }
  if (count <= 6) {
    return 'THIRD_QUARTILE'
  }
  return 'FOURTH_QUARTILE'
}

const extractContributionCounts = (svg: string): number[] => {
  const patterns = [
    /data-count="(\d+)"/g,
    /aria-label="(\d+)\s+contributions?/gi,
    />(\d+)\s+contributions?\s+on</gi
  ]

  const matchesPerPattern: number[][] = []

  for (const pattern of patterns) {
    const values: number[] = []
    let match: RegExpExecArray | null = pattern.exec(svg)
    while (match) {
      const value = Number(match[1] || 0)
      if (Number.isFinite(value)) {
        values.push(value)
      }
      match = pattern.exec(svg)
    }
    matchesPerPattern.push(values)
  }

  return matchesPerPattern.sort((a, b) => b.length - a.length)[0] || []
}

const extractProfileYearContributions = (html: string): number | null => {
  const direct = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i)
  if (direct?.[1]) {
    return Number(direct[1].replace(/,/g, ''))
  }

  const aria = html.match(/aria-label="([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year"/i)
  if (aria?.[1]) {
    return Number(aria[1].replace(/,/g, ''))
  }

  return null
}

const buildCalendarWeeks = (dailyCounts: Map<string, number>): CalendarDay[][] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)

  const sundayStart = new Date(start)
  sundayStart.setDate(start.getDate() - start.getDay())

  const days: CalendarDay[] = []
  for (let i = 0; i < 371; i++) {
    const date = new Date(sundayStart)
    date.setDate(sundayStart.getDate() + i)
    const key = toDateKey(date)
    const count = dailyCounts.get(key) || 0
    days.push({
      date: key,
      count,
      level: levelFromCount(count)
    })
  }

  const weeks: CalendarDay[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks.slice(-53)
}

const computeStreak = (weeks: CalendarDay[][]) => {
  const days = weeks.flat().sort((a, b) => a.date.localeCompare(b.date))

  let longest = 0
  let streak = 0
  for (const day of days) {
    if (day.count > 0) {
      streak += 1
      if (streak > longest) {
        longest = streak
      }
    } else {
      streak = 0
    }
  }

  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i]
    if (!day) {
      continue
    }
    if (day.count > 0) {
      current += 1
    } else {
      break
    }
  }

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)
  const activeDays30 = days.filter((d) => d.count > 0 && new Date(d.date) >= cutoff).length

  return { current, longest, activeDays30 }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const username = config.public.githubUsername || 'briacdev'
  const token = String(config.githubToken || '').trim()

  const headers: HeadersInit = {
    'User-Agent': 'briacdev-portfolio',
    Accept: 'application/vnd.github+json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  console.log('[github-stats] Request started', {
    username,
    tokenPresent: Boolean(token)
  })

  const [user, repos, events] = await Promise.all([
    $fetch<GithubUser>(`https://api.github.com/users/${username}`, { headers }),
    $fetch<GithubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
    $fetch<GithubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers }).catch(() => [])
  ])

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
  const totalWatchers = repos.reduce((acc, repo) => acc + repo.watchers_count, 0)

  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
  const recentCommits = events.reduce((acc, entry) => {
    if (entry.type !== 'PushEvent') {
      return acc
    }
    const eventTime = new Date(entry.created_at).getTime()
    if (eventTime < cutoff) {
      return acc
    }
    return acc + (entry.payload?.commits?.length || 0)
  }, 0)

  let contributionsLastYear: number | null = null
  let commitContributionsLastYear: number | null = null
  let calendarWeeks: CalendarDay[][] = []

  if (token) {
    const now = new Date()
    const from = new Date(now)
    from.setFullYear(now.getFullYear() - 1)

    const gqlQuery = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `

    const gqlResponse = await $fetch<GithubContribResponse>('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: {
        query: gqlQuery,
        variables: {
          login: username,
          from: from.toISOString(),
          to: now.toISOString()
        }
      }
    }).catch(() => null)

    contributionsLastYear = gqlResponse?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null
    commitContributionsLastYear = gqlResponse?.data?.user?.contributionsCollection?.totalCommitContributions ?? null

    const weeks = gqlResponse?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
    calendarWeeks = weeks.map((week) => week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel
    })))

    console.log('[github-stats] GraphQL contributions', {
      username,
      graphqlUsed: true,
      contributionsLastYear,
      commitContributionsLastYear,
      weeks: calendarWeeks.length
    })
  } else {
    console.log('[github-stats] GraphQL skipped (missing token)', { username, graphqlUsed: false })
  }

  if (contributionsLastYear === null) {
    const profileHtml = await $fetch<string>(`https://github.com/${username}`, {
      headers: {
        'User-Agent': 'briacdev-portfolio',
        Accept: 'text/html'
      },
      responseType: 'text'
    }).catch(() => '')

    if (profileHtml) {
      const profileCount = extractProfileYearContributions(profileHtml)
      if (typeof profileCount === 'number' && Number.isFinite(profileCount) && profileCount >= 0) {
        contributionsLastYear = profileCount
      }
      console.log('[github-stats] Profile page parsed', {
        username,
        profileCount,
        htmlLength: profileHtml.length
      })
    } else {
      console.log('[github-stats] Profile page unavailable', { username })
    }
  }

  if (contributionsLastYear === null) {
    const now = new Date()
    const from = new Date(now)
    from.setFullYear(now.getFullYear() - 1)

    const svg = await $fetch<string>(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'briacdev-portfolio',
        Accept: 'image/svg+xml,text/html;q=0.9,*/*;q=0.8'
      },
      query: {
        from: from.toISOString().slice(0, 10),
        to: now.toISOString().slice(0, 10)
      },
      responseType: 'text'
    }).catch(() => '')

    if (svg) {
      const counts = extractContributionCounts(svg)
      const sum = counts.reduce((acc, value) => acc + value, 0)
      if (sum > 0) {
        contributionsLastYear = sum
      }
      console.log('[github-stats] Public contributions SVG parsed', {
        username,
        cells: counts.length,
        sum
      })
    } else {
      console.log('[github-stats] Public contributions SVG unavailable', { username })
    }
  }

  if (!calendarWeeks.length) {
    const dailyCounts = new Map<string, number>()
    for (const entry of events) {
      if (entry.type !== 'PushEvent') {
        continue
      }
      const key = entry.created_at.slice(0, 10)
      const count = entry.payload?.commits?.length || 0
      dailyCounts.set(key, (dailyCounts.get(key) || 0) + count)
    }
    calendarWeeks = buildCalendarWeeks(dailyCounts)
    const fallbackSum = calendarWeeks.flat().reduce((acc, day) => acc + day.count, 0)
    contributionsLastYear = contributionsLastYear ?? fallbackSum
    console.log('[github-stats] Fallback from events used', {
      username,
      weeks: calendarWeeks.length,
      fallbackSum
    })
  }

  console.log('[github-stats] Final metrics', {
    username,
    contributionsLastYear,
    recentCommits30d: recentCommits,
    repos: repos.length,
    followers: user.followers
  })

  const streak = computeStreak(calendarWeeks)

  const topRepos = [...repos]
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 4)
    .map((repo) => ({
      name: repo.name.toUpperCase(),
      status: 'ACTIVE',
      stars: repo.stargazers_count,
      pushedDaysAgo: Math.max(0, Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24))),
      url: repo.html_url
    }))

  return {
    profile: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      blog: user.blog,
      updatedAt: user.updated_at
    },
    metrics: {
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      totalWatchers,
      recentCommits30d: recentCommits,
      contributionsLastYear,
      commitContributionsLastYear,
      publicReposLabel: formatNumber(user.public_repos),
      totalStarsLabel: formatNumber(totalStars),
      recentCommits30dLabel: formatNumber(recentCommits),
      contributionsLastYearLabel: contributionsLastYear !== null ? formatNumber(contributionsLastYear) : 'N/A',
      followersLabel: formatNumber(user.followers)
    },
    calendar: {
      weeks: calendarWeeks,
      streak
    },
    repos: topRepos
  }
})
