import { runAssertTests } from '../utils/assert-tests.js';
import { runFpstringTests } from './fpstring.js';
import { runConsumeOneByOneTests } from './consumeonebyone.js';
import { runConsumeInBatchesTests } from './consumeinbatches.js';
export const runOtherTests = () => {
    runAssertTests();
    runFpstringTests();
    runConsumeOneByOneTests();
    runConsumeInBatchesTests();
};
