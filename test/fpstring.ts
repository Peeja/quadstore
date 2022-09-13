
import { deepStrictEqual, notDeepStrictEqual } from 'assert';
import { encode } from '../dist/esm/serialization/fpstring';

/*
 * https://stackoverflow.com/a/12646864
 */
const shuffle = (arr: number[]): number[] => {
  arr = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const sort = <T>(arr: T[], sorter: (a: T, b: T) => -1 | 0 | 1) => {
  arr = [...arr];
  arr.sort(sorter);
  return arr;
};

export const runFpstringTests = () => {

  describe('Floating-point serialization', () => {

    it('should produce strings whose lexicographical sorting matches the natural sorting of the original values', async () => {

      const values = [
        -123.123,
        -9.1,
        -9,
        -2.123,
        -1.23,
        -1,
        -0.2123
        -0.123,
        -0.1,
        0,
        0.1,
        0.123,
        0.2123,
        1,
        1.23,
        2.123,
        9,
        9.1,
        123.123,
      ];

      const shuffledValues = shuffle(values);
      notDeepStrictEqual(shuffledValues, values);
      const shuffledPairs: [number, string][] = shuffledValues.map(n => [n, encode(n)]);
      const sortedPairs = sort(shuffledPairs, (p1, p2) => p1[1] < p2[1] ? -1 : 1);
      const sortedValues = sortedPairs.map(p => p[0]);
      deepStrictEqual(sortedValues, values);

    });

  });

};
