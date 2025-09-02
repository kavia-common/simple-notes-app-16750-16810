<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <header class="app-header">
      <div class="brand" @click="$router.push('/')">
        <span class="brand-accent">✎</span>
        <span class="brand-name">Simple Notes</span>
      </div>
      <div class="header-actions">
        <button class="btn btn-accent" @click="$router.push('/notes/new')">New Note</button>
      </div>
    </header>
    <div class="app-container">
      <aside class="app-sidebar">
        <NotesList />
      </aside>
      <main class="app-main">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// No-op: global layout lives here; pages render inside <NuxtPage />
</script>

<style>
:root {
  --color-primary: #1976D2;
  --color-secondary: #424242;
  --color-accent: #FFC107;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-muted: #6b7280;
  --radius: 10px;
  --shadow: 0 2px 10px rgba(0,0,0,0.06);
}

* { box-sizing: border-box; }

html, body, #__nuxt, .app-root {
  height: 100%;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  background: var(--color-bg);
  color: #111827;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-surface);
  border-bottom: 1px solid #e5e7eb;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--color-primary);
  cursor: pointer;
}

.brand-accent {
  color: var(--color-accent);
  font-size: 20px;
}

.brand-name {
  letter-spacing: 0.2px;
}

.header-actions {
  margin-left: auto;
}

.btn {
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .06s ease, box-shadow .2s ease, opacity .2s ease, background .2s ease;
  box-shadow: var(--shadow);
}

.btn:active { transform: translateY(1px); }

.btn-primary { background: var(--color-primary); color: white; }
.btn-secondary { background: var(--color-secondary); color: white; }
.btn-accent { background: var(--color-accent); color: #1f2937; }

.btn-ghost {
  background: transparent;
  color: var(--color-secondary);
  box-shadow: none;
}

.btn-ghost:hover { background: #f3f4f6; }

.app-container {
  height: calc(100% - 60px);
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 0;
}

.app-sidebar {
  border-right: 1px solid #e5e7eb;
  background: var(--color-surface);
  overflow: auto;
}

.app-main {
  padding: 20px;
  overflow: auto;
}

.card {
  background: var(--color-surface);
  border: 1px solid #e5e7eb;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Utilities */
.input, .textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  outline: none;
  background: white;
}

.input:focus, .textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
}

.textarea {
  min-height: 200px;
  resize: vertical;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* NotesList styles */
.notes-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notes-list .search {
  position: sticky;
  top: 0;
  background: var(--color-surface);
  padding-bottom: 8px;
  margin-bottom: 6px;
  z-index: 5;
}

.note-item {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background .15s ease, border-color .2s ease;
  border: 1px solid transparent;
}

.note-item:hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.note-item.active {
  background: rgba(25, 118, 210, 0.08);
  border-color: rgba(25, 118, 210, 0.25);
}

.note-title {
  font-weight: 600;
}

.note-meta {
  color: var(--color-muted);
  font-size: 12px;
}

/* Page content */
.page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-secondary);
}

/* Responsive */
@media (max-width: 960px) {
  .app-container {
    grid-template-columns: 1fr;
  }
  .app-sidebar {
    order: 2;
    height: 45%;
  }
  .app-main {
    order: 1;
    height: 55%;
  }
}
</style>
