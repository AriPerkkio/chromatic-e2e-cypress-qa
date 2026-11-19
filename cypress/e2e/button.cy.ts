import { click, hover, matches, tab, unhover } from "../support/cdp";

it("default", () => {
  cy.visit("/?component=button");

  cy.contains("button", "Submit").should("be.visible");
});

it("hover", () => {
  cy.visit("/?component=button");

  hover(cy.contains("button", "Submit"));
  cy.contains("button", "Submit").should(matches(":hover"));
});

it("many states", { expose: { disableAutoSnapshot: true } }, () => {
  cy.visit("/?component=button-many-states");
  cy.contains("button", "Testing").should("be.visible");
  cy.takeSnapshot("Default");

  hover(cy.contains("button", "Testing"));
  cy.contains("button", "Testing").should(matches(":hover"));
  cy.takeSnapshot("Hover");

  click(cy.contains("button", "Default"));
  unhover();

  tab();
  cy.contains("button", "Testing").should(matches(":focus-visible"));

  cy.takeSnapshot("focus-visible");
});
