import { describe, expect, it } from "local-cypress";
import { rewire } from "rewire";

const { Moo } = rewire("./Moo.component");

describe("rewire tests", () => {
  it("test out rewire", () => {
    console.log("@@@@@@", Moo);
    expect(true).to.be.true;
  });
});
