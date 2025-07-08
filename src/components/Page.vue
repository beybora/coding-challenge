<template>
  <div
    class="bg-white border shadow rounded-lg mx-auto w-full max-w-2xl relative"
    :style="{ height: height + 'px', padding: '80px 64px' }"
  >
    <div class="h-full whitespace-pre-wrap text-base leading-relaxed overflow-hidden">
      {{ content }}
    </div>
    <div class="absolute bottom-4 right-6 text-xs text-gray-400 select-none">
      Page {{ pageIndex + 1 }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: String,
  height: Number,
  pageIndex: Number
})
</script>
