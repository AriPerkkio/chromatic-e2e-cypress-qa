/**
 * Cypress has no native hover or keyboard events that trigger real CSS pseudo-states
 * like `:hover` and `:focus-visible`. These helpers dispatch real input events through
 * Chrome DevTools Protocol instead.
 */

type Point = { x: number; y: number };

function cdp(command: string, params: Record<string, unknown>) {
  return Cypress.automation("remote:debugger:protocol", { command, params });
}

/** Element center in top-level window coordinates, accounting for the AUT iframe */
function getElementCenter(el: HTMLElement): Point {
  const rect = el.getBoundingClientRect();
  const autWindow = el.ownerDocument.defaultView!;

  const autIframe =
    autWindow === autWindow.top
      ? undefined
      : [...autWindow.parent.document.querySelectorAll("iframe")].find(
          (frame) => frame.contentWindow === autWindow,
        );

  if (!autIframe) {
    return {
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + rect.height / 2),
    };
  }

  const iframeRect = autIframe.getBoundingClientRect();
  const scale = autIframe.offsetWidth
    ? iframeRect.width / autIframe.offsetWidth
    : 1;

  return {
    x: Math.round(iframeRect.left + rect.left * scale + (rect.width * scale) / 2),
    y: Math.round(iframeRect.top + rect.top * scale + (rect.height * scale) / 2),
  };
}

function mouseEvent(type: string, point: Point, pressed = false) {
  return cdp("Input.dispatchMouseEvent", {
    type,
    x: point.x,
    y: point.y,
    button: type === "mouseMoved" ? "none" : "left",
    buttons: pressed ? 1 : 0,
    clickCount: type === "mouseMoved" ? 0 : 1,
    pointerType: "mouse",
  });
}

/** Move the real mouse over the subject element */
export function hover<E extends HTMLElement>(subject: Cypress.Chainable<JQuery<E>>) {
  return subject.then(($el) => mouseEvent("mouseMoved", getElementCenter($el[0])));
}

/** Move the real mouse away from all elements, to the top-left corner of the page */
export function unhover() {
  return cy.wrap(null).then(() => mouseEvent("mouseMoved", { x: 0, y: 0 }));
}

/** Real mouse click on the subject element */
export function click<E extends HTMLElement>(subject: Cypress.Chainable<JQuery<E>>) {
  return subject.then(($el) => {
    const point = getElementCenter($el[0]);

    return mouseEvent("mouseMoved", point)
      .then(() => mouseEvent("mousePressed", point, true))
      .then(() => mouseEvent("mouseReleased", point));
  });
}

/** Real keyboard Tab press */
export function tab() {
  const key = { windowsVirtualKeyCode: 9, key: "Tab", code: "Tab" };

  return cy
    .wrap(null)
    .then(() => cdp("Input.dispatchKeyEvent", { type: "rawKeyDown", ...key }))
    .then(() => cdp("Input.dispatchKeyEvent", { type: "keyUp", ...key }));
}

/** Assert that the element currently matches a CSS pseudo-class, e.g. `:hover` */
export function matches<E extends HTMLElement>(pseudo: string) {
  return ($el: JQuery<E>) => {
    expect($el[0].matches(pseudo), `element matches ${pseudo}`).to.equal(true);
  };
}
