import { describe, expect, it } from "local-cypress";

import { rewire$Moo, restore } from "./Moo.component";

describe("rewire tests", () => {
  it("test out rewire", () => {
    console.log("@@@@@@", rewire$Moo, restore);
    expect(true).to.be.true;
  });
});
