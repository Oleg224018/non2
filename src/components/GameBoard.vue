<template>
  <div class="board">
    <div class="top">
      <div class="empty"></div>
      <div v-for="(col, x) in topHints" :key="x" class="hint top-hint">
        <div v-for="(n, i) in col" :key="i">{{ n }}</div>
      </div>
    </div>

    <div v-for="(row, y) in grid" :key="y" class="line">
      <div class="hint left-hint">
        <span v-for="(n, i) in leftHints[y]" :key="i">{{ n }}</span>
      </div>

      <div
        v-for="(cell, x) in row"
        :key="x"
        class="cell"
        :class="{ fill: cell === 1, cross: cell === -1 }"
        @click="emit('toggle', y, x)"
        @contextmenu.prevent="emit('mark', y, x)"
      >
        <span v-if="cell === -1">✕</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CellValue } from '../types/game'

const props = defineProps<{
  leftHints: number[][]
  topHints: number[][]
  grid: CellValue[][]
}>()

const emit = defineEmits<{
  (e: 'toggle', row: number, col: number): void
  (e: 'mark', row: number, col: number): void
}>()
</script>

<style scoped>
.board {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.top,
.line {
  display: flex;
}

.empty,
.hint,
.cell {
  width: 60px;
  height: 60px;
  box-sizing: border-box;
}

.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.top-hint {
  flex-direction: column;
}

.left-hint {
  gap: 4px;
}

.cell {
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  font-size: 28px;
}

.cell:hover {
  background: #f3f3f3;
}

.fill {
  background: #2c3e50;
}

.cross {
  background: #ffe0e0;
  color: #e74c3c;
}
</style>