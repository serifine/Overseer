import { factContains } from '../../src/operators/fact-contains';

describe('Fact Contains Operator', () => {
  test('Should return true when value is contained in fact.', () => {
    expect(factContains.execute('test', 'testValue', { testValue: ['test'] })).toBe(true);
  });
});
