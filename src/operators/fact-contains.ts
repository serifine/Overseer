import { OverseerOperator } from '../models/operator';

export const factContains: OverseerOperator = {
  name: 'fact-contains',
  execute(value: any, target: string, facts: any) {
    return facts[target].some(fact => fact === value);
  }
};
