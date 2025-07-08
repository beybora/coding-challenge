<template>
  <header
    class="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4
           border-b border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm">

    <!-- Dummy Buttons -->
    <div class="flex items-center gap-2">
      <button class="px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md">B</button>
      <button class="px-2 py-1 text-sm italic text-gray-700 hover:bg-gray-100 rounded-md">I</button>
      <button class="px-2 py-1 text-sm underline text-gray-700 hover:bg-gray-100 rounded-md">U</button>

      <span class="mx-2 h-5 w-px bg-gray-300"></span>

      <button class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Table</button>
      <button class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md">• List</button>
      <button class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md">1. List</button>
      <button class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md">🖼 Image</button>
    </div>

    <!-- Page Height Input -->
    <div class="flex items-center gap-2 text-sm">
      <label class="font-medium text-gray-600 whitespace-nowrap">Page&nbsp;Height</label>

      <input
        type="number"
        min="100"
        :value="pageHeight"
        @change="$emit('update:pageHeight', $event.target.valueAsNumber)"
        class="w-20 px-2 py-1 border border-gray-300 rounded-md bg-gray-50
               text-right shadow-inner focus:outline-none focus:ring-2
               focus:ring-indigo-300 focus:border-indigo-400"
      />
      <span class="text-xs text-gray-500">px</span>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ pageHeight: number }>()
defineEmits(['update:pageHeight'])
</script>
