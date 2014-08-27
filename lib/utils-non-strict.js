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
            if (utils.hasOwn(overrides, k)) {
                subc.prototype[k] = overrides[k];
            }
        }
    }
    //
    if (utils.hasOwn(subc.prototype, 'inherited')) {
        throw new Error('Prototype "inherited" is reserved');
    }
    if (!superc.$parents) {
        subc.$parents = [superc];
    } else {
        subc.$parents = superc.$parents.concat([superc]);
    }
    for (k in superc.prototype) {
        if (utils.isFunction(superc.prototype[k])) {
            superc.prototype[k].$name = k;
        }
    }
    for (k in subc.prototype) {
        if (utils.isFunction(subc.prototype[k])) {
            subc.prototype[k].$name = k;
        }
    }
    subc.prototype.inherited = function () {
        var indexs = this.$indexs || (this.$indexs = {});
        var name = subc.prototype.inherited.caller.$name;
        var func, iname = iname = '$' + name;
        //
        if (indexs[iname] === 0 || !subc.$parents) {
            throw new Error('Parent class not found');
        }
        if (indexs[iname] === undefined) {
            indexs[iname] = subc.$parents.length;
        }
        while (indexs[iname] > 0) {
            indexs[iname]--;
            var parent = subc.$parents[indexs[iname]];
            if (utils.hasOwn(parent.prototype, name)) {
                func = parent.prototype[name];
                break;
            }
        }
        if (!utils.isFunction(func)) {
            indexs[iname] = undefined;
            throw new Error(utils.format('Parent function "{0}" not found', name));
        }
        var ret = func.apply(this, arguments);
        if (indexs[iname] === 0) {
            indexs[iname] = undefined;
        }
        return ret;
    };
};

// export
module.exports = utils;
