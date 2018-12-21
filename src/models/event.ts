
/**
 * An action that is triggered after a set of rules is completed.
 */
export interface OverseerEvent {
  /** The name of the action. */
  name: string;

  /** Data that is returned by the action. */
  data: any;
}
