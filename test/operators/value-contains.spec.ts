import { valueContains } from '../../src/operators/value-contains';

describe('Value Contains Operator', () => {
  test('Should return true when fact is contained in values.', () => {
    expect(valueContains.execute(['test'], 'testValue', { testValue: 'test' })).toBe(true);
  });
});
