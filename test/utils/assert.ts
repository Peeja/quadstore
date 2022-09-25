
import type { Quad, Term } from 'rdf-js';

/**
 *
 * @param predicate
 * @param path
 * @param error  -- "invalid quad"
 * @param expected -- "to be ..."
 * @param value
 */
const is = (predicate: boolean, path: string, error: string, expected: any, value: any) => {
  if (predicate) {
    return;
  }
  const message = `${error}: expected ${expected} ${path ? `at path ${path}` : ''}, got ${value}`;
  throw new Error(message);
};

export const isTrue = (value: any, path: string = '', error: string = 'invalid boolean value'): value is true => {
  is(value === true, path, error, 'true', value);
  return true;
};

export const isFalse = (value: any, path: string = '', error: string = 'invalid boolean value'): value is false => {
  is(value === false, path, error, 'false', value);
  return true;
};

export const isArray = (value: any, path: string = '', error: string = 'invalid array'): value is any[] => {
  is(Array.isArray(value), path, error, 'an array', value);
  return true;
};

export const isObject = (value: any, path: string = '', error: string = 'invalid object'): value is Object => {
  is(typeof value === 'object' && value !== null, path, error, 'an object', value);
  return true;
};

export const isString = (value: any, path: string = '', error: string = 'invalid string'): value is string => {
  is(typeof value === 'string', path, error, 'a string', value);
  return true;
};

export const isTerm = (value: any, path: string = '', error: string = 'invalid term'): value is Term => {
  isObject(value, '', error);
  isString(value.termType, '.termType', error);
  return true;
};

export const isQuad = (value: any, path: string = '', error: string = 'invalid quad'): value is Quad => {
  isObject(value, path, error);
  isTerm(value.subject, `${path}.subject`, error);
  isTerm(value.predicate, `${path}.predicate`, error);
  isTerm(value.object, `${path}.object`, error);
  isTerm(value.graph, `${path}.graph`, error);
  return true;
};

export const isFiniteNumber = (value: any, path: string = '', error: string = 'invalid number'): value is number => {
  is(typeof value === 'number' && !Number.isNaN(value) && Math.abs(value) !== Infinity, path, error, 'a number', value);
  return true;
};

export const isLessThanOrEqual = (value: any, expected: number, path: string = '', error: string = 'value greater than threshold'): value is number => {
  isFiniteNumber(value, path);
  is(value <= expected, path, error, `less than or equal to ${expected}`, value);
  return true;
};

export const isStrictEqual = <T>(value: any, expected: T, path: string = '', error: string = 'unequal values'): value is T => {
  is(value === expected, path, error, `${expected}`, value);
  return true;
};

export const isQuadArray = (value: any, path: string = '', error: string = 'invalid quad array'): value is Quad[] => {
  isArray(value, path, error);
  for (let i = 0, l = value.length; i < l; i += 1) {
    isQuad(value[i], `${path}[${i}]`, error);
  }
  return true;
};

export const equalsTerm = (value: any, expected: Term, path: string = '', error: string = 'unequal terms'): boolean => {
  isTerm(value);
  isStrictEqual(value.termType, expected.termType, `${path}.termType`, error);
  isStrictEqual(value.value, expected.value, `${path}.value`, error);
  if (expected.termType === 'Literal') {
    if (expected.language) {
      isStrictEqual(value.language, expected.language, `${path}.language`, error);
    }
    if (expected.datatype) {
      equalsTerm(value.datatype, expected.datatype, `${path}.datatype`, error);
    }
  }
  return true;
};

export const equalsQuad = (value: any, expected: Quad, path: string = '', error: string = 'unequal quads'): boolean => {
  isQuad(value);
  equalsTerm(value.subject, expected.subject, `${path}.subject`, error);
  equalsTerm(value.predicate, expected.predicate, `${path}.predicate`, error);
  equalsTerm(value.object, expected.object, `${path}.object`, error);
  equalsTerm(value.graph, expected.graph, `${path}.graph`, error);
  return true;
};

export const equalsQuadArray = (value: any, expected: Quad[], path: string = '', error: string = 'unequal quad arrays') => {
  isArray(value);
  isStrictEqual(value.length, expected.length, `${path}.length`, error);
  for (let i = 0, l = expected.length; i < l; i += 1) {
    equalsQuad(value[i], expected[i], `${path}[${i}]`, error);
  }
  return true;
};

export const arrayStartsWith = (start: any, arr: any, path: string = '', error: string = 'array does not start with prefix') => {
  isArray(arr, path, error);
  isArray(start, path, error);
  for (let i = 0, l = start.length; i < l; i += 1) {
    isStrictEqual(start[i], arr[i], `${path}[${i}]`, error);
  }
};
