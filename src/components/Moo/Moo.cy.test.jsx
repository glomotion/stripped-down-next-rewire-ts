import { describe, expect, it } from "local-cypress";
import { Moo } from "./Moo.component";

describe("rewire tests", () => {
  it("test out rewire", () => {
    console.log("@@@@@@", Moo);
    expect(true).to.be.true;
  });
});
