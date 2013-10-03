var union = require('mout/array/union'),
    difference = require('mout/array/difference'),
    xor = require('mout/array/xor'),
    every = require('mout/array/every'),
    contains = require('mout/array/contains'),
    forEach = require('mout/array/forEach'),
    flatten = require('flatten-list');

var CLASS_SEP = /\s+/g;

function split(input) {
    return input ? input.split(CLASS_SEP) : [];
}

function modifier(action) {
    function modify(node) {
        var existing = split(node.className);
        node.className = action(existing, this).join(' ');
    }

    return function(classes) {
        classes = split(classes);
        forEach(this.nodes, modify, classes);

        return this;
    };
}

function ClassList(nodes) {
    this.nodes = nodes;
}

ClassList.prototype.add = modifier(union);
ClassList.prototype.remove = modifier(difference);
ClassList.prototype.toggle = modifier(xor);

ClassList.prototype.has = function(classes) {
    classes = split(classes);

    return every(this.nodes, function(node) {
        var existing = split(node.className);
        return every(classes, function(c) { return contains(existing, c); });
    });
};

function classList() {
    return new ClassList(flatten(arguments));
}

module.exports = classList;
