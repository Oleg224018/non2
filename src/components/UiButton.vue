<template>
  <button class="ui-button" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    type: 'button',
  }
)
</script>

<style scoped>
.ui-button {
  width: 100%;
  padding: 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 16px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.ui-button:hover {
  background: #34495e;
  transform: translateY(-1px);
}
</style>