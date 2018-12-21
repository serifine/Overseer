import { equals } from '../../src/operators/equals';

describe('Equals Operator', () => {
  test('Should return true when values match.', () => {
    expect(equals.execute('test', 'testValue', { testValue: 'test' })).toBe(true);
  });
});
