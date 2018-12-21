import { OverseerOperator } from '../models/operator';

export const notEquals: OverseerOperator = {
  name: 'not-equals',
  execute(value: any, target: string, facts: any) {
    return value !== facts[target];
  }
};
