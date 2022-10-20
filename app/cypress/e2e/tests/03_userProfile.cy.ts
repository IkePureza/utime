describe("User Profile", () => {
  before(() => {
    cy.login();
    cy.wait(3000);
    cy.visit("/profile");
    cy.reload();
  });

  after(() => {
    cy.logout();
  });

  it("Displays user info correctly", () => {
    cy.wait(2000);
    cy.get("#profileUsername").contains("Test User");
    cy.get("#profileEmail").contains("cypresstest@mail.com");
    cy.get("#profileAuth").contains("Email");
  });
});
