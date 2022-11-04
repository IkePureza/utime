describe("User Household Tests", () => {
  before(() => {
    cy.login();
  });
  after(() => {
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

  describe("User Invitations", () => {
    before(() => {
      cy.visit("/");
      cy.get(".card-actions > .btn").click();
      cy.contains("Household testHouse");
    });

    it("User can send an invite to a user", () => {
      cy.get("#inviteEmail").type("cypresstest2@mail.com");
      cy.get("#submitInvite").click();
      cy.get("#inviteEmail").should("have.value", "Sent!");
    });

    it("User tries to send invite to themself", () => {
      cy.get("#inviteEmail").clear().type("cypresstest@mail.com");
      cy.get("#submitInvite").click();
      cy.contains("You can't invite yourself LOL");
    });

    it("User tries to invite an already invited user", () => {
      cy.get("#inviteEmail").clear().type("cypresstest2@mail.com");
      cy.get("#submitInvite").click();
      cy.contains("Invite already sent to this email address!");
    });
  });

  describe("Edit House", () => {
    before(() => {
      cy.visit("/");
      cy.wait(1000);
      cy.get(".loading").should("not.exist");
      cy.get(".card-actions > .btn").click();
      cy.contains("Household testHouse");
      cy.wait(1000);
      cy.get(".loading").should("not.exist");
    });

    it("can edit house name and description", () => {
      cy.get("#householdMenu").click();
      cy.get("#householdEditSettings").should("be.visible").click();
      cy.get("#newHouseName").type("New House Name");
      cy.get("#newHouseDesc").type("New House Desc");
      cy.get("#submitEditHouse").click();
      cy.wait(1000);
      cy.contains("Household New House Name");
    });

    it("can delete household", () => {
      cy.get("#householdMenu").click();
      cy.get("#householdDeleteSettings").should("be.visible").click();
      cy.get("#deleteHouseholdButton").click();
      cy.wait(1000);
      cy.get(".loading").should("not.exist");
      cy.get(".alert-success").should("exist");
    });
  });
});
