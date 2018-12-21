import { Overseer } from '../src/index';

describe('Overseer: Operator collection', () => {
  let overseer: Overseer;

  beforeEach(() => {
    overseer = new Overseer();

    (overseer as any).operators = [
      {
        name: 'operatorA',
        execute: () => {}
      }
    ];
  });

  test('It should add a new operator to the operator collection.', () => {
    overseer.registerOperator({
      name: 'operatorB',
      execute: () => true
    });

    expect((overseer as any).operators.length).toBe(2);
    expect((overseer as any).operators.find(t => t.name === 'operatorB')).toBeDefined();
  });

  test('It should throw an exception when trying to register a duplicate operator.', () => {
    expect(() => {
      overseer.registerOperator({
        name: 'operatorA',
        execute: () => true
      });
    }).toThrow();
  });

  test('It should remove a specific operator when provided with the operator name.', () => {
    overseer.removeOperator('operatorA');

    expect((overseer as any).operators.length).toBe(0);
  });

  test('It should remove a specific operator when provided with the operator.', () => {
    overseer.removeOperator({
      name: 'operatorA',
      execute: () => true
    });

    expect((overseer as any).operators.length).toBe(0);
  });
  
  
  test('It should throw an exception when trying to remove a missing operator.', () => {
    expect(() => {
      overseer.removeOperator('operatorB');
    }).toThrow();
  });
});
