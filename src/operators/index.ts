import { OverseerOperator } from '../models/operator';

import { valueContains as valueContains } from './value-contains';
import { factContains } from './fact-contains';
import { equals } from './equals';
import { greaterThan } from './greater-than';
import { lessThan } from './less-than';
import { notEquals } from './not-equals';

export const globalOperators: OverseerOperator[] = [];

globalOperators.push(valueContains);
globalOperators.push(factContains);
globalOperators.push(equals);
globalOperators.push(greaterThan);
globalOperators.push(lessThan);
globalOperators.push(notEquals);
