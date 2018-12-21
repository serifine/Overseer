import { greaterThan } from '../../src/operators/greater-than';

describe('Greater Than Operator', () => {
  test('Should return true when value is greater than datas value.', () => {
    expect(greaterThan.execute(2, 'testValue', { testValue: 1 })).toBe(true);
  });
});
