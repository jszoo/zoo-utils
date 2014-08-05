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
    describe('#arg2arr', function() {
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
        };
        fn(1, 2);
    });
});