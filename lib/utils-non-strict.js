/*
* utils-non-strict
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.4
*/

//'use strict';

var utils = require('./utils-use-strict');

utils.inherit = function(subc, superc, overrides) {
    var F = function() { }, i;
    F.prototype = superc.prototype;
    subc.prototype = new F();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
    }
    if (overrides) {
        for (i in overrides) {
            if (utils.hasOwn(overrides, i)) {
                subc.prototype[i] = overrides[i];
            }
        }
    }
    if (subc.prototype.inherited) {
        throw new Error('Prototype "inherited" is reserved');
    }
    for (var k in subc.prototype) {
        if (utils.isFunction(subc.prototype[k])) {
            subc.prototype[k].$name = k;
        }
    }
    subc.prototype.inherited = function(name, args) {
        if (!utils.isString(name)) {
            args = name;
            name = subc.prototype.inherited.caller.$name;
        }
        var func = subc.superclass[name];
        if (utils.isFunction(func)) {
            return func.apply(this, args);
        }
    };
};

// export
module.exports = utils;
