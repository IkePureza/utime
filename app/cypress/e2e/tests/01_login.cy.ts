describe("User Registration and Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows Login Page Correctly", () => {
    cy.location("href").should("include", "/login");
    cy.contains("h1", "Login");
  });

  it("Sign up", () => {
    cy.location("href").should("include", "/login");
    cy.contains("Sign up?").click();
    cy.location("href").should("include", "/signUp");
    cy.get("input[id=displayName-signup]").type("Test User");
    cy.get("input[id=email-signup]").type("cypresstest@mail.com");
    cy.get("input[id=password-signup]").type("123456");
    cy.get("button[type=submit]").click();
    cy.hash().should("eq", "");
    cy.logout();
  });

  it("Can login", () => {
    cy.location("href").should("include", "/login");
    cy.get("input[id=email-login]").type("cypresstest@mail.com");
    cy.get("input[id=password-login]").type("123456");
    cy.get("button[type=submit]").click();
    cy.hash().should("eq", "");
    cy.logout();
  });
});
