const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: 'angelica.ogaz@gmail.com',
    api1: 'http://localhost:9000/.netlify/functions/server',
    api2: 'http://localhost:8080',
    api: 'https://pse9lbwkvk.execute-api.us-west-2.amazonaws.com/prod',
    test_ic_id: 16,
    test_disc_id: 15,
    test_ceal_id: 13,
  },
    // test: {
    //   ic: {
    //     id: 3
    //   }
    // }
});
