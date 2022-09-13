
'use strict';

import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { uid } from '../dist/esm/utils/uid';
import { MemoryLevel } from 'memory-level';
import { ClassicLevel } from 'classic-level';
import { DataFactory } from 'rdf-data-factory';

require('./fpstring').runFpstringTests();

describe('MemoryLevel backend', () => {

  beforeEach(async function () {
    this.db = new MemoryLevel();
    this.indexes = null;
    this.dataFactory = new DataFactory();
    this.prefixes = {
      expandTerm: term => term,
      compactIri: iri => iri,
    };
  });

  require('./quadstore')();

});

describe('ClassicLevel backend', () => {

  beforeEach(async function () {
    this.location = path.join(os.tmpdir(), `quadstore-${uid()}`);
    this.db = new ClassicLevel(this.location);
    this.indexes = null;
    this.dataFactory = new DataFactory();
    this.prefixes = {
      expandTerm: term => term,
      compactIri: iri => iri,
    };
  });

  afterEach(async function () {
    await fs.rm(this.location, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 });
  });

  require('./quadstore')();

});

// describe('RocksDB backend', () => {
//
//   beforeEach(async function () {
//     this.location = path.join(os.tmpdir(), 'node-quadstore-' + utils.nanoid());
//     this.db = rocksdb(this.location);
//     this.indexes = null;
//     this.dataFactory = new DataFactory();
//     this.prefixes = {
//       expandTerm: term => term,
//       compactIri: iri => iri,
//     };
//   });
//
//   afterEach(async function () {
//     await remove(this.location);
//   });
//
//   require('./quadstore')();
//
// });

describe('MemoryLevel backend, standard indexes, with prefixes', () => {

  beforeEach(async function () {
    this.db = new MemoryLevel();
    this.indexes = null;
    this.dataFactory = new DataFactory();
    this.prefixes = {
      expandTerm: (term: string) => {
        if (term.startsWith('xsd:')) {
          return `http://www.w3.org/2001/XMLSchema#${term.slice(4)}`;
        }
        if (term.startsWith('rdf:')) {
          return `http://www.w3.org/1999/02/22-rdf-syntax-ns#${term.slice(4)}`;
        }
        if (term.startsWith('e:')) {
          return `ex://${term.slice(2)}`;
        }
        return term;
      },
      compactIri: (iri: string) => {
        if (iri.startsWith('http://www.w3.org/2001/XMLSchema#')) {
          return `xsd:${iri.slice(33)}`;
        }
        if (iri.startsWith('http://www.w3.org/1999/02/22-rdf-syntax-ns#')) {
          return `rdf:${iri.slice(43)}`;
        }
        if (iri.startsWith('ex://')) {
          return `e:${iri.slice(5)}`;
        }
        return iri;
      },
    };
  });

  require('./quadstore')();

});

describe('Utils', () => {
  require('./utils.consumeonebyone')();
  require('./utils.consumeinbatches')();
});
