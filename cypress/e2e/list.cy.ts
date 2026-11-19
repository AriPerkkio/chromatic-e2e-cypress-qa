it("default", () => {
  cy.visit("/?component=list");

  cy.get("ul").should("be.visible");
  cy.get("li").should("have.length", 3);
});
