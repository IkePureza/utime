describe("Login", () => {
  it("Sign up", () => {
    cy.visit("/");
    cy.location("href").should("include", "/login");

    cy.contains("Sign up?").click();
    cy.get("input[id=email]").click().type("cypresstest@mail.com");
    cy.get("input[id=password]").type("123456");
    cy.get("button[type=submit]").click();
    cy.location("href").should("include", "/");
  });
});
