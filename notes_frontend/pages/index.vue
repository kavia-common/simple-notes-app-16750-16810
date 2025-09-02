<template>
  <div class="page">
    <div class="card" style="padding: 18px;">
      <div class="page-header">
        <h1 class="page-title">Welcome to Simple Notes</h1>
        <div class="row">
          <NuxtLink to="/notes/new" class="btn btn-accent">Create Note</NuxtLink>
        </div>
      </div>
      <p style="color: var(--color-muted); margin: 0;">
        Select a note from the sidebar or create a new one to get started.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing content only
</script>
