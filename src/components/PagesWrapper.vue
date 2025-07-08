<template>
  <div class="flex flex-col gap-6 mt-6">
    <Page
      v-for="(chunk, index) in chunks"
      :key="index"
      :content="chunk"
      :height="pageHeight"
      :pageIndex="index"
    />
  </div>
</template>

<script setup lang="ts">
import Page from './Page.vue'

defineProps<{
  chunks: string[]
  pageHeight: number
}>()
</script>
