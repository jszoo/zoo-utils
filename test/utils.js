/*
* utils
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.4
*/

'use strict';

var utils = require('..');
var assert = require('assert');

describe('utils', function() {

    describe('.arg2arr', function() {
        var fn = function(arg1, arg2) {
            var arr1 = utils.arg2arr(arguments);
            var arr2 = utils.arg2arr(arguments, 1);
            //
            it('argument 1 should equal', function() {
                assert.equal(arr1[0], arg1);
            });
            it('argument 2 should equal', function() {
                assert.equal(arr1[1], arg2);
            });
            //
            it('arguments array skip 1, then length should be 1', function() {
                assert.equal(arr2.length, 1);
            });
            it('arguments array skip 1, then first array item should be equal 2', function() {
                assert.equal(arr2[0], arg2);
            });
        };
        fn(1, 2);
    });

    describe('.type', function() {
        
        it('Null', function() {
            assert.equal(utils.type(null), 'null');
        });
        
        it('Undefined', function() {
            assert.equal(utils.type(undefined), 'undefined');
        });

        it('Boolean', function() {
            assert.equal(utils.type(true), 'boolean');
            assert.equal(utils.type(false), 'boolean');
            //
            assert.equal(utils.isBoolean(true), true);
            assert.equal(utils.isBoolean(false), true);
        });

        it('Number', function() {
            assert.equal(utils.type(1), 'number');
            assert.equal(utils.type(-1), 'number');
            assert.equal(utils.type(0.1), 'number');
            //
            assert.equal(utils.isNumber(1), true);
            assert.equal(utils.isNumber(-1), true);
            assert.equal(utils.isNumber(0.1), true);
        });

        it('String', function() {
            assert.equal(utils.type(''), 'string');
            assert.equal(utils.type('str'), 'string');
            //
            assert.equal(utils.isString(''), true);
            assert.equal(utils.isString('str'), true);
        });

        it('Function', function() {
            assert.equal(utils.type(function(){}), 'function');
            //
            assert.equal(utils.isFunction(function(){}), true);
        });

        it('Array', function() {
            assert.equal(utils.type([]), 'array');
            //
            assert.equal(utils.isArray([]), true);
        });

        it('Date', function() {
            assert.equal(utils.type(new Date()), 'date');
            //
            assert.equal(utils.isDate(new Date()), true);
        });

        it('RegExp', function() {
            assert.equal(utils.type(/aa/), 'regexp');
        });

        it('Object', function() {
            assert.equal(utils.type({}), 'object');
        });

        it('Error', function() {
            assert.equal(utils.type(new Error('msg')), 'error');
        });
    });

    describe('.isNumeric', function() {
        it('"123" is numeric', function() {
            assert.equal(utils.isNumeric('123'), true);
        });
    });

    describe('.isPlainObject', function() {
        it('{} is plain object', function() {
            assert.equal(utils.isPlainObject({}), true);
        });
        it('Date is not plain object', function() {
            assert.equal(utils.isPlainObject(Date()), false);
        });
    });

    describe('.hasOwn', function() {
        it('{ aa: 1 } has own "aa"', function() {
            assert.equal(utils.hasOwn({ aa: 1 }, 'aa'), true);
        });
        it('{ aa: 1 } has not own toString(prototype function)', function() {
            assert.equal(utils.hasOwn({ aa: 1 }, 'toString'), false);
        });
    });

    describe('.each', function() {
        it('Loop array', function() {
            utils.each([1, 2, 3], function(index, value) {
                assert.equal(index + 1, value);
            });
        });
        it('Loop object', function() {
            utils.each({ '1': 1, '2': 2, '3': 3 }, function(key, value) {
                assert.equal(parseInt(key, 10), value);
            });
        });
    });

    describe('.extend', function() {
        it('simple extend', function() {
            var ret = utils.extend({}, { a: 1 }, { b: 2 });
            assert.equal(ret.a, 1);
            assert.equal(ret.b, 2);
        });
        it('deep clone', function() {
            var obj1 = { a: 1 }, obj2 = { b: obj1 };
            var ret = utils.extend(true, {}, obj1, obj2);
            assert.notEqual(ret.b, obj1);
            assert.equal(ret.a, 1);
            assert.equal(ret.b.a, 1);
        });
    });

    describe('.nudeExtend', function() {
        it('not multiple source object support', function() {
            var ret = utils.nudeExtend({}, { a: 1 }, { b: 2 });
            assert.equal(ret.a, 1);
            assert.equal(ret.b, undefined);
        });
    });

    describe('.inherit', function() {
        it('sub type should instanceof true to its parent type', function() {
            var base = function() {};
            var sub = function() {};
            utils.inherit(sub, base, {});
            assert.equal(new sub() instanceof sub, true);
            assert.equal(new sub() instanceof base, true);
        });
    });

    describe('.guid', function() {
        it('default', function() {
            var id = utils.guid();
            assert.equal(utils.type(id), 'string');
            assert.equal(id.length, 32);
        });
        it('with "-" seperator', function() {
            var id = utils.guid('-');
            assert.equal(utils.type(id), 'string');
            assert.equal(id.length, 36);
        });
    });

    describe('.unique', function() {
        it('default', function() {
            var id = utils.unique();
            assert.equal(utils.type(id), 'string');
            assert.equal(id.length, 32);
        });
        it('with specified length', function() {
            var id = utils.unique(16);
            assert.equal(utils.type(id), 'string');
            assert.equal(id.length, 16);
        });
    });

    describe('.padLeft', function() {
        it('default', function() {
            var str = '123';
            var ret = utils.padLeft(str, 5, '0');
            assert.equal(ret.length, 5);
            assert.equal(ret.charAt(0), '0');
            assert.equal(ret.charAt(1), '0');
            //
            str = '12345';
            ret = utils.padLeft(str, 5, '0');
            assert.equal(ret.length, 5);
            assert.equal(ret.charAt(0), '1');
            assert.equal(ret.charAt(4), '5');
        });
    });

    describe('.padRight', function() {
        it('default', function() {
            var str = '12.';
            var ret = utils.padRight(str, 5, '0');
            assert.equal(ret.length, 5);
            assert.equal(ret.charAt(4), '0');
            assert.equal(ret.charAt(3), '0');
            //
            str = '12345';
            ret = utils.padRight(str, 5, '0');
            assert.equal(ret.length, 5);
            assert.equal(ret.charAt(0), '1');
            assert.equal(ret.charAt(4), '5');
        });
    });

    describe('.format', function() {
        it('default', function() {
            var fmt = '{0}-{1}-{2}';
            assert.equal(utils.format(fmt, 1, 2, 3), '1-2-3');
            assert.equal(utils.format(fmt, 1, 2), '1-2-');
            assert.equal(utils.format(fmt, 1), '1--');
        });
    });

    describe('.trim', function() {
        it('trim default', function() {
            assert.equal(utils.trim(' a '), 'a');
        });
        it('trim start', function() {
            assert.equal(utils.trim(' a ', { findStart: '\\s' }), 'a ');
        });
        it('trim end', function() {
            assert.equal(utils.trim(' a ', { findEnd: '\\s' }), ' a');
        });
        it('trim find', function() {
            assert.equal(utils.trim('bab', { find: 'b' }), 'a');
        });
    });

    describe('.readObj', function() {
        it('default', function() {
            assert.equal(utils.readObj({ a: { b: 1 }}, 'a.b'), 1);
        });
    });

    describe('.mapObj', function() {
        it('default', function() {
            assert.equal(utils.mapObj({}, 'a.b', 1).a.b, 1);
        })
    });

    describe('.propCount', function() {
        it('default', function() {
            assert.equal(utils.propCount({ a:1, b:2 }), 2);
        });
    });

    describe('.appendQuery', function() {
        it('default', function() {
            var url = 'www.a.com';
            url = utils.appendQuery(url, 'key', 'value');
            assert.equal(url, 'www.a.com?key=value');
            url = utils.appendQuery(url, 'key1', 'value1');
            assert.equal(url, 'www.a.com?key=value&key1=value1');
        });
        it('object data', function() {
            var url = 'www.a.com';
            url = utils.appendQuery(url, { key: 'value', key1: 'value1' });
            assert.equal(url, 'www.a.com?key=value&key1=value1');
        });
    });

    describe('.setQuery', function() {
        it('default', function() {
            var url = 'www.a.com?key=1&aa=1';
            url = utils.setQuery(url, 'key', 'value');
            assert.equal(url, 'www.a.com?key=value&aa=1');
            url = utils.setQuery(url, 'key', 'value1');
            assert.equal(url, 'www.a.com?key=value1&aa=1');
            url = utils.setQuery(url, 'key', '');
            assert.equal(url, 'www.a.com?key=&aa=1');
            url = utils.setQuery(url, 'key', null);
            assert.equal(url, 'www.a.com?aa=1');
        });
        it('ignored', function() {
            assert.equal(utils.setQuery('dddd'), 'dddd');
            assert.equal(utils.setQuery('dddd', ''), 'dddd');
        });
    });

    describe('.getQuery', function() {
        it('return string', function() {
            assert.equal(utils.getQuery('www.a.com?key=1&aa=1', 'aa'), '1');
        });
        it('return object', function() {
            var all = utils.getQuery('www.a.com?key=1&aa=1');
            assert.equal(all['key'], '1');
            assert.equal(all['aa'], '1');
        });
    });

    describe('.isAbsolute', function() {
        it('Linux/Unix/Mac', function() {
            assert.equal(utils.isAbsolute('/Users/'), true);
        });
        it('Windows', function() {
            assert.equal(utils.isAbsolute('C:\\Users'), true);
        });
        it('Microsoft Azure', function() {
            assert.equal(utils.isAbsolute('\\\\Users'), true);
        });
    });

    describe('.tryLower', function() {
        it('default', function() {
            assert.equal(utils.tryLower('AA'), 'aa');
            assert.equal(utils.tryLower({ a: 1 }).a, 1);
        });
    });

    describe('.tryLowerEqual', function() {
        it('default', function() {
            assert.equal(utils.tryLowerEqual('AbC', 'abc'), true);
            assert.equal(utils.tryLowerEqual(null, null), true);
            assert.equal(utils.tryLowerEqual(null, undefined), false);
        });
    });

    describe('.formalStr', function() {
        it('default', function() {
            assert.equal(utils.formalStr(' aAAa   '), 'aaaa');
            assert.equal(utils.formalStr(null), null);
        });
    });

    describe('.formalObj', function() {
        it('default', function() {
            assert.equal(utils.formalObj({ ' AaaA ': 1 }).aaaa, 1);
            assert.equal(utils.formalObj(null), null);
        });
    });

    describe('.defer', function() {
        it('default', function() {
            var fn = function(arg1, arg2) {
                assert.equal(arg1, 1);
                assert.equal(arg2, 2);
            };
            utils.defer(fn, 1, 2);
        });
    });

    describe('.deferProxy', function() {
        it('default', function() {
            var fn = function(arg1, arg2) {
                assert.equal(arg1, 1);
                assert.equal(arg2, 2);
            };
            var proxy = utils.deferProxy(fn);
            proxy(1, 2);
        });
    });
    
});