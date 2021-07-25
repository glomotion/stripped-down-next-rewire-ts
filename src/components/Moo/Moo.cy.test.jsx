import { mount } from "@cypress/react";
import { describe, cy, it } from "local-cypress";

import { Moo, rewire$demoString } from "./Moo.component";
import { rewire$useSimpleHook } from "./simple-number.hook";

describe("rewire tests", () => {
  beforeEach(() => {
    rewire$demoString(() => "holy smokes batman!");
    rewire$useSimpleHook(() => ({ number: 48 }));
  });

  it("test out rewire", () => {
    mount(<Moo name="POW!" />);
    cy.contains("48").should("exist");
  });
});
