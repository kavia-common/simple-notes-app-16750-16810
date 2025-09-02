# Simple Notes Frontend (Nuxt 3)

A modern, light-themed notes UI with a responsive 2-panel layout (sidebar + main).  
Features:
- Create note
- Edit note
- Delete note
- View list of notes
- View single note details

Tech:
- Nuxt 3 + Vue 3 + TypeScript
- LocalStorage persistence (stubbed async calls) to prepare for a future backend

Theme Colors:
- Primary: #1976D2
- Secondary: #424242
- Accent: #FFC107

Development
- npm install
- npm run dev (served on http://localhost:3000)

Environment
- Copy .env.example to .env and fill in values when backend integration is available:
  - NUXT_PUBLIC_NOTES_API_BASE_URL

Notes on Integration
- The composable `useNotes` simulates async calls and persists to localStorage.
- Replace stubbed sections with real fetch calls to the notes backend when `notes_database` is available.
