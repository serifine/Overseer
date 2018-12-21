import { Conditional } from './models/conditional';
import { ConditionalTreeNode } from './models/conditional-tree-node';
import { OverseerEvent } from './models/event';
import { OverseerOperator } from './models/operator';
import { Rule } from './models/rule';
import { globalOperators } from './operators';

/**
 * A simple rules engine that is easy to use.
 */
export class Overseer {
  private rules: Rule[];
  private operators: OverseerOperator[];

  /**
   * A simple rules engine that is easy to use.
   */
  constructor() {
    this.rules = [];
    this.operators = [];
  }

  /**
   *
   * @param facts Data to run the rules against.
   * @param ruleGroup The rule group to operate on. If this is specified non matching rules will be skipped.
   */
  public async run(facts: any, ruleGroup?: string) {
    const events: OverseerEvent[] = [];

    for (const rule of this.rules) {
      // tslint:disable-next-line
      if ((ruleGroup || rule.ruleGroup) && rule.ruleGroup != ruleGroup) {
        continue;
      }

      const result = await this.evaluateConditionalTree(rule.conditions, facts);

      if (result === true) {
        events.push(rule.event);
      } else if (rule.failedEvent) {
        events.push(rule.failedEvent);
      }
    }

    return events;
  }

  /**
   * Adds a rule to the rule collection for this Overseer instance.
   * @param rule Rule to add to the rule collection.
   */
  public registerRule(rule: Rule) {
    const existingNamedRule = this.rules.find(t => t.name === rule.name);

    if (existingNamedRule != null) {
      throw new Error('A rule by this name already exists, unable to register.');
    }

    this.rules.push(rule);
  }

  /**
   * Removes all rules.
   */
  public clearAllRules() {
    this.rules = [];
  }

  /**
   * Removes a rule from the instance collection.
   * @param rule The rule or name of the rule to remove.
   */
  public removeRule(rule: string | Rule) {
    if (typeof rule === 'string') {
      rule = this.rules.find(t => t.name === rule);
    }

    if (rule == null) {
      throw new Error('No rule found, unable to remove.');
    }

    this.rules.splice(this.rules.indexOf(rule), 1);
  }

  /**
   * Adds an operator that is specific to this Overseer instance.
   * @param operator The operator to add.
   */
  public registerOperator(operator: OverseerOperator) {
    if (this.operators.some(t => t.name === operator.name)) {
      throw new Error('An operator with this name already exists, unable to register.');
    }

    this.operators.push(operator);
  }

  /**
   * Removes an operator from the instance collection.
   * @param operator The operator or name of the operator to remove.
   */
  public removeOperator(operator: string | OverseerOperator) {
    if (typeof operator === 'string') {
      operator = this.operators.find(t => t.name === operator);
    }

    if (operator == null) {
      throw new Error('Operator not found, unable to remove.');
    }

    this.operators.splice(this.operators.indexOf(operator), 1);
  }

  private async evaluateConditionalTree(node: ConditionalTreeNode, facts: any) {
    const results: boolean[] = [];

    for (const childNode of node.childNodes) {
      let result: any;

      if (
        Object.keys(childNode).includes('matches') &&
        Object.keys(childNode).includes('childNodes')
      ) {
        result = await this.evaluateConditionalTree(childNode as ConditionalTreeNode, facts);
      } else {
        result = await this.evaluateConditional(childNode as Conditional, facts);

        if (node.matches === 'some' && result === true) {
          return true;
        }
      }

      results.push(result);
    }

    if (node.matches === 'all') {
      return results.every(t => t === true);
    }

    return false;
  }

  private async evaluateConditional(node: Conditional, facts: any) {
    const operator = [...this.operators, ...globalOperators]
      .find(t => t.name === node.operator);

    if (operator == null) {
      throw new Error(`No registered operators of type: ${node.operator}`);
    }

    return operator.execute(node.value, node.fact, facts);
  }

  // public exportAsJson(rules: string) { }
  // public parseFromJson(rules: string) { }
}
