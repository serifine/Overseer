import { lessThan } from '../../src/operators/less-than';

describe('Greater Than Operator', () => {
  test('Should return true when value is less than datas value.', () => {
    expect(lessThan.execute(1, 'testValue', { testValue: 2 })).toBe(true);
  });
});
