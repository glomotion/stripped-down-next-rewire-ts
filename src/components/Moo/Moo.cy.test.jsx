import { mount } from "@cypress/react";
import { describe, cy, it } from "local-cypress";
import { rewire$SimpleText } from "@imtbl/design-system";

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
    rewire$demoObject({ aww: "yeah!" });
    rewire$demoString("i can totally rewire");
    rewire$SimpleText(() => <div>fake simple text component</div>);
  });

  it("test out rewire", () => {
    console.log("@@@@@@@", moo);
    mount(<Moo name="POW!" />);
    cy.contains("48").should("exist");
    cy.contains("fake simple text component").should("exist");
  });
});
