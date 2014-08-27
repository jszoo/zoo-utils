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
        var base = function() { };
        base.prototype.constructor = base;
        base.prototype.func1 = function(num) { return num + 1; };
        base.prototype.func2 = function(num) { return num + 1; };
        base.prototype.func3 = function(num) { return num + 1;};
        //
        var sub1 = function() { this.inherited(); };
        utils.inherit(sub1, base, {
            func1: function(num) { return this.inherited.apply(this, arguments); },
            func2: function(num) { return this.inherited(num + 1); },
            func3: function(num) { return this.inherited(num + 1); }
        });
        //
        var sub2 = function() { this.inherited(); };
        utils.inherit(sub2, sub1, {
            func3: function(num) { return this.inherited(num + 1); }
        });
        //
        it('sub type should instanceof true to its parent type', function() {
            assert.equal(new sub1() instanceof base, true);
            assert.equal(new sub2() instanceof base, true);
        });
        it('test api inherited 1', function() {
            assert.equal((new sub1()).func1(0), 1);
        });
        it('test api inherited 2', function() {
            assert.equal((new sub1()).func2(0), 2);
        });
        it('test api inherited 3', function() {
            assert.equal((new sub2()).func3(0), 3);
        });
    });

});