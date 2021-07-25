import { mount } from "@cypress/react";
import { describe, cy, it } from "local-cypress";

import {
  Moo,
  rewire$demoFunction,
  rewire$demoObject,
  rewire$demoString,
} from "./Moo.component";
import { rewire$useSimpleHook } from "./simple-number.hook";

describe("rewire tests", () => {
  beforeEach(() => {
    rewire$demoFunction(() => "holy smokes batman!");
    rewire$useSimpleHook(() => ({ number: 48 }));
    rewire$demoObject({ moo: "dog" });
    rewire$demoString("i can totally rewire!");
  });

  it("test out rewire", () => {
    mount(<Moo name="POW!" />);
    cy.contains("48").should("exist");
  });
});
