import { computed, ref } from 'vue'
import { levels } from '../data/levels'
import type { CellValue } from '../types/game'

export function useGame() { //упр лог
  const gameStarted = ref(false)
  const currentLevel = ref(1)
  const win = ref(false)
  const grid = ref<CellValue[][]>([])

  const currentLevelData = computed(() => levels[currentLevel.value]!) //данные текущего уровня из levels
  const size = computed(() => currentLevel.value + 3)
  const leftHints = computed(() => currentLevelData.value.left)
  const topHints = computed(() => currentLevelData.value.top)
  const answer = computed(() => currentLevelData.value.answer)

  const createGrid = (): CellValue[][] => {
    return Array.from({ length: size.value }, () => //созд массив строк
      Array.from({ length: size.value }, () => 0 as CellValue)
    )
  }

  const startLevel = (level: number) => { 
    currentLevel.value = level
    gameStarted.value = true
    win.value = false
    grid.value = createGrid()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToMenu = () => {
    gameStarted.value = false
    win.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggle = (r: number, c: number) => {
    const row = grid.value[r] // берет строку
    if (!row) return

    if (row[c] === 0) row[c] = 1
    else if (row[c] === 1) row[c] = 0
    else if (row[c] === -1) row[c] = 1
  }

  const mark = (r: number, c: number) => {
    const row = grid.value[r]
    if (!row) return

    if (row[c] === 0) row[c] = -1
    else if (row[c] === -1) row[c] = 0
  }

  const resetGame = () => {
    grid.value = createGrid()
  }

  const checkWin = () => {
    for (let i = 0; i < size.value; i++) { //идет по строкам 
      const gridRow = grid.value[i] //тек
      const answerRow = answer.value[i]

      if (!gridRow || !answerRow) return

      for (let j = 0; j < size.value; j++) {
        if ((gridRow[j] === 1 ? 1 : 0) !== answerRow[j]) {
          alert('Неправильно!')
          return
        }
      }
    }

    win.value = true
  }

  const nextLevel = () => {
    if (currentLevel.value < 8) {
      currentLevel.value++
      grid.value = createGrid()
      win.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    gameStarted,
    currentLevel,
    win,
    grid,
    size,
    leftHints,
    topHints,
    startLevel,
    backToMenu,
    toggle,
    mark,
    resetGame,
    checkWin,
    nextLevel,
  }
}