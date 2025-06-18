const { defineConfig } = require("cypress")

const cypressSplit = require("cypress-split")// Importando o cypress split em uma variável

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    }
  },
})

