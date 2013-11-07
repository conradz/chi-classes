'use strict';

var test = require('tape'),
    classes = require('./'),
    document = window.document;

test('add', function(t) {

    t.test('add class', function(t) {
        var node = document.createElement('div');
        classes(node).add('test');

        t.equal(node.className, 'test');
        t.end();
    });


    t.test('ignore existing classes', function(t) {
        var node = document.createElement('div');
        node.className = 'foo';
        classes(node).add('foo');

        t.equal(node.className, 'foo');
        t.end();
    });

    t.test('multiple classes', function(t) {
        var node = document.createElement('div');
        classes(node).add('foo bar');

        t.equal(node.className, 'foo bar');
        t.end();
    });

    t.test('ignore existing classes', function(t) {
        var node = document.createElement('div');
        node.className = 'foo baz';
        classes(node).add('foo bar');

        t.equal(node.className, 'baz foo bar');
        t.end();
    });

    t.end();
});

test('remove', function(t) {

    t.test('remove class', function(t) {
        var node = document.createElement('div');
        node.className = 'foo bar';
        classes(node).remove('foo');

        t.equal(node.className, 'bar');
        t.end();
    });

    t.test('ignore missing classes', function(t) {
        var node = document.createElement('div');
        node.className = 'foo';
        classes(node).remove('bar');

        t.equal(node.className, 'foo');
        t.end();
    });

    t.test('multiple classes', function(t) {
        var node = document.createElement('div');
        node.className = 'foo bar baz';
        classes(node).remove('foo baz');

        t.equal(node.className, 'bar');
        t.end();
    });

    t.end();
});

test('toggle', function(t) {

    t.test('add missing class', function(t) {
        var node = document.createElement('div');
        classes(node).toggle('foo');

        t.equal(node.className, 'foo');
        t.end();
    });

    t.test('remove existing class', function(t) {
        var node = document.createElement('div');
        node.className = 'foo';
        classes(node).toggle('foo');

        t.equal(node.className, '');
        t.end();
    });

    t.test('multiple classes', function(t) {
        var node = document.createElement('div');
        node.className = 'foo bar';
        classes(node).toggle('foo baz');

        t.equal(node.className, 'bar baz');
        t.end();
    });

    t.end();
});

test('set', function(t) {

    t.test('add classes when value is true', function(t) {
        var node = document.createElement('div');
        node.className = 'foo';
        classes(node).set('foo bar', true);

        t.equal(node.className, 'foo bar');
        t.end();
    });

    t.test('remove classes when value is false', function(t) {
        var node = document.createElement('div');
        node.className = 'bar baz';
        classes(node).set('foo bar', false);

        t.equal(node.className, 'baz');
        t.end();
    });

    t.end();
});

test('has', function(t) {

    t.test('check if node includes class', function(t) {
        var node = document.createElement('div');
        node.className = 'foo';

        t.ok(classes(node).has('foo'));
        t.notOk(classes(node).has('bar'));
        t.end();
    });

    t.test('multiple nodes', function(t) {
        var a = document.createElement('div'),
            b = document.createElement('div');
        a.className = 'bar';
        b.className = 'foo bar';

        t.ok(classes(a, b).has('bar'));
        t.notOk(classes(a, b).has('foo'));
        t.notOk(classes(a, b).has('baz'));
        t.end();
    });

    t.end();

});

test('chain multiple actions', function(t) {
    var node = document.createElement('div');
    node.className = 'foo bar';
    classes(node)
        .add('baz')
        .remove('bar')
        .toggle('test');

    t.equal(node.className, 'foo baz test');
    t.end();
});

test('use multiple nodes', function(t) {
    var a = document.createElement('div'),
        b = document.createElement('div'),
        c = document.createElement('div'),
        nodes = [a, [b, c]];
    a.className = 'foo';
    b.className = 'bar';
    c.className = 'baz';
    classes(nodes).add('foo').remove('bar');

    t.equal(a.className, 'foo');
    t.equal(b.className, 'foo');
    t.equal(c.className, 'baz foo');
    t.end();
});

test('psuedo-array values', function(t) {
    var a = document.createElement('div'),
        b = document.createElement('div'),
        c = document.createElement('div');
    a.appendChild(b);
    a.appendChild(c);
    classes(a.querySelectorAll('div')).add('foo');

    t.equal(b.className, 'foo');
    t.equal(c.className, 'foo');
    t.end();
});
