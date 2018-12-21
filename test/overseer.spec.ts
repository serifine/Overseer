import { Overseer } from '../src/overseer';
import { Rule } from '../src/models/rule';

const fileConfigurationRules: Rule[] = [
  {
    name: 'file1.rvt',
    conditions: {
      matches: 'all',
      childNodes: [
        {
          fact: 'exteriorType',
          operator: 'value-contains',
          value: ['brick']
        },
        {
          fact: 'name',
          operator: 'value-contains',
          value: ['lc']
        },
        {
          fact: 'size',
          operator: 'value-contains',
          value: ['lrg']
        }
      ]
    },
    event: {
      name: 'loadModel',
      data: 'file1.rvt'
    },
    failedEvent: {
      name: 'loadModel',
      data: 'file1.rvt'
    }
  },
  {
    name: 'file2.rvt',
    conditions: {
      matches: 'all',
      childNodes: [
        {
          fact: 'exteriorType',
          operator: 'value-contains',
          value: ['brick']
        },
        {
          fact: 'name',
          operator: 'value-contains',
          value: ['lc']
        },
        {
          fact: 'size',
          operator: 'value-contains',
          value: ['sml']
        }
      ]
    },
    event: {
      name: 'loadModel',
      data: 'file2.rvt'
    }
  },
  {
    name: 'file3.rvt',
    conditions: {
      matches: 'all',
      childNodes: [
        {
          fact: 'exteriorType',
          operator: 'value-contains',
          value: ['brick']
        },
        {
          fact: 'name',
          operator: 'value-contains',
          value: ['le']
        },
        {
          fact: 'size',
          operator: 'value-contains',
          value: ['sml']
        }
      ]
    },
    event: {
      name: 'loadModel',
      data: 'file3.rvt'
    },
    failedEvent: {
      name: 'loadModel',
      data: 'file3.rvt'
    }
  },
  {
    name: 'file4.rvt',
    conditions: {
      matches: 'some',
      childNodes: [
        {
          matches: 'some',
          childNodes: [
            {
              fact: 'exteriorType',
              operator: 'value-contains',
              value: ['esf']
            },
            {
              fact: 'name',
              operator: 'value-contains',
              value: ['sef']
            },
            {
              fact: 'size',
              operator: 'value-contains',
              value: ['fse']
            }
          ]
        }
      ]
    },
    event: {
      name: 'loadModel',
      data: 'file4.rvt'
    },
    failedEvent: {
      name: 'loadModel',
      data: 'file4.rvt'
    }
  },
  {
    name: 'file5.rvt',
    ruleGroup: 'load-files',
    conditions: {
      matches: 'all',
      childNodes: [
        {
          fact: 'exteriorType',
          operator: 'value-contains',
          value: ['stucco']
        },
        {
          fact: 'name',
          operator: 'value-contains',
          value: ['lc']
        },
        {
          fact: 'size',
          operator: 'value-contains',
          value: ['lrg']
        }
      ]
    },
    event: {
      name: 'loadModel',
      data: 'file5.rvt'
    },
    failedEvent: {
      name: 'loadModel',
      data: 'file5.rvt'
    }
  }
];

describe('Overseer Rules Engine', () => {
  let overseer: Overseer;

  beforeEach(() => {
    overseer = new Overseer();

    for (const rule of fileConfigurationRules) {
      overseer.registerRule(rule);
    }
  });

  test('Should load correct files', async () => {
    const events = await overseer.run({
      exteriorType: 'brick',
      name: 'lc',
      size: 'lrg'
    });

    expect(events.filter(t => t.name === 'loadModel').length === 2);
    expect(events.filter(t => t.name === 'unloadModel').length === 1);
  });

  test('Should evaluate only rule group.', async () => {
    const events = await overseer.run(
      {
        exteriorType: 'stucco',
        name: 'lc',
        size: 'lrg'
      },
      'load-files'
    );

    expect(events.filter(t => t.name === 'loadModel').length === 1);
    expect(events.filter(t => t.name === 'unloadModel').length === 0);
  });

  test('Should evaluate conditional tree with all matching conditionals as truthy', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'all',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'value-contains',
            value: ['brick']
          },
          {
            fact: 'name',
            operator: 'value-contains',
            value: ['lc']
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['lrg']
          }
        ]
      },
      {
        exteriorType: 'brick',
        name: 'lc',
        size: 'lrg'
      });

    expect(result).toBe(true);
  });

  test('evaluateConditionalTree (all): should evaluate true with matching sub conditional tree', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'all',
        childNodes: [
          {
            matches: 'all',
            childNodes: [
              {
                fact: 'exteriorType',
                operator: 'value-contains',
                value: ['brick']
              },
              {
                fact: 'name',
                operator: 'value-contains',
                value: ['lc']
              }
            ]
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['lrg']
          }
        ]
      },
      {
        exteriorType: 'brick',
        name: 'lc',
        size: 'lrg'
      });

    expect(result).toBe(true);
  });

  test('evaluateConditionalTree (all): should evaluate true when all conditionals are true', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'all',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'value-contains',
            value: ['brick']
          },
          {
            fact: 'name',
            operator: 'value-contains',
            value: ['lc']
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['lrg']
          }
        ]
      },
      {
        exteriorType: 'brick',
        name: 'lc',
        size: 'lrg'
      });

    expect(result).toBe(true);
  });

  test('evaluateConditionalTree (all): should evaluate false when any conditional is false', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'all',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'value-contains',
            value: ['brick']
          },
          {
            fact: 'name',
            operator: 'value-contains',
            value: ['le']
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['lrg']
          }
        ]
      },
      {
        exteriorType: 'brick',
        name: 'lc',
        size: 'lrg'
      });

    expect(result).toBe(false);
  });

  test('evaluateConditionalTree (some): should evaluate true when any conditional is true', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'some',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'value-contains',
            value: ['brick']
          },
          {
            fact: 'name',
            operator: 'value-contains',
            value: ['le']
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['sml']
          }
        ]
      },
      {
        exteriorType: 'brick',
        name: 'lc',
        size: 'lrg'
      });

    expect(result).toBe(true);
  });

  test('evaluateConditionalTree (some): should evaluate false when all conditionals are false', async () => {
    const result = await (overseer as any).evaluateConditionalTree(
      {
        matches: 'some',
        childNodes: [
          {
            fact: 'exteriorType',
            operator: 'value-contains',
            value: ['brick']
          },
          {
            fact: 'name',
            operator: 'value-contains',
            value: ['le']
          },
          {
            fact: 'size',
            operator: 'value-contains',
            value: ['lrg']
          }
        ]
      },
      {
        exteriorType: 'stucco',
        name: 'lc',
        size: 'sml'
      });

    expect(result).toBe(false);
  });

  test('Should evaluate matching conditional as true.', async () => {
    const result = await (overseer as any).evaluateConditional({
      fact: 'exteriorType',
      operator: 'value-contains',
      value: ['brick']
    }, {
        exteriorType: 'brick'
      });

    expect(result).toBe(true);
  });

  test('Should evaluate non-matching conditional as false.', async () => {
    const result = await (overseer as any).evaluateConditional({
      fact: 'exteriorType',
      operator: 'value-contains',
      value: ['brick']
    }, {
        exteriorType: 'stucco'
      });

    expect(result).toBe(false);
  });

  test('Should throw error when using unregistered operator.', async () => {
    try {
      await (overseer as any).evaluateConditional({
        fact: 'exteriorType',
        operator: 'value-containss',
        value: ['brick']
      }, {});

      expect(false).toBeTruthy();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

});
