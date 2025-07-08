<template>
  <div class="flex items-center gap-4">
    <label for="pageHeight">Enter Page Height (px):</label>
    <input
      id="pageHeight"
      type="number"
      :value="pageHeight"
      @input="onInput"
      class="border px-2 py-1 w-24"
      min="250"
      max="800"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  pageHeight: Number
})

const emit = defineEmits(['update:pageHeight'])

function onInput(event) {
  const value = parseInt(event.target.value, 10)
  emit('update:pageHeight', value)
}
</script>
