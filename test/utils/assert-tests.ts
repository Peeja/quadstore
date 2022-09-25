
import * as assert from './assert';
import { DataFactory } from 'rdf-data-factory';

const df = new DataFactory();

export const runAssertTests = () => {

  describe('assert functions', () => {

    describe('equalsQuad', () => {

      it('should not throw with equal quads', () => {
        const a = df.quad(
          df.namedNode('ex://s'),
          df.namedNode('ex://p'),
          df.namedNode('ex://o'),
          df.namedNode('ex://g')
        );
        const b = df.quad(
          df.namedNode('ex://s'),
          df.namedNode('ex://p'),
          df.namedNode('ex://o'),
          df.namedNode('ex://g')
        );
        assert.equalsQuad(a, b);
      });

    });

  });

};
