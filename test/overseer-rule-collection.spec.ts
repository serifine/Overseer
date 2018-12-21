import { Overseer } from '../src/index';

describe('Overseer: Rule collection', () => {
  let overseer: Overseer;

  beforeEach(() => {
    overseer = new Overseer();

    (overseer as any).rules = [
      {
        name: 'ruleA',
        conditions: {
          matches: 'all',
          childNodes: [
            {
              fact: 'exteriorType',
              operator: 'containedIn',
              value: ['brick']
            }
          ]
        },
        action: {
          name: 'loadModel',
          data: 'afr34a3423443a'
        }
      }
    ];
  });

  test('It should register a new rule.', () => {
    overseer.registerRule({
      name: 'ruleB',
      conditions: {
        matches: 'all',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'containedIn',
            value: ['brick']
          }
        ]
      },
      event: {
        name: 'loadModel',
        data: 'afr34a3423443a'
      }
    });

    expect((overseer as any).rules.length).toBe(2);
    expect((overseer as any).rules.find(t => t.name === 'ruleB')).toBeDefined();
  });

  test('It should throw an exception when trying to register a duplicate rule.', () => {
    expect(() => {
      overseer.registerRule({
        name: 'ruleA',
        conditions: {
          matches: 'all',
          childNodes: [
            {
              fact: 'exteriorType',
              operator: 'containedIn',
              value: ['brick']
            }
          ]
        },
        event: {
          name: 'loadModel',
          data: 'afr34a3423443a'
        }
      });
    }).toThrow();
  });

  test('It should remove all rules when clearRules is called.', () => {
    overseer.clearAllRules();

    expect((overseer as any).rules.length).toBe(0);
  });

  test('It should remove a specific rule when provided with the rule name.', () => {
    overseer.removeRule('ruleA');

    expect((overseer as any).rules.length).toBe(0);
  });

  test('It should remove a specific rule when provided with the rule.', () => {
    overseer.removeRule({
      name: 'ruleA',
      conditions: {
        matches: 'all',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'containedIn',
            value: ['brick']
          }
        ]
      },
      event: {
        name: 'loadModel',
        data: 'afr34a3423443a'
      }
    });

    expect((overseer as any).rules.length).toBe(0);
  });
  
  test('It should throw an exception when trying to remove a missing rule.', () => {
    expect(() => {
      overseer.removeRule('ruleB');
    }).toThrow();
  });
});