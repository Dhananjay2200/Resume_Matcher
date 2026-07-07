import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: standard React setup, dev server on port 5173.
// The backend (FastAPI) is expected to run separately on port 8000 —
// see src/api/client.js for how the frontend talks to it.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
