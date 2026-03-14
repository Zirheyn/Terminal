<script setup lang="ts">
type LifeCell = [number, number]

interface LifePattern {
  id: string
  liveCells: LifeCell[]
  size: 'regular' | 'large'
}

interface PlacedPattern {
  id: string
  liveCells: LifeCell[]
  origin: LifeCell
  width: number
  height: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const offsetCells = (cells: LifeCell[], offsetX: number, offsetY: number) =>
  cells.map(([x, y]) => [x + offsetX, y + offsetY] as LifeCell)

const mergeCells = (...groups: LifeCell[][]) => groups.flat()

const gliderCells: LifeCell[] = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2]
]

const beaconCells: LifeCell[] = [
  [0, 1],
  [1, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 3],
  [2, 4],
  [3, 4]
]

const pulsarCells: LifeCell[] = [
  [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
  [0, 2], [5, 2], [7, 2], [12, 2],
  [0, 3], [5, 3], [7, 3], [12, 3],
  [0, 4], [5, 4], [7, 4], [12, 4],
  [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
  [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
  [0, 8], [5, 8], [7, 8], [12, 8],
  [0, 9], [5, 9], [7, 9], [12, 9],
  [0, 10], [5, 10], [7, 10], [12, 10],
  [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12]
]

const gosperGliderGunCells: LifeCell[] = [
  [24, 0],
  [22, 1], [24, 1],
  [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
  [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3],
  [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4],
  [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5],
  [10, 6], [16, 6], [24, 6],
  [11, 7], [15, 7],
  [12, 8], [13, 8]
]

const GOSPER_GUN_WIDTH = 36

const mirroredGosperGliderGunCells: LifeCell[] = gosperGliderGunCells.map(([x, y]) => [GOSPER_GUN_WIDTH - 1 - x, y] as LifeCell)

const cannonPatterns: LifePattern[] = [
  {
    id: 'gosper-glider-gun',
    liveCells: gosperGliderGunCells,
    size: 'large'
  },
  {
    id: 'twin-gosper-cannons',
    liveCells: mergeCells(
      gosperGliderGunCells,
      offsetCells(mirroredGosperGliderGunCells, 46, 4)
    ),
    size: 'large'
  },
  {
    id: 'cannon-battery',
    liveCells: mergeCells(
      gosperGliderGunCells,
      offsetCells(gosperGliderGunCells, 0, 18),
      offsetCells(mirroredGosperGliderGunCells, 46, 9)
    ),
    size: 'large'
  }
]

const standardPatterns: LifePattern[] = [
  {
    id: 'blinker',
    liveCells: [
      [0, 0],
      [1, 0],
      [2, 0]
    ],
    size: 'regular'
  },
  {
    id: 'toad',
    liveCells: [
      [1, 0],
      [2, 0],
      [3, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    size: 'regular'
  },
  {
    id: 'beacon',
    liveCells: beaconCells,
    size: 'regular'
  },
  {
    id: 'pulsar',
    liveCells: pulsarCells,
    size: 'large'
  },
  {
    id: 'double-pulsar',
    liveCells: mergeCells(
      pulsarCells,
      offsetCells(pulsarCells, 18, 0)
    ),
    size: 'large'
  },
  {
    id: 'glider',
    liveCells: gliderCells,
    size: 'regular'
  },
  {
    id: 'glider-swarm',
    liveCells: mergeCells(
      gliderCells,
      offsetCells(gliderCells, 8, 3),
      offsetCells(gliderCells, 16, 0),
      offsetCells(gliderCells, 24, 4)
    ),
    size: 'large'
  },
  {
    id: 'lwss',
    liveCells: [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [4, 1],
      [4, 2],
      [0, 3],
      [3, 3]
    ],
    size: 'regular'
  },
  {
    id: 'r-pentomino',
    liveCells: [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [1, 2]
    ],
    size: 'regular'
  },
  {
    id: 'acorn',
    liveCells: [
      [1, 0],
      [3, 1],
      [0, 2],
      [1, 2],
      [4, 2],
      [5, 2],
      [6, 2]
    ],
    size: 'regular'
  },
  {
    id: 'diehard',
    liveCells: [
      [6, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [5, 2],
      [6, 2],
      [7, 2]
    ],
    size: 'regular'
  },
  {
    id: 'small-exploder',
    liveCells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 2],
      [2, 2],
      [1, 3]
    ],
    size: 'regular'
  },
  {
    id: 'beacon-matrix',
    liveCells: mergeCells(
      beaconCells,
      offsetCells(beaconCells, 10, 0),
      offsetCells(beaconCells, 0, 10),
      offsetCells(beaconCells, 10, 10)
    ),
    size: 'large'
  }
]

const patterns: LifePattern[] = [...cannonPatterns, ...standardPatterns]

const CELL_MARGIN = 10
const MIN_PATTERN_GAP = 8
const INSTANCE_COUNT = 15
const LARGE_PATTERN_COUNT = 4
const CANNON_PATTERN_COUNT = 2
const MAX_RANDOM_PLACEMENT_ATTEMPTS = 180

let live = new Set<string>()
let simulationTimer: number | null = null
let resizeObserver: ResizeObserver | null = null
let motionMediaQuery: MediaQueryList | null = null
let motionListener: ((event: MediaQueryListEvent) => void) | null = null

let cols = 0
let rows = 0
let cellSize = 4

const keyFor = (x: number, y: number) => `${x}:${y}`

const parseKey = (value: string): LifeCell => {
  const [rawX = '0', rawY = '0'] = value.split(':')
  const x = Number(rawX)
  const y = Number(rawY)
  return [x, y]
}

const randomInt = (min: number, max: number) => {
  if (max <= min) {
    return min
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const shuffle = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index)
    const current = next[index]
    next[index] = next[swapIndex] as T
    next[swapIndex] = current as T
  }

  return next
}

const normalizeCells = (cells: LifeCell[]) => {
  const minX = Math.min(...cells.map(([x]) => x))
  const minY = Math.min(...cells.map(([, y]) => y))

  return cells.map(([x, y]) => [x - minX, y - minY] as LifeCell)
}

const rotateCells = (cells: LifeCell[]) =>
  normalizeCells(cells.map(([x, y]) => [-y, x] as LifeCell))

const mirrorCells = (cells: LifeCell[]) =>
  normalizeCells(cells.map(([x, y]) => [-x, y] as LifeCell))

const randomizePatternCells = (cells: LifeCell[]) => {
  let next = normalizeCells(cells)

  if (Math.random() > 0.5) {
    next = mirrorCells(next)
  }

  const turns = randomInt(0, 3)

  for (let turn = 0; turn < turns; turn += 1) {
    next = rotateCells(next)
  }

  return next
}

const patternDimensions = (cells: LifeCell[]) => ({
  width: Math.max(...cells.map(([x]) => x)) + 1,
  height: Math.max(...cells.map(([, y]) => y)) + 1
})

const collidesWithPlaced = (candidate: PlacedPattern, placedPatterns: PlacedPattern[]) =>
  placedPatterns.some((placedPattern) => {
    const separatedHorizontally =
      candidate.origin[0] + candidate.width + MIN_PATTERN_GAP <= placedPattern.origin[0] ||
      placedPattern.origin[0] + placedPattern.width + MIN_PATTERN_GAP <= candidate.origin[0]

    const separatedVertically =
      candidate.origin[1] + candidate.height + MIN_PATTERN_GAP <= placedPattern.origin[1] ||
      placedPattern.origin[1] + placedPattern.height + MIN_PATTERN_GAP <= candidate.origin[1]

    return !(separatedHorizontally || separatedVertically)
  })

const createPlacedPattern = (
  pattern: LifePattern,
  liveCells: LifeCell[],
  x: number,
  y: number
): PlacedPattern => {
  const { width, height } = patternDimensions(liveCells)

  return {
    id: pattern.id,
    liveCells,
    origin: [x, y],
    width,
    height
  }
}

const canFitPattern = (width: number, height: number) =>
  cols - width - CELL_MARGIN * 2 >= 0 && rows - height - CELL_MARGIN * 2 >= 0

const findOpenSlot = (pattern: LifePattern, liveCells: LifeCell[], placedPatterns: PlacedPattern[]) => {
  const { width, height } = patternDimensions(liveCells)

  if (!canFitPattern(width, height)) {
    return null
  }

  const maxX = cols - width - CELL_MARGIN
  const maxY = rows - height - CELL_MARGIN

  for (let attempt = 0; attempt < MAX_RANDOM_PLACEMENT_ATTEMPTS; attempt += 1) {
    const x = randomInt(CELL_MARGIN, maxX)
    const y = randomInt(CELL_MARGIN, maxY)
    const candidate = createPlacedPattern(pattern, liveCells, x, y)

    if (!collidesWithPlaced(candidate, placedPatterns)) {
      return candidate
    }
  }

  for (let y = CELL_MARGIN; y <= maxY; y += 2) {
    for (let x = CELL_MARGIN; x <= maxX; x += 2) {
      const candidate = createPlacedPattern(pattern, liveCells, x, y)

      if (!collidesWithPlaced(candidate, placedPatterns)) {
        return candidate
      }
    }
  }

  return null
}

const seedWorld = (compact: boolean) => {
  const next = new Set<string>()
  const targetCount = compact ? 7 : INSTANCE_COUNT
  const largeTarget = compact ? 1 : LARGE_PATTERN_COUNT
  const cannonTarget = compact ? 1 : CANNON_PATTERN_COUNT
  const selectedCannons = shuffle(cannonPatterns).slice(0, cannonTarget)
  const selectedIds = new Set(selectedCannons.map((pattern) => pattern.id))
  const supplementalLargePatterns = shuffle(
    patterns.filter((pattern) => pattern.size === 'large' && !selectedIds.has(pattern.id))
  ).slice(0, Math.max(largeTarget - selectedCannons.length, 0))

  supplementalLargePatterns.forEach((pattern) => {
    selectedIds.add(pattern.id)
  })

  const regularPatterns = shuffle(
    patterns.filter((pattern) => !selectedIds.has(pattern.id))
  ).slice(0, Math.max(targetCount - selectedCannons.length - supplementalLargePatterns.length, 0))

  const selectedPatterns = shuffle([...selectedCannons, ...supplementalLargePatterns, ...regularPatterns])
  const placedPatterns: PlacedPattern[] = []

  selectedPatterns.forEach((pattern) => {
    const randomizedCells = randomizePatternCells(pattern.liveCells)
    const placedPattern = findOpenSlot(pattern, randomizedCells, placedPatterns)

    if (!placedPattern) {
      return
    }

    placedPatterns.push(placedPattern)

    placedPattern.liveCells.forEach(([x, y]) => {
      next.add(keyFor(placedPattern.origin[0] + x, placedPattern.origin[1] + y))
    })
  })

  live = next
}

const nextGeneration = () => {
  const neighborCounts = new Map<string, number>()

  live.forEach((value) => {
    const [x, y] = parseKey(value)

    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) {
          continue
        }

        const nx = x + dx
        const ny = y + dy

        if (nx < -CELL_MARGIN || ny < -CELL_MARGIN || nx > cols + CELL_MARGIN || ny > rows + CELL_MARGIN) {
          continue
        }

        const neighborKey = keyFor(nx, ny)
        neighborCounts.set(neighborKey, (neighborCounts.get(neighborKey) || 0) + 1)
      }
    }
  })

  const next = new Set<string>()

  neighborCounts.forEach((count, value) => {
    const isAlive = live.has(value)

    if (count === 3 || (isAlive && count === 2)) {
      next.add(value)
    }
  })

  live = next
}

const draw = () => {
  const canvas = canvasRef.value
  const container = containerRef.value

  if (!canvas || !container) {
    return
  }

  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  const width = container.clientWidth
  const height = container.clientHeight
  const dpr = window.devicePixelRatio || 1

  if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)
  context.fillStyle = 'rgba(255, 255, 255, 0.12)'
  context.strokeStyle = 'rgba(255, 255, 255, 0.14)'
  context.lineWidth = 1

  live.forEach((value) => {
    const [x, y] = parseKey(value)
    const px = x * cellSize
    const py = y * cellSize

    if (px + cellSize < 0 || py + cellSize < 0 || px > width || py > height) {
      return
    }

    context.fillRect(px, py, cellSize - 1, cellSize - 1)
    context.strokeRect(px + 0.5, py + 0.5, Math.max(cellSize - 2, 1), Math.max(cellSize - 2, 1))
  })
}

