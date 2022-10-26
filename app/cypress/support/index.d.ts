/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    createHousehold(): Chainable<Element>;
    loadWait(): Chainable<Element>;
  }
}
