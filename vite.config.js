import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning threshold — the lesson data is intentionally large.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Split third-party libs and the big lesson-data files into their own
        // cacheable chunks so app-code changes don't invalidate them and the
        // browser can download them in parallel.
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          // Lesson data follows its dynamic import boundaries so each Oxford
          // book and lazy course can be fetched independently.
        },
      },
    },
  },
})
