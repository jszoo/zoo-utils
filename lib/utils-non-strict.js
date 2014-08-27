/*
* utils-non-strict
* author: ruleechen
* contact: rulee@live.cn
* create date: 2014.8.4
*/

//'use strict';

var utils = require('./utils-use-strict');

utils.inherit = function(subc, superc, overrides) {
    var F = function() { }, k;
    F.prototype = superc.prototype;
    subc.prototype = new F();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
    }
    if (overrides) {
        for (k in overrides) {
            if (k === 'inherited') {
                throw new Error('Prototype "inherited" is reserved');
            }
            if (utils.hasOwn(overrides, k)) {
                subc.prototype[k] = overrides[k];
            }
        }
    }
    //
    if (!superc.$parents) {
        subc.$parents = [superc];
    } else {
        subc.$parents = superc.$parents.concat([superc]);
    }
    for (k in subc.prototype) {
        if (utils.isFunction(subc.prototype[k])) {
            subc.prototype[k].$name = k;
        }
    }
    subc.prototype.inherited = function () {
        if (!subc.$parents) {
            throw new Error('Parent class not found');
        }
        var caller = subc.prototype.inherited.caller;
        if (caller.$index === undefined) {
            caller.$index = subc.$parents.length;
        }
        var func, name = caller.$name;
        while (caller.$index > 0) {
            caller.$index--;
            var parent = subc.$parents[caller.$index];
            if (utils.hasOwn(parent.prototype, name)) {
                func = parent.prototype[name];
                break;
            }
        }
        if (caller.$index === 0) {
            caller.$index = undefined;
        }
        if (!utils.isFunction(func)) {
            caller.$index = undefined;
            throw new Error(utils.format('Parent function "{0}" not found', name));
        } else {
            return func.apply(this, arguments);
        }
    };
};

// export
module.exports = utils;
