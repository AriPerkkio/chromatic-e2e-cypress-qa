import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Don't reload the page when Cypress writes archives into cypress/downloads
    watch: { ignored: ["**/cypress/**"] },
  },
});
