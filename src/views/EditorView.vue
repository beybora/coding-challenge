<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12">
    <div class="w-full max-w-4xl p-10 flex flex-col gap-6">
    <Toolbar v-model:pageHeight="localPageHeight" />
    <textarea
      v-model="text"
      class="w-full h-48 border p-4 rounded bg-white"
      placeholder="Write your text here..."
    />

    <button v-if="text"
      @click="handleChunk"
      class="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      :disabled="loading"
    >
      {{ loading ? 'Chunking...' : 'Chunk' }}
    </button>

    <PagesWrapper :chunks="chunks" :pageHeight="effectivePageHeight" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toolbar from '../components/Toolbar.vue'
import PagesWrapper from '../components/PagesWrapper.vue'
import { useChunkText } from '../composables/useChunkText'

const text = ref('')
const localPageHeight = ref(600)
const effectivePageHeight = ref(600)

const { chunks, loading, error, chunkText } = useChunkText()

async function handleChunk() {
  effectivePageHeight.value = localPageHeight.value
  await chunkText(text.value, effectivePageHeight.value)
}
</script>
