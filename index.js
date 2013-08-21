var CLASS_SEP = /\s+/g;

function iterate(value, action, data) {
    // Check for psuedo-array objects
    if (value && typeof value.length === 'number') {
        for (var i = 0; i < value.length; i++) {
            if (iterate(value[i], action, data) === false) {
                // Break loop on explicit false return
                return false;
            }
        }
    } else {
        return action(value, data);
    }
}

function split(input) {
    if (!input) {
        return [];
    }

    return input.split(CLASS_SEP);
}

function add(node, classes) {
    var existing = split(node.className),
        modified = false;

    for (var i = 0; i < classes.length; i++) {
        var c = classes[i];
        if (existing.indexOf(c) === -1) {
            existing.push(c);
            modified = true;
        }
    }

    if (modified) {
        node.className = existing.join(' ');
    }
}

function remove(node, classes) {
    var existing = split(node.className),
        modified = false;

    for (var i = 0; i < classes.length; i++) {
        var c = classes[i],
            index;

        while ((index = existing.indexOf(c)) !== -1) {
            existing.splice(index, 1);
            modified = true;
        }
    }

    if (modified) {
        node.className = existing.join(' ');
    }
}

function toggle(node, classes) {
    var existing = split(node.className);

    for (var i = 0; i < classes.length; i++) {
        var c = classes[i],
            index = existing.indexOf(c);

        if (index === -1) {
            existing.push(c);
        } else {
            do {
                existing.splice(i, 1);
                index = existing.indexOf(c);
            } while (index !== -1);
        }
    }

    node.className = existing.join(' ');
}

function has(node, classes) {
    var existing = split(node.className);

    for (var i = 0; i < classes.length; i++) {
        if (existing.indexOf(classes[i]) === -1) {
            return false;
        }
    }
}

function ClassList(nodes) {
    this.nodes = nodes;
}

ClassList.prototype.add = function(classes) {
    classes = split(classes);
    iterate(this.nodes, add, classes);

    return this;
};

ClassList.prototype.remove = function(classes) {
    classes = split(classes);
    iterate(this.nodes, remove, classes);

    return this;
};

ClassList.prototype.toggle = function(classes) {
    classes = split(classes);
    iterate(this.nodes, toggle, classes);

    return this;
};

ClassList.prototype.has = function(classes) {
    classes = split(classes);
    return iterate(this.nodes, has, classes) !== false;
};

var slice = Array.prototype.slice;
function classList() {
    var nodes = slice.call(arguments);
    return new ClassList(nodes);
}

module.exports = classList;