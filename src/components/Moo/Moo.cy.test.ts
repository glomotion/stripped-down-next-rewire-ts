import { describe, expect, it } from "local-cypress";

import { $imports } from "./Moo.component";

describe("rewire tests", () => {
  it("test out rewire", () => {
    console.log("@@@@@@", $imports);
    expect(true).to.be.true;
  });
});
