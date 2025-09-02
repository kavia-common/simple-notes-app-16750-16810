<template>
  <div class="notes-list">
    <div class="search">
      <input
        class="input"
        type="text"
        v-model="notes.search"
        placeholder="Search notes..."
        aria-label="Search notes"
      />
    </div>

    <div class="row" style="margin-bottom: 8px;">
      <button class="btn btn-primary" @click="$router.push('/notes/new')">Create</button>
      <button class="btn btn-ghost" @click="refresh">Refresh</button>
    </div>

    <div v-if="notes.loading" class="note-meta">Loading...</div>
    <div v-else-if="!notes.filteredNotes.length" class="note-meta">No notes yet. Create your first note!</div>

    <div
      v-for="note in notes.filteredNotes"
      :key="note.id"
      :class="['note-item', { active: isActive(note.id) }]"
      @click="goToNote(note.id)"
    >
      <div class="note-title" :title="note.title">{{ truncate(note.title || 'Untitled', 40) }}</div>
      <div class="note-meta">
        {{ formatDate(note.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNotes } from '@/composables/useNotes'

const notes = useNotes()
const route = useRoute()
const router = useRouter()

if (!notes.initialized.value) {
  notes.init()
}

function isActive(id: string) {
  return route.name === 'notes-id' && route.params.id === id
}

function goToNote(id: string) {
  router.push(`/notes/${id}`)
}

// PUBLIC_INTERFACE
function refresh() {
  // For future backend: re-fetch
  notes.init()
}

function truncate(text: string, max = 60) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}
</script>
