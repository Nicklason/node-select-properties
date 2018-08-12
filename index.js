'use strict';

// This module is inspired by mongoose's select query

/**
 * Specify which properties to include or exclude of an object or an array of objects
 * @param {Object|Array} target Object to select properties from
 * @param {Object|String} fields Properties to select
 * @return {Object|Array} A copy of the target with the selected fields
 * @example
 * selectProperties({ foo: '', bar: '' }, { foo: false }) -> { bar: '' }
 * selectProperties({ foo: '', bar: '' }, { foo: true }) -> { foo: '' }
 * selectProperties([{ foo: '' }], {}) -> [{ foo: '' }]
 */
module.exports = function (...args) {
    let target = args[0];

    const isArr = Array.isArray(target);
    const isObj = typeof target === 'object' && !isArr;

    if (!isObj && !isArr) {
        throw new TypeError('Invalid argument: first argument must be an object or array');
    }

    if (args.length === 1) return target;
    if (args.length !== 2) {
        throw new Error('Invalid arguments: select takes 2 arguments');
    }

    let items = isArr === true ? target : [target];
    let select = args[1];
    const type = typeof select;
    let fields = {};

    let i;
    let len;

    if (type === 'string') {
        select = select.split(/\s+/);
        for (i = 0, len = select.length; i < len; ++i) {
            let field = select[i];
            if (!field) continue;
            const include = '-' == field[0] ? false: true;
            if (!include) field = field.substring(1);
            fields[field] = include;
        }
    } else if (type === 'object' && !Array.isArray(select) && select !== null) {
        const keys = Object.keys(select);
        for (i = 0; i < keys.length; ++i) {
            fields[keys[i]] = select[keys[i]] === true || select[keys[i]] === 1;
        }
    } else {
        throw new TypeError('Invalid second argument: must be string, or object.');
    }

    const parsed = selectArray(items, fields);
    return isArr ? parsed : parsed[0];
};

/**
 * Returns an object with the specificed properties
 * @param {Object} target Object to select properties from
 * @param {Object} fields Properties to select
 * @return {Object} Object with selected fields
 */
function select (target, fields) {
    let included = [];
    let excluded = [];

    for (let field in fields) {
        if (!fields.hasOwnProperty(field)) continue;
        const include = fields[field];
        (include === true ? included : excluded).push(field);
    }

    let i;
    let len;

    const include = included.length !== 0;
    const check = !include ? excluded : included;
    let result = !include ? target : {};

    for (i = 0, len = check.length; i < len; ++i) {
        let field = check[i];
        if (!include) {
            delete result[field]
        } else if (target.hasOwnProperty(field)) {
            result[field] = target[field];
        }
    }

    return result;
}

/**
 * Returns a copy of an array of object with the specified properties selected
 * @param {Array} targets Objects to select properties from
 * @param {Object} fields Properties to select
 * @return {Array} Array of objects with the selected fields
 */
function selectArray (targets, fields) {
    let i;
    const len = targets.length;

    for (i = 0; i < len; ++i) {
        const obj = targets[i];
        targets[i] = select(obj, fields);
    }

    return targets;
}