const stopSimulation = () => {
  if (simulationTimer !== null) {
    window.clearInterval(simulationTimer)
    simulationTimer = null
  }
}

const startSimulation = () => {
  stopSimulation()

  if (motionMediaQuery?.matches) {
    draw()
    return
  }

  simulationTimer = window.setInterval(() => {
    nextGeneration()

    if (live.size < 18) {
      seedWorld(window.innerWidth < 900)
    }

    draw()
  }, 420)
}

const syncCanvas = () => {
  const container = containerRef.value
  if (!container) {
    return
  }

  const compact = window.innerWidth < 900
  cellSize = compact ? 3 : 4
  cols = Math.max(Math.ceil(container.clientWidth / cellSize), 1)
  rows = Math.max(Math.ceil(container.clientHeight / cellSize), 1)

  seedWorld(compact)
  draw()
  startSimulation()
}

onMounted(() => {
  motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionListener = () => {
    syncCanvas()
  }
  motionMediaQuery.addEventListener('change', motionListener)

  resizeObserver = new ResizeObserver(() => {
    syncCanvas()
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  syncCanvas()
})

onUnmounted(() => {
  stopSimulation()
  resizeObserver?.disconnect()

  if (motionMediaQuery && motionListener) {
    motionMediaQuery.removeEventListener('change', motionListener)
  }
})
</script>

<template>
  <div ref="containerRef" class="life-background" aria-hidden="true">
    <canvas ref="canvasRef" class="life-canvas" />
  </div>
</template>

<style scoped>
.life-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.life-canvas {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.44;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.04));
}

@media (max-width: 900px) {
  .life-canvas {
    opacity: 0.34;
  }
}

@media (prefers-reduced-motion: reduce) {
  .life-canvas {
    opacity: 0.24;
  }
}
</style>
