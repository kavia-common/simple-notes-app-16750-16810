/**
 * Nuxt configuration for Simple Notes App (frontend).
 * Sets light theme meta, dev server options, and placeholders for future backend integration.
 */
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Simple Notes',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1976D2' },
        { name: 'description', content: 'A simple, modern notes app built with Nuxt.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2280%22%3E✎%3C/text%3E%3C/svg%3E' }
      ],
    },
  },

  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },

  runtimeConfig: {
    // Public config is exposed to the client. Do NOT put secrets here.
    public: {
      // For future backend integration; set in environment by orchestrator
      NOTES_API_BASE_URL: '', // e.g., https://api.example.com
    },
  },

  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
})
