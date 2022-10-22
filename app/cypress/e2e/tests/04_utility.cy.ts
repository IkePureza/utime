describe("Household utilites", () => {
  before(() => {
    cy.login();
    cy.get(".card-actions > .btn").click();
    cy.contains("Household testHouse");
  });
  after(() => {
    cy.logout();
  });

  it("Can create a new toilet utility", () => {
    cy.get("#newUtilityButton").click();
    cy.get("#utilityName").type("Test Toilet");
    cy.get("#utilityDesc").type("Testing");
    cy.get("#createUtilityButton").click();
    cy.wait(1000);
    cy.contains("Test Toilet");
    cy.contains("Testing");
  });

  describe("Utility Bookings", () => {
    before(() => {
      cy.contains("Go to Utility").click();
      cy.get("#newBookingButton").click();
      cy.get("#bookingDesc").type("Toilet session");
    });

    after(() => {
      cy.get("#closeBookingModal").click();
    });

    const hourFromNow = new Date();
    hourFromNow.setTime(
      hourFromNow.getTime() +
        60 * 60 * 1000 +
        -hourFromNow.getTimezoneOffset() * 60000
    );
    const hourStr = hourFromNow.toISOString().split(".")[0];

    const twoHoursFromNow = new Date();
    twoHoursFromNow.setTime(
      twoHoursFromNow.getTime() +
        2 * 60 * 60 * 1000 +
        -twoHoursFromNow.getTimezoneOffset() * 60000
    );
    const twoHoursStr = twoHoursFromNow.toISOString().split(".")[0];

    it("Cannot create a booking where from is after to date", () => {
      cy.get("#bookingFrom").clear().type(twoHoursStr);
      cy.get("#bookingTo").clear().type(hourStr);
      cy.get("#bookingSubmit").click();
      cy.get("#bookingTo:invalid")
        .invoke("prop", "validationMessage")
        .should("include", "Value must be");
    });

    it("Create a booking", () => {
      cy.get("#bookingFrom").clear().type(hourStr);
      cy.get("#bookingTo").clear().type(twoHoursStr);
      cy.get("#bookingSubmit").click();
      cy.wait(1000);
      cy.contains("Toilet session");
    });

    it("Cannot create clashing bookings", () => {
      cy.get("#newBookingButton").click();
      cy.get("#bookingDesc").type("Toilet session");
      cy.get("#bookingFrom").clear().type(hourStr);
      cy.get("#bookingTo").clear().type(twoHoursStr);
      cy.get("#bookingSubmit").click();
      cy.get(".alert").should("be.visible");
    });
  });
});
