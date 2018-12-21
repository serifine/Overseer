import { OverseerOperator } from '../models/operator';

export const lessThan: OverseerOperator = {
  name: 'less-than',
  execute(value: any, target: string, data: any) {
    return value < data[target];
  }
};
