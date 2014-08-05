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
        it('should return array', function() {

            var arr = utils.arg2arr(arguments);
            assert.equal(Object.prototype.toString.call(arr), '[object Array]');

        });
    });
});