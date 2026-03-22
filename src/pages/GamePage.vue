<template>
  <div>
    <div v-if="!gameStarted" class="game">
      <div class="card" @click="startLevel(1)">
        <h2>УРОВЕНЬ 1</h2>
        <img src="/level1.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(2)">
        <h2>УРОВЕНЬ 2</h2>
        <img src="/level2.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(3)">
        <h2>УРОВЕНЬ 3</h2>
        <img src="/level3.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(4)">
        <h2>УРОВЕНЬ 4</h2>
        <img src="/level4.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(5)">
        <h2>УРОВЕНЬ 5</h2>
        <img src="/level5.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(6)">
        <h2>УРОВЕНЬ 6</h2>
        <img src="/level6.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(7)">
        <h2>УРОВЕНЬ 7</h2>
        <img src="/level7.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
      <div class="card" @click="startLevel(8)">
        <h2>УРОВЕНЬ 8</h2>
        <img src="/level8.jpg" class="image" />
        <button class="btn">ИГРАТЬ</button>
      </div>
    </div>

    <div v-else class="play">
      <div class="header">
        <button @click="backToMenu">← Назад</button>
        <span>Уровень {{ currentLevel }} ({{ size }}x{{ size }})</span>
        <button @click="resetGame">Сброс</button>
      </div>

      <div class="field">
        <div class="top">
          <div class="corner"></div>
          <div class="top-nums">
            <div v-for="c in size" :key="c" class="top-num">
              <div v-for="n in topHints[c-1]" :key="n">{{ n }}</div>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="left-nums">
            <div v-for="r in size" :key="r" class="left-num">
              <div v-for="n in leftHints[r-1]" :key="n">{{ n }}</div>
            </div>
          </div>
          <div class="grid">
            <div v-for="r in size" :key="r" class="row">
              <div v-for="c in size" :key="c" class="cell" :class="{ fill: grid[r-1][c-1] === 1, cross: grid[r-1][c-1] === -1 }" @click="toggle(r-1,c-1)" @contextmenu.prevent="mark(r-1,c-1)">
                <span v-if="grid[r-1][c-1] === -1">✕</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="check" @click="checkWin">Проверить</button>
      <div class="info">Левый клик - закрасить | Правый клик - крестик</div>
    </div>

    <div v-if="win" class="win">
      <div class="winbox">
        <h2>ПОБЕДА!</h2>
        <button v-if="currentLevel<8" @click="nextLevel">Следующий</button>
        <button @click="backToMenu">В меню</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const gameStarted = ref(false)
const currentLevel = ref(1)
const win = ref(false)
const grid = ref([])

const size = computed(() => currentLevel.value + 3)

const levels = {
  1: { left:[[1],[1],[1],[1]], top:[[1],[1],[1],[1]], answer:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]] },
  2: { left:[[2],[2],[5],[2],[2]], top:[[2],[2],[5],[2],[2]], answer:[[1,1,0,1,1],[1,1,0,1,1],[1,1,1,1,1],[1,1,0,1,1],[1,1,0,1,1]] },
  3: { left:[[1],[2],[3],[3],[2],[1]], top:[[1],[2],[3],[3],[2],[1]], answer:[[1,0,0,0,0,0],[0,1,1,0,0,0],[0,0,1,1,1,0],[0,1,1,1,0,0],[0,0,1,1,0,0],[0,0,0,1,0,0]] },
  4: { left:[[2],[1,1],[4],[2,2],[4],[1,1],[2]], top:[[2],[1,1],[4],[2,2],[4],[1,1],[2]], answer:[[0,1,1,0,0,0,0],[1,0,0,1,0,0,0],[1,1,1,1,0,0,0],[0,1,1,0,1,1,0],[0,0,0,1,1,1,1],[0,0,1,0,0,1,0],[0,0,1,1,0,0,0]] },
  5: { left:[[2,2],[1,1,1],[4,2],[2,4],[1,1,1],[3,3],[2,2],[1,1]], top:[[2,2],[1,1,1],[4,2],[2,4],[1,1,1],[3,3],[2,2],[1,1]], answer:[[0,1,1,0,0,1,1,0],[1,0,1,0,1,0,1,0],[1,1,1,1,0,1,1,0],[0,1,1,0,1,1,1,1],[0,1,1,0,1,0,1,0],[0,0,1,1,1,0,1,1],[0,1,1,0,0,1,1,0],[1,0,0,1,0,0,1,0]] },
  6: { left:[[3],[2,2],[1,1,1],[4],[5],[4],[1,1,1],[2,2],[3]], top:[[3],[2,2],[1,1,1],[4],[5],[4],[1,1,1],[2,2],[3]], answer:Array(9).fill().map(()=>Array(9).fill(0)) },
  7: { left:[[2,2],[3,3],[4],[2,2,2],[5],[2,2,2],[4],[3,3],[2,2]], top:[[2,2],[3,3],[4],[2,2,2],[5],[2,2,2],[4],[3,3],[2,2]], answer:Array(10).fill().map(()=>Array(10).fill(0)) },
  8: { left:[[3,3],[2,2,2],[4,4],[1,1,1,1],[5,5],[5,5],[1,1,1,1],[4,4],[2,2,2],[3,3]], top:[[3,3],[2,2,2],[4,4],[1,1,1,1],[5,5],[5,5],[1,1,1,1],[4,4],[2,2,2],[3,3]], answer:Array(11).fill().map(()=>Array(11).fill(0)) }
}

const leftHints = computed(() => levels[currentLevel.value].left)
const topHints = computed(() => levels[currentLevel.value].top)
const answer = computed(() => levels[currentLevel.value].answer)

const createGrid = () => {
  const g = []
  for(let i=0; i<size.value; i++) {
    g[i] = []
    for(let j=0; j<size.value; j++) g[i][j] = 0
  }
  return g
}

const startLevel = (level) => {
  currentLevel.value = level
  gameStarted.value = true
  win.value = false
  grid.value = createGrid()
}

const backToMenu = () => {
  gameStarted.value = false
  win.value = false
}

const toggle = (r,c) => {
  if(grid.value[r][c] === 0) grid.value[r][c] = 1
  else if(grid.value[r][c] === 1) grid.value[r][c] = 0
  else if(grid.value[r][c] === -1) grid.value[r][c] = 1
}

const mark = (r,c) => {
  if(grid.value[r][c] === 0) grid.value[r][c] = -1
  else if(grid.value[r][c] === -1) grid.value[r][c] = 0
}

const resetGame = () => { grid.value = createGrid() }

const checkWin = () => {
  for(let i=0; i<size.value; i++) {
    for(let j=0; j<size.value; j++) {
      if((grid.value[i][j] === 1 ? 1 : 0) !== answer.value[i][j]) {
        alert('Неправильно!')
        return
      }
    }
  }
  win.value = true
}

const nextLevel = () => {
  if(currentLevel.value < 8) {
    currentLevel.value++
    grid.value = createGrid()
    win.value = false
  }
}
</script>

<style scoped>
.game {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 40px;
  background: #f0f0f0;
  min-height: 100vh;
}
.card {
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card:hover { transform: translateY(-5px); }
.card h2 { margin: 0 0 15px 0; font-size: 22px; }

.image { 
  width: 100%; 
  height: 250px;
  object-fit: cover; 
  margin: 10px 0; 
  border-radius: 8px; 
}

.btn { 
  width: 100%; 
  padding: 12px; 
  background: #2c3e50; 
  color: white; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  font-size: 16px;
  margin-top: auto;
}
.btn:hover { background: #34495e; }

.play {
  background: #e0e0e0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; 
}
.header {
  background: white;
  padding: 12px 25px;
  border-radius: 8px;
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.header button {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #e0e0e0;
  font-weight: bold;
}
.header span { font-weight: bold; font-size: 18px; display: flex; align-items: center; }


.field {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.top { display: flex; }
.corner { width: 60px; height: 60px; }
.top-nums { display: flex; }

.top-num {
  width: 60px; 
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 2px 0;
}
.top-num div { font-size: 14px; font-weight: bold; margin: 1px 0; }

.main { display: flex; }
.left-nums { display: flex; flex-direction: column; }

.left-num {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 0;
}
.left-num div { font-size: 14px; font-weight: bold; margin: 0 2px; }

.grid { display: flex; flex-direction: column; }
.row { display: flex; }

.cell {
  width: 60px;
  height: 60px;
  border: 1px solid #aaa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 24px; 
}
.cell:hover { background: #f0f0f0; }
.cell.fill { background: #2c3e50; } 
.cell.cross { background: #ffe0e0; }
.cell.cross span { color: #e74c3c; font-size: 30px; font-weight: bold; }

.check {
  margin-top: 30px;
  padding: 12px 40px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
}
.winbox button {
  margin: 10px;
  padding: 10px 25px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
</style>