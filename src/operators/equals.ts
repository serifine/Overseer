import { OverseerOperator } from '../models/operator';

export const equals: OverseerOperator = {
  name: 'equals',
  execute(value: any, target: string, facts: any) {
    return value === facts[target];
  }
};
