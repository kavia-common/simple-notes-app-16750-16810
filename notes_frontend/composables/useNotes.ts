import { ref, computed, watch } from 'vue'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

/**
 * PUBLIC_INTERFACE
 * useNotes
 * A composable that manages notes state with localStorage persistence.
 * Simulates async API calls to prepare for future backend integration.
 */
export function useNotes() {
  /** Internal state */
  const notes = ref<Note[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const initialized = ref<boolean>(false)
  const search = ref<string>('')

  // Load from localStorage on first use
  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem('notes_data_v1')
      if (raw) {
        const parsed = JSON.parse(raw) as Note[]
        // Ensure sorted by updatedAt desc
        notes.value = parsed.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load notes:', e)
    }
  }

  // Persist to localStorage whenever notes changes
  watch(notes, (val) => {
    try {
      localStorage.setItem('notes_data_v1', JSON.stringify(val))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to persist notes:', e)
    }
  }, { deep: true })

  /** Derived list filtered by search */
  const filteredNotes = computed(() => {
    if (!search.value.trim()) return notes.value
    const q = search.value.toLowerCase()
    return notes.value.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    )
  })

  /**
   * PUBLIC_INTERFACE
   * init
   * Initializes notes collection (from storage or stubbed fetch).
   * Returns a promise to mimic async backend fetch.
   */
  async function init(): Promise<void> {
    if (initialized.value) return
    loading.value = true
    try {
      // Stubbed backend call (replace with real fetch from notes_database)
      await new Promise((res) => setTimeout(res, 150))
      loadFromStorage()
      initialized.value = true
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to initialize'
    } finally {
      loading.value = false
    }
  }

  /**
   * PUBLIC_INTERFACE
   * createNote
   * Creates a new note.
   */
  async function createNote(input: { title: string; content: string }): Promise<Note> {
    loading.value = true
    try {
      // Stubbed network latency
      await new Promise((res) => setTimeout(res, 120))
      const now = new Date().toISOString()
      const newNote: Note = {
        id: cryptoRandomId(),
        title: input.title || 'Untitled',
        content: input.content || '',
        createdAt: now,
        updatedAt: now,
      }
      notes.value = [newNote, ...notes.value]
      return newNote
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to create note'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * PUBLIC_INTERFACE
   * updateNote
   * Updates an existing note by id.
   */
  async function updateNote(id: string, patch: { title?: string; content?: string }): Promise<Note | null> {
    loading.value = true
    try {
      await new Promise((res) => setTimeout(res, 120))
      const idx = notes.value.findIndex(n => n.id === id)
      if (idx === -1) return null
      const now = new Date().toISOString()
      const updated: Note = {
        ...notes.value[idx],
        ...patch,
        updatedAt: now,
      }
      notes.value.splice(idx, 1, updated)
      // Re-sort to keep most recent first
      notes.value = [...notes.value].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
      return updated
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to update note'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * PUBLIC_INTERFACE
   * deleteNote
   * Deletes a note by id.
   */
  async function deleteNote(id: string): Promise<boolean> {
    loading.value = true
    try {
      await new Promise((res) => setTimeout(res, 120))
      const before = notes.value.length
      notes.value = notes.value.filter(n => n.id !== id)
      return notes.value.length !== before
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to delete note'
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * PUBLIC_INTERFACE
   * getNoteById
   * Retrieves note by id.
   */
  function getNoteById(id: string): Note | undefined {
    return notes.value.find(n => n.id === id)
  }

  return {
    // state
    notes,
    filteredNotes,
    search,
    loading,
    error,
    initialized,
    // actions
    init,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
  }
}

/** Utility: crypto-safe-ish random id */
function cryptoRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-expect-error browser crypto
    return crypto.randomUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
