
import {AsyncIterator, IntegerIterator} from 'asynciterator';
import { delayIterator } from '../utils/stuff';
import { consumeOneByOne } from '../../dist/esm/utils/consumeonebyone';
import { isStrictEqual } from '../utils/assert';

const createSourceIterator = () => new IntegerIterator({ start: 0, step: 1, end: 99 });

export const runConsumeOneByOneTests = () => {

  describe('consumeOneByOne()', () => {

    let source: AsyncIterator<any>;

    it('should consume an IntegerIterator', () => {
      source = createSourceIterator();
    });

    it('should consume an asynchronous IntegerIterator', () => {
      source = delayIterator(createSourceIterator());
    });

    afterEach(async () => {
      let count = 0;
      await consumeOneByOne(source, async (item) => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        isStrictEqual(item, count++);
      });
      isStrictEqual(count, 100);
    });

  });

};
