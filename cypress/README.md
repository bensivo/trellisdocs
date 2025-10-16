# Cypress
Cypress is a next generation front end testing tool built for the modern web.

Provides solutions for: 
- E2E testing
- Component testing
- Accessability testing
- UI coverage

# Running the Test Suite
This launches the Cypress App so you can choose end-to-end (E2E) or component testing (CT) and start writing tests. I installed it at the root of our project because it has both UI and API testing capabilities. 

In one terminal run this in the root of the project:
```bash
npx cypress open
```

In another terminal run this in webapp folder:
```bash
npm run dev
```

# Config Files
The config file for E2E testing:
cypress.config.js 

The support file that is bundled and loaded before each E2E spec:
cypress/support/e2e.js

The support file that is useful for creating custom commands and overriding existing ones:
cypress/support/command.js

An example fixtures file/folder:
cypress/fixtures/example.json