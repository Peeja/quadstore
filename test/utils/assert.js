/**
 *
 * @param predicate
 * @param path
 * @param error  -- "invalid quad"
 * @param expected -- "to be ..."
 * @param value
 */
const is = (predicate, path, error, expected, value) => {
    if (predicate) {
        return;
    }
    const message = `${error}: expected ${expected} ${path ? `at path ${path}` : ''}, got ${value}`;
    throw new Error(message);
};
export const isTrue = (value, path = '', error = 'invalid boolean value') => {
    is(value === true, path, error, 'true', value);
    return true;
};
export const isFalse = (value, path = '', error = 'invalid boolean value') => {
    is(value === false, path, error, 'false', value);
    return true;
};
export const isArray = (value, path = '', error = 'invalid array') => {
    is(Array.isArray(value), path, error, 'an array', value);
    return true;
};
export const isObject = (value, path = '', error = 'invalid object') => {
    is(typeof value === 'object' && value !== null, path, error, 'an object', value);
    return true;
};
export const isString = (value, path = '', error = 'invalid string') => {
    is(typeof value === 'string', path, error, 'a string', value);
    return true;
};
export const isTerm = (value, path = '', error = 'invalid term') => {
    isObject(value, '', error);
    isString(value.termType, '.termType', error);
    return true;
};
export const isQuad = (value, path = '', error = 'invalid quad') => {
    isObject(value, path, error);
    isTerm(value.subject, `${path}.subject`, error);
    isTerm(value.predicate, `${path}.predicate`, error);
    isTerm(value.object, `${path}.object`, error);
    isTerm(value.graph, `${path}.graph`, error);
    return true;
};
export const isFiniteNumber = (value, path = '', error = 'invalid number') => {
    is(typeof value === 'number' && !Number.isNaN(value) && Math.abs(value) !== Infinity, path, error, 'a number', value);
    return true;
};
export const isLessThanOrEqual = (value, expected, path = '', error = 'value greater than threshold') => {
    isFiniteNumber(value, path);
    is(value <= expected, path, error, `less than or equal to ${expected}`, value);
    return true;
};
export const isStrictEqual = (value, expected, path = '', error = 'unequal values') => {
    is(value === expected, path, error, `${expected}`, value);
    return true;
};
export const isQuadArray = (value, path = '', error = 'invalid quad array') => {
    isArray(value, path, error);
    for (let i = 0, l = value.length; i < l; i += 1) {
        isQuad(value[i], `${path}[${i}]`, error);
    }
    return true;
};
export const equalsTerm = (value, expected, path = '', error = 'unequal terms') => {
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
export const equalsQuad = (value, expected, path = '', error = 'unequal quads') => {
    isQuad(value);
    equalsTerm(value.subject, expected.subject, `${path}.subject`, error);
    equalsTerm(value.predicate, expected.predicate, `${path}.predicate`, error);
    equalsTerm(value.object, expected.object, `${path}.object`, error);
    equalsTerm(value.graph, expected.graph, `${path}.graph`, error);
    return true;
};
export const equalsQuadArray = (value, expected, path = '', error = 'unequal quad arrays') => {
    isArray(value);
    isStrictEqual(value.length, expected.length, `${path}.length`, error);
    for (let i = 0, l = expected.length; i < l; i += 1) {
        equalsQuad(value[i], expected[i], `${path}[${i}]`, error);
    }
    return true;
};
export const arrayStartsWith = (start, arr, path = '', error = 'array does not start with prefix') => {
    isArray(arr, path, error);
    isArray(start, path, error);
    for (let i = 0, l = start.length; i < l; i += 1) {
        isStrictEqual(start[i], arr[i], `${path}[${i}]`, error);
    }
};
