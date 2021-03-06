# node-select-properties

Specify which properties to include or exclude in an object or an array of objects

[![npm](https://img.shields.io/npm/v/select-properties.svg)](https://www.npmjs.com/package/select-properties)
[![Travis (.org)](https://img.shields.io/travis/Nicklason/node-select-properties.svg)](https://travis-ci.org/Nicklason/node-select-properties)
[![Coveralls github](https://img.shields.io/coveralls/github/Nicklason/node-select-properties.svg)](https://coveralls.io/github/Nicklason/node-select-properties)

[![npm](https://nodei.co/npm/select-properties.png)](https://nodei.co/npm/select-properties/)

# Introduction
I made this module to help me use [cachegoose](https://www.npmjs.com/package/cachegoose). I wanted to be able to cache all properties from queries, but only select specific fields. This is because I have two applications using the same [mongodb](https://www.mongodb.com/) and [redis](https://redis.io/) database, but they don't need the same data.

This module works the same way as mongoose's [select](http://mongoosejs.com/docs/queries.html) function, only difference is that you give it the result, and then give it the fields you want selected.

*This is the reason to why I've made this module, but you can use it to solve your own problems!*

It can be used 

# Examples

```js
const selectProperties = require('select-properties');

const target = { foo: '', bar: '' };
// Object to select the fields of

const select = { foo: 0 };
// Exclude the foo property

const result = selectProperties(target, select);
// The result will be { bar: '' }
```

Select nested properties using dot notation.

```js
const target = {
    some: {
        nested: {
            value: ''
        },
        other: {
            nested: {
                value: ''
            }
        }
    }
};

const select = '-some.nested';

const result = selectProperties(target, select);
// The result will be { some: { other: { nested: { value: '' } } } }
```

---
**NOTE**

Both nested paths, and properties, that match the selected field will be targeted.

See example below.

---

```js
const target = {
    some: {
        nested: {
            value: ''
        },
        other: {
            nested: {
                value: ''
            }
        }
    },
    'some.nested': {
        value: ''
    }
};

const select = '-some.nested';

const result = selectProperties(target, select);
// The result will be { some: { other: { nested: { value: '' } } } }
```

Select the properties of multiple objects.

```js
const target = [{ foo: '', bar: '' }, { foo: '', bar: '' }];
// Array of objects to select the fields of

const select = { foo: 0 };

const result = selectProperties(target, select);
// The result will be [{ bar: '' }, { bar: '' }]
```

Select using a string.

```js
const select = '-foo';
// Exclude foo
```

Select specific properties.

```js
const target = [{ foo: '', bar: '' }, { foo: '', bar: '' }];
// Array of objects to select the fields of

const select = { foo: 1 };

const result = selectProperties(target, select);
// The result will be [{ foo: '' }, { foo: '' }]
```
