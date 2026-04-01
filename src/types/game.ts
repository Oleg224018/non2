export type CellValue = -1 | 0 | 1

export type LevelData = {
  left: number[][]
  top: number[][]
  answer: number[][]
}

export type LevelsMap = Record<number, LevelData>

export type LevelCardItem = {
  id: number
  image: string
}