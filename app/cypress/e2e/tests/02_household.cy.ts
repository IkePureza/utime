describe("User Invitations", () => {
  beforeEach(() => {
    cy.login();
  });
  afterEach(() => {
    cy.logout();
  });

  it("Create a new household", () => {
    cy.get("#createHousehold").click();
    cy.get("input[id=houseName]").click().type("testHouse");
    cy.get("textarea[id=houseDesc]").click().type("Test in progress");
    cy.get(".min-w-full > .btn").click();
    cy.wait(1000);
    cy.contains("testHouse");
    cy.contains("Test in progress");
  });

  it("User can send an invite to a user", () => {
    cy.get(".card-actions > .btn").click();
    cy.contains("Household testHouse");
    cy.get("#inviteEmail").type("cypresstest2@mail.com");
    cy.get("#submitInvite").click();
    cy.get("#inviteEmail").should("have.value", "Sent!");
  });

  it("User tries to send invite to themself", () => {
    cy.get(".card-actions > .btn").click();
    cy.contains("Household testHouse");
    cy.get("#inviteEmail").type("cypresstest@mail.com");
    cy.get("#submitInvite").click();
    cy.contains("You can't invite yourself LOL");
  });

  it("User tries to invite an already invited user", () => {
    cy.get(".card-actions > .btn").click();
    cy.contains("Household testHouse");
    cy.get("#inviteEmail").type("cypresstest2@mail.com");
    cy.get("#submitInvite").click();
    cy.contains("Invite already sent to this email address!");
  });
});
