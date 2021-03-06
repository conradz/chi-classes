# chi-classes

[![NPM](https://nodei.co/npm/chi-classes.png?compact=true)](https://nodei.co/npm/chi-classes/)

[![Build Status](https://drone.io/github.com/conradz/chi-classes/status.png)](https://drone.io/github.com/conradz/chi-classes/latest)
[![Dependency Status](https://gemnasium.com/conradz/chi-classes.png)](https://gemnasium.com/conradz/chi-classes)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/chi-classes-test.svg)](https://saucelabs.com/u/chi-classes-test)

Easily manage CSS classes on DOM nodes.

This module uses Node.js-style modules, for best results use
[browserify](https://github.com/substack/node-browserify).


## Example

```js
var classes = require('chi-classes');

var div = document.createElement('div');

// Add some classes
classes(div).add('foo bar');

// Remove some classes
classes(div).remove('foo bar');

// Toggle classes
classes(div).toggle('selected');

// Add/remove classes depending on a boolean value
classes(div).set('selected', isSelected);

// Chaining
classes(div).add('active').remove('foo');

// Check if a node has a class
classes(div).has('foo'); // true if div has the foo class

// Check if a node has multiple classes
classes(div).has('foo bar'); // true if div has both the foo and bar classes

// Work with multiple DOM nodes
classes(a, b, c).add('foo');
classes([a, [b, c]]).add('bar');
classes(document.querySelectorAll('div')).add('i-am-a-div');
classes(a, b, c).has('foo'); // true if a, b, and c all have the foo class
```


## Reference

### `classes(...nodes)`

Creates a new wrapper object. `nodes` can be any number of DOM nodes or arrays
containing DOM nodes. It supports infinitely nested arrays and psuedo-array
values such as `NodeList` objects.

### `#add(classes)`

Adds the specified classes to all nodes. `classes` is a space-separated string
of the classes to add to the nodes.

Returns `this`, which can be used to chain methods.

### `#remove(classes)`

Removes the specified classes from all nodes. `classes` is a space-separated
string of the classes to remove from the nodes.

Returns `this`, which can be used to chain methods.

### `#toggle(classes)`

Toggles the specified classes on all nodes. If a node does not contain a class,
the class is added to the node. If the node already contains a class, the class
is removed from the node.

Returns `this`, which can be used to chain methods.

### `#set(classes, value)`

If `value` is truthy, adds the specified classes to all nodes. Otherwise it
removes the classes from all nodes.

Returns `this`, which can be used to chain methods.

### `#has(classes)`

Returns `true` if all the nodes include all the classes specified, otherwise it
returns `false`.
