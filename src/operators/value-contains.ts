import { OverseerOperator } from '../models/operator';

export const valueContains: OverseerOperator = {
  name: 'value-contains',
  execute(values: any[], target: string, facts: any) {
    return values.some(value => value === facts[target]);
  }
};
