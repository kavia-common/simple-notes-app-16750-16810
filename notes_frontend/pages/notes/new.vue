<template>
  <div class="page">
    <NoteEditor />
  </div>
</template>

<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue'
import { useNotes } from '@/composables/useNotes'

const notes = useNotes()
if (!notes.initialized.value) {
  notes.init()
}
</script>
