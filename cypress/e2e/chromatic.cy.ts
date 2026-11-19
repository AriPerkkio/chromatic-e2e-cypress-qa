beforeEach(() => {
  cy.viewport(1280, 800);

  // chromatic.com loads third-party scripts (e.g. analytics) that can throw
  // unhandled errors, especially in CI. Those shouldn't fail these tests.
  cy.on("uncaught:exception", () => false);
});

it("home page", () => {
  cy.visit("https://www.chromatic.com/");

  cy.get("h1").should("be.visible");
});

it("cypress page", () => {
  cy.visit("https://www.chromatic.com/cypress");

  cy.get("h1").should("be.visible");
});
