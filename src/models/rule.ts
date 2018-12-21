import { ConditionalTreeNode } from './conditional-tree-node';
import { OverseerEvent } from './event';

export interface Rule {
  conditions: ConditionalTreeNode;
  event: OverseerEvent;
  name?: string;
  ruleGroup?: string;
  failedEvent?: OverseerEvent;
}
