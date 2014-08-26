/*
* utils-non-strict
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.26
*/

//'use strict';

var utils = require('..');
var assert = require('assert');

describe('utils-non-strict', function() {

    describe('.inherit', function() {
        var base = function() {};
        base.prototype.constructor = base;
        base.prototype.func1 = function(num) { return num; };
        base.prototype.func2 = function(num) { return num; };
        //
        var sub = function() {};
        utils.inherit(sub, base, {
            func1: function(num) { return this.inherited(arguments); },
            func2: function(num) { return this.inherited([num]); },
            func3: function(num) { return this.inherited('func2', [num]); }
        });
        //
        it('sub type should instanceof true to its parent type', function() {
            assert.equal(new sub() instanceof sub, true);
            assert.equal(new sub() instanceof base, true);
        });
        it('test api inherited 1', function() {
            assert.equal((new sub()).func1(1), 1);
        });
        it('test api inherited 2', function() {
            assert.equal((new sub()).func2(1), 1);
        });
        it('test api inherited 3', function() {
            var f = (new sub()).func3;
            assert.equal(typeof f, 'function');
        });
    });

});