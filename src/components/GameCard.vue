<template>
  <div class="card" @click="$emit('play')">
    <h2>УРОВЕНЬ {{ level }}</h2>
    <img :src="image" class="image" :alt="`Уровень ${level}`" />
    <UiButton>ИГРАТЬ</UiButton>
  </div>
</template>

<script setup lang="ts">
import UiButton from './UiButton.vue'

defineProps<{
  level: number
  image: string
}>()

defineEmits<{
  play: []
}>()
</script>

<style scoped>
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
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  margin: 0 0 15px;
  font-size: 22px;
}

.image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  margin: 10px 0 16px;
  border-radius: 8px;
}
</style>