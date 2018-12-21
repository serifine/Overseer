import { notEquals } from '../../src/operators/not-equals';

describe('Not Equals Operator', () => {
  test('Should return true when values dont match.', () => {
    expect(notEquals.execute('test', 'testValue', { testValue: 'tests' })).toBe(true);
  });
});
