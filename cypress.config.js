const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: 'test@test.cl',
    api: 'http://localhost:9000/.netlify/functions/server',
    api2: 'http://localhost:8080',
  },
});
