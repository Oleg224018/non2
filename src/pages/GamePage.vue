<template>
  <div>
    <div v-if="!gameStarted" class="game">
      <GameCard
        v-for="level in levelCards"
        :key="level.id"
        :level="level.id"
        :image="level.image"
        @play="startLevel(level.id)"
      />
    </div>

    <div v-else class="play">
      <div class="header">
        <UiButton @click="backToMenu">← Назад</UiButton>
        <span>Уровень {{ currentLevel }} ({{ size }}x{{ size }})</span>
        <UiButton @click="resetGame">Сброс</UiButton>
      </div>

      <GameBoard
        :left-hints="leftHints"
        :top-hints="topHints"
        :grid="grid"
        @toggle="toggle"
        @mark="mark"
      />

      <div class="actions">
        <UiButton @click="checkWin">Проверить</UiButton>
      </div>

      <div class="info">
        Левый клик — закрасить | Правый клик — крестик
      </div>
    </div>

    <div v-if="win" class="win">
      <div class="winbox">
        <h2>ПОБЕДА!</h2>

        <UiButton v-if="currentLevel < 8" 
        @click="nextLevel">Следующий</UiButton>

        <UiButton @click="backToMenu">В меню</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '../components/GameBoard.vue'
import GameCard from '../components/GameCard.vue'
import UiButton from '../components/UiButton.vue'
import { levelCards } from '../data/levels'
import { useGame } from '../composables/useGame'

const {
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
} = useGame()
</script>

<style scoped>
.game {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 260px));
  justify-content: center;
  gap: 30px;
  padding: 40px;
  background: #f0f0f0;
  min-height: 100vh;
}

.play {
  background: #e0e0e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.header {
  background: white;
  padding: 12px 20px; 
  border-radius: 8px;
  display: grid;
  grid-template-columns: 180px auto 180px;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.header span {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

.actions {
  margin-top: 24px;
  width: 220px;
}

.info {
  margin-top: 15px;
  font-size: 14px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
}

.win {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.winbox {
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  width: 280px;
}

.winbox h2 {
  margin: 0 0 20px;
}

.winbox :deep(.ui-button) + :deep(.ui-button) {
  margin-top: 12px;
}
</style>