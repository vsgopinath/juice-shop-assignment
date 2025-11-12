import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/*.cy.ts',
    viewportWidth: 1514,
    viewportHeight: 1080,
    experimentalStudio: true,
    experimentalPromptCommand: true,
    setupNodeEvents (on, config) {
    }
  }
})
