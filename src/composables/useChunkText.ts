import { ref } from 'vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export function useChunkText() {
  const chunks = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function chunkText(text: string, pageHeight: number) {
    loading.value = true
    error.value = null
    try {
      const res = await axios.post(`${API_URL}/api/chunk`, {
        text,
        pageHeight
      })
      chunks.value = res.data.chunks
    } catch (err: any) {
      error.value = err.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { chunks, loading, error, chunkText }
}
