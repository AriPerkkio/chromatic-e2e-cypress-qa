// Workaround: `@chromatic-com/cypress@1.0.0`'s `support.d.mts` declares `takeSnapshot`
// in a non-module file with a non-generic `Chainable`, so the augmentation doesn't apply.
export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      takeSnapshot(name?: string): Chainable<any>;
    }
  }
}
