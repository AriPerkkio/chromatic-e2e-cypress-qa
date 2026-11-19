beforeEach(() => {
  cy.viewport(1280, 800);
});

it("home page", () => {
  cy.visit("https://www.chromatic.com/");

  cy.get("h1").should("be.visible");
});

it("cypress page", () => {
  cy.visit("https://www.chromatic.com/cypress");

  cy.get("h1").should("be.visible");
});
