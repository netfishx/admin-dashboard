import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  retries: 0,

  reporter: "html",

  use: {
    baseURL: "http://16.163.41.52",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // webServer: {
  //   command: "bun start",
  //   url: "http://127.0.0.1:3000",
  // },
});
