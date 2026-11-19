import { defineConfig } from "cypress";
import { installPlugin } from "@chromatic-com/cypress";

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  viewportWidth: 600,
  viewportHeight: 400,
  expose: {
    // Archive resources of chromatic.com in addition to the local dev server.
    // The resource archiver is created once per run, so these must be set globally.
    assetDomains: [
      "http://localhost:5173",
      "https://www.chromatic.com",
      "https://www2.chromatic.com",
    ],
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      installPlugin(on, config);
    },
  },
});
