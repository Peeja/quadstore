
import { runAssertTests } from '../utils/assert-tests';
import { runFpstringTests } from './fpstring';
import {runConsumeOneByOneTests} from './consumeonebyone';
import {runConsumeInBatchesTests} from './consumeinbatches';

export const runOtherTests = () => {
  runAssertTests();
  runFpstringTests();
  runConsumeOneByOneTests();
  runConsumeInBatchesTests();
};
