import { Conditional } from './conditional';

export interface ConditionalTreeNode {
  matches: 'all' | 'some';

  // tslint:disable-next-line
  childNodes: Array<Conditional | ConditionalTreeNode>;
}
