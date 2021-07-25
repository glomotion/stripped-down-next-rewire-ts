import { describe, expect, it } from 'local-cypress';

import * as moo from '.';

describe('rewire tests', () => {
  it('test out rewire', () => {
    console.log('@@@@@@', moo);
    expect(true).to.be.true;
  });
});
