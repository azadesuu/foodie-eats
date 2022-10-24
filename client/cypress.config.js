const { defineConfig } = require("cypress");
const mongo = require('cypress-mongodb');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
    },
    baseUrl: 'http://localhost:3000'
  },

  env: {
    "mongodb": {
      "uri": "mongodb+srv://allforone:2022sem2itp4llforone@all-for-one.p09tmlv.mongodb.net/?retryWrites=true&w=majority",
      "database": "cypress-test",
      "collection": "users"
    },
  },
});
