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

const Stubbed = () => {
  console.log("@@@@@@@@@@@@@");
  return <section>this is a stub DS component</section>;
};

describe("rewire tests", () => {
  beforeEach(() => {
    rewire$demoFunction(() => "holy smokes batman!");
    rewire$useSimpleHook(() => ({ number: 48 }));
    rewire$demoObject({ aww: "yeah!" });
    rewire$demoString("i can totally rewire");
    rewire$SimpleText(() => <section>this is a stub DS component</section>);
  });

  it("test out rewire", () => {
    mount(<Moo name="POW!" />);
    cy.contains("48").should("exist");
    cy.contains("this is a stub DS component").should("exist");
  });
});
