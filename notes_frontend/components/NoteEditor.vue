<template>
  <form class="card" style="padding: 16px; display: grid; gap: 12px;" @submit.prevent="onSubmit">
    <div class="row" style="justify-content: space-between;">
      <h2 class="page-title" style="margin: 0;">{{ modeTitle }}</h2>
      <div class="row">
        <button class="btn btn-primary" type="submit" :disabled="disabled">{{ primaryCta }}</button>
        <button class="btn btn-ghost" type="button" @click="onCancel">Cancel</button>
        <button
          v-if="noteId"
          class="btn btn-secondary"
          type="button"
          :disabled="disabled"
          @click="onDelete"
          title="Delete note"
        >
          Delete
        </button>
      </div>
    </div>

    <label>
      <div style="font-weight: 600; margin-bottom: 6px;">Title</div>
      <input
        class="input"
        type="text"
        v-model="title"
        placeholder="Note title"
        required
        maxlength="120"
      />
    </label>

    <label>
      <div style="font-weight: 600; margin-bottom: 6px;">Content</div>
      <textarea
        class="textarea"
        v-model="content"
        placeholder="Write your note..."
      />
    </label>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useNotes, type Note } from '@/composables/useNotes'

const props = defineProps<{
  /** When provided, editor loads and updates this note. Otherwise creates new. */
  noteId?: string
}>()

const notes = useNotes()
const router = useRouter()

const title = ref<string>('')
const content = ref<string>('')

const modeTitle = computed(() => (props.noteId ? 'Edit Note' : 'Create Note'))
const primaryCta = computed(() => (props.noteId ? 'Save' : 'Create'))
const disabled = computed(() => notes.loading.value)

watchEffect(() => {
  if (props.noteId) {
    const n = notes.getNoteById(props.noteId)
    if (n) {
      title.value = n.title
      content.value = n.content
    }
  } else {
    title.value = ''
    content.value = ''
  }
})

// PUBLIC_INTERFACE
async function onSubmit() {
  if (props.noteId) {
    const updated = await notes.updateNote(props.noteId, { title: title.value, content: content.value })
    if (updated) {
      router.push(`/notes/${updated.id}`)
    }
  } else {
    const created: Note = await notes.createNote({ title: title.value, content: content.value })
    router.push(`/notes/${created.id}`)
  }
}

// PUBLIC_INTERFACE
function onCancel() {
  if (props.noteId) {
    router.push(`/notes/${props.noteId}`)
  } else {
    router.push('/')
  }
}

// PUBLIC_INTERFACE
async function onDelete() {
  if (!props.noteId) return
  const confirmed = window.confirm('Delete this note? This cannot be undone.')
  if (!confirmed) return
  const ok = await notes.deleteNote(props.noteId)
  if (ok) router.push('/')
}
</script>
