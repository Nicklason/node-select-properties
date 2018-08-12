'use strict';

/* eslint no-undef: 0 */

const selectProperties = require('../');
const assert = require('assert');

describe('Errors', function () {
    it('should throw if missing arguments', function () {
        assert.throws(function () {
            selectProperties();
        });
    });

    it('should throw when having too many arguments', function () {
        assert.throws(function () {
            const target = {};
            const fields = {};
            selectProperties(target, fields, undefined);
        });
    });

    it('should throw when giving an invalid first argument', function () {
        assert.throws(function () {
            const target = 'abc';
            const fields = {};
            selectProperties(target, fields);
        });
    });

    it('should throw when giving an invalid second argument', function () {
        assert.throws(function () {
            const target = {};
            const fields = null;
            selectProperties(target, fields);
        });
    });
});

describe('Include', function () {
    it('should return the same object if only one argument was given', function () {
        const target = { foo: '', bar: 1 };
        assert.deepStrictEqual(selectProperties(target), target);
    });

    it('should only return the specifed fields that the target has', function () {
        const target = { foo: '' };
        const fields = { foo: true, bar: true };
        assert.deepStrictEqual(selectProperties(target, fields), target);
    });

    it('should work with strings', function () {
        const target = { foo: '' };
        const fields = 'foo bar';
        assert.deepStrictEqual(selectProperties(target, fields), target);
    });

    it('should work with arrays', function () {
        const target = [{ foo: '' }];
        const fields = 'foo bar';
        assert.deepStrictEqual(selectProperties(target, fields), target);
    });
});

describe('Exclude', function () {
    it('should return the same object if only one argument was given', function () {
        const target = { foo: '', bar: 1 };
        assert.deepStrictEqual(selectProperties(target), target);
    });

    it('should only return the specifed fields that the target has', function () {
        const target = { foo: '', bar: '' };
        const fields = { foo: false, bar: false };
        assert.deepStrictEqual(selectProperties(target, fields), {});
    });

    it('should work with strings', function () {
        const target = { foo: '', bar: '' };
        const fields = '-foo bar';
        assert.deepStrictEqual(selectProperties(target, fields), { bar: '' });
    });

    it('should work with arrays', function () {
        const target = [{ foo: '' }];
        const fields = '-foo';
        assert.deepStrictEqual(selectProperties(target, fields), [{}]);
    });
});
