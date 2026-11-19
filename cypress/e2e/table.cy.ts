it("default", () => {
  cy.visit("/?component=table");

  cy.get("table").should("be.visible");
  cy.get("tr").should("have.length", 4); // 1 header row + 3 body rows
  cy.get("th").should("have.length", 3);
  cy.get("td").should("have.length", 9);
});
