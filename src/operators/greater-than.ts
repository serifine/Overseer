import { OverseerOperator } from '../models/operator';

export const greaterThan: OverseerOperator = {
  name: 'greater-than',
  execute(value: any, target: string, data: any) {
    return value > data[target];
  }
};
