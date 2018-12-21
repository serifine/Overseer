
/**
 * Interface to implement an Overseer Operator
 */
export interface OverseerOperator {
  /** Name of the operator */
  name: string;

  /** Function that executes the logic of the Operator. */
  execute(values: any, target: string, data: any): boolean;
}
