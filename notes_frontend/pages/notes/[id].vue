<template>
  <div class="page">
    <div v-if="!note" class="card" style="padding: 18px;">
      <div class="page-header">
        <h1 class="page-title" style="margin: 0;">Note not found</h1>
        <NuxtLink to="/notes/new" class="btn btn-accent">Create New</NuxtLink>
      </div>
      <p style="color: var(--color-muted); margin: 0;">The note you're looking for doesn't exist.</p>
    </div>

    <template v-else>
      <div class="card" style="padding: 18px; margin-bottom: 12px;">
        <div class="page-header">
          <h1 class="page-title" style="margin: 0;">{{ note.title || 'Untitled' }}</h1>
          <div class="row">
            <button class="btn btn-primary" @click="editing = !editing">{{ editing ? 'Stop Editing' : 'Edit' }}</button>
            <NuxtLink to="/notes/new" class="btn btn-accent">New</NuxtLink>
            <button class="btn btn-secondary" @click="remove">Delete</button>
          </div>
        </div>
        <div class="note-meta">Last updated: {{ formatDate(note.updatedAt) }}</div>
      </div>

      <div v-if="editing">
        <NoteEditor :note-id="note.id" />
      </div>
      <div v-else class="card" style="padding: 18px;">
        <div v-if="note.content">
          <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">{{ note.content }}</pre>
        </div>
        <div v-else>
          <p style="color: var(--color-muted); margin: 0;">No content.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NoteEditor from '@/components/NoteEditor.vue'
import { useNotes, type Note } from '@/composables/useNotes'

const route = useRoute()
const router = useRouter()
const notes = useNotes()

const id = computed(() => String(route.params.id || ''))
const editing = ref<boolean>(false)
const note = ref<Note | undefined>(undefined)

function load() {
  note.value = notes.getNoteById(id.value)
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

// PUBLIC_INTERFACE
async function remove() {
  if (!note.value) return
  const ok = window.confirm('Delete this note? This cannot be undone.')
  if (!ok) return
  const deleted = await notes.deleteNote(note.value.id)
  if (deleted) router.push('/')
}

onMounted(async () => {
  if (!notes.initialized.value) {
    await notes.init()
  }
  load()
})

watch(() => notes.notes.value, load, { deep: true })
watch(id, load)
</script>
