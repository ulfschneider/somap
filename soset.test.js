const {
    SoSet
} = require('somap');
var set = new SoSet();

var DATA_INSERT_ORDER = [
    'x-value',
    'z-value',
    'y-value',
    'b-value',
    'a-value',
    'c-value',
    'd-value'
];

var DATA_SORTED_ORDER = [
    'a-value',
    'b-value',
    'c-value',
    'd-value',
    'x-value',
    'y-value',
    'z-value'
];

var DATA_REVERSE_ORDER = [
    'z-value',
    'y-value',
    'x-value',
    'd-value',
    'c-value',
    'b-value',
    'a-value'
];

//helper
var makeSetString = function(data) {
    var result = 'SoSet ' + data.length;
    result += ' { ';
    data.forEach((entry, i) => {
        result += entry;
        if (i < data.length - 1) {
            result += ', ';
        } else {
            result += ' ';
        }
    });
    result += '}';
    return result;
}

//helper
var removeTestData = function(data, value) {
    var newData = [];
    for (var entry of data) {
        if (entry != value) {
            newData.push(entry);
        }
    }
    return newData;
}


//tests

beforeEach(() => {
    for (var entry of DATA_INSERT_ORDER) {
        set.add(entry);
    }

    expect(set.toString())
        .toBe(makeSetString(DATA_SORTED_ORDER));
});

afterEach(() => {
    set.clear();
    expect(set.toString())
        .toBe(makeSetString([]));
});

//test the helper functions
test('make set string', () => {
    expect(makeSetString(DATA_SORTED_ORDER))
        .toBe('SoSet 7 { a-value, b-value, c-value, d-value, x-value, y-value, z-value }');

    expect(makeSetString(DATA_INSERT_ORDER))
        .toBe('SoSet 7 { x-value, z-value, y-value, b-value, a-value, c-value, d-value }');
});

test('remove test data', () => {
    expect(makeSetString(removeTestData(DATA_SORTED_ORDER, 'x-value')))
        .toBe('SoSet 6 { a-value, b-value, c-value, d-value, y-value, z-value }');
});


//test the functions
test('species', () => {
    expect(set instanceof SoSet)
        .toBeTruthy();
});

test('delete root x', () => {
    set.delete('x-value');

    expect(set.toString())
        .toBe(makeSetString(removeTestData(DATA_SORTED_ORDER, 'x-value')));
});

test('delete y', () => {
    set.delete('y-value');
    expect(set.toString())
        .toBe(makeSetString(removeTestData(DATA_SORTED_ORDER, 'y-value')));
});

test('delete root x, then y which would be the new root', () => {
    set.delete('x-value');
    set.delete('y-value');
    expect(set.toString())
        .toBe(makeSetString(removeTestData(removeTestData(DATA_SORTED_ORDER, 'x-value'), 'y-value')));
});

test('delete min value a', () => {
    set.delete('a-value');
    expect(set.toString())
        .toBe(makeSetString(removeTestData(DATA_SORTED_ORDER, 'a-value')));
});

test('delete max value z', () => {
    set.delete('z-value');
    expect(set.toString())
        .toBe(makeSetString(removeTestData(DATA_SORTED_ORDER, 'z-value')));
});

test('delete unknown value', () => {
    set.delete('unknown-value');
    expect(set.toString())
        .toBe(makeSetString(removeTestData(DATA_SORTED_ORDER, 'unknown-value')));
});

test('delete entire content in order of insertion', () => {
    var testData = DATA_SORTED_ORDER;
    for (var entry of DATA_INSERT_ORDER) {
        set.delete(entry);
        testData = removeTestData(testData, entry);
        expect(set.toString())
            .toBe(makeSetString(testData));
    }
});

test('delete entire content in order', () => {
    var testData = DATA_SORTED_ORDER;
    for (var entry of DATA_SORTED_ORDER) {
        set.delete(entry);
        testData = removeTestData(testData, entry);
        expect(set.toString())
            .toBe(makeSetString(testData));
    }
});

test('delete entire content in reverse order', () => {
    var reverseOrder = DATA_SORTED_ORDER.slice(0);
    var testData = DATA_SORTED_ORDER;
    for (var entry of reverseOrder) {
        set.delete(entry);
        testData = removeTestData(testData, entry);
        expect(set.toString())
            .toBe(makeSetString(testData));
    }
});

test('double assign a', () => {
    set.add('a-value');
    expect(set.toString())
        .toBe(makeSetString(DATA_SORTED_ORDER));
});

test('successful has', () => {
    for (var entry of DATA_SORTED_ORDER) {
        expect(set.has(entry))
            .toBeTruthy();
    }

    for (var entry of DATA_INSERT_ORDER) {
        expect(set.has(entry))
            .toBeTruthy();
    }
});

test('unsuccessful has', () => {
    expect(set.has('unknown-value'))
        .toBeFalsy();
});

test('iterating for..of set', () => {
    var i = 0;
    for (var entry of set) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
});

test('iterating for..of set.entries()', () => {
    var i = 0;
    for (var entry of set.entries()) {
        expect(entry[0])
            .toBe(DATA_SORTED_ORDER[i]);
        expect(entry[1])
            .toBe(DATA_SORTED_ORDER[i]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    var iterator = set.entries();
    var next = iterator.next();
    while (!next.done) {
        expect(next.value[0])
            .toBe(DATA_SORTED_ORDER[i]);
        expect(next.value[1])
            .toBe(DATA_SORTED_ORDER[i]);
        expect(next.index).toBe(i);
        expect(iterator.index()).toBe(i + 1);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
    expect(iterator.index()).toBe(set.size);

    iterator = set.entries();
    i = 0;
    while ((next = iterator.next()).index < set.size / 2) {
        i++;
    }
    expect(next.index).toBe(i);
    expect(iterator.index()).toBe(i + 1);
    iterator.return();
    expect(iterator.index()).toBe(set.size);
    expect(iterator.next().done).toBe(true);
});

test('iterating for..of set.values()', () => {
    var i = 0;
    for (var entry of set.values()) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    var iterator = set.values();
    var next = iterator.next();
    while (!next.done) {
        expect(next.value)
            .toBe(DATA_SORTED_ORDER[i]);
        expect(next.index).toBe(i);
        expect(iterator.index()).toBe(i + 1);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
    expect(iterator.index()).toBe(set.size);

    iterator = set.values();
    i = 0;
    while ((next = iterator.next()).index < set.size / 2) {
        i++;
    }
    expect(next.index).toBe(i);
    expect(iterator.index()).toBe(i + 1);
    iterator.return();
    expect(iterator.index()).toBe(set.size);
    expect(iterator.next().done).toBe(true);
});


test('forEach', () => {
    set.forEach((value, key, s, i) => {
        expect(value)
            .toBe(DATA_SORTED_ORDER[i]);
        expect(key)
            .toBe(DATA_SORTED_ORDER[i]);
        expect(s)
            .toBe(set);
    });
});

test('thisArg', function() {
    function Counter() {
        this.sum = 0;
        this.count = 0;
    }
    //providing this as a pointer to the Counter object
    function addThisArg(map, counter) {
        map.forEach(function(value, key) {
            this.sum += key;
            ++this.count;
        }, counter);
    };

    var counter = new Counter();
    addThisArg(new SoSet([2, 5, 9, ]), counter);
    expect(counter.count).toBe(3);
    expect(counter.sum).toBe(16);
});


test('construct with array', () => {
    var map = new SoSet(DATA_INSERT_ORDER);
    expect(set.toString())
        .toBe(makeSetString(DATA_SORTED_ORDER));
});

test('reverse comparator', () => {
    var reverseSet = new SoSet(DATA_INSERT_ORDER, (a, b) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });

    expect(reverseSet.toString())
        .toBe(makeSetString(DATA_REVERSE_ORDER));
});

test('is empty', () => {
    expect(set.size > 0)
        .toBeTruthy();
    expect(set.isEmpty())
        .toBeFalsy();

    set.clear();

    expect(set.size == 0)
        .toBeTruthy();
    expect(set.isEmpty())
        .toBeTruthy();
});

test('min', () => {
    expect(set.min())
        .toBe('a-value');

    set.clear();

    expect(set.min())
        .toBeNull();
});

test('max', () => {
    expect(set.max())
        .toBe('z-value');

    set.clear();

    expect(set.max())
        .toBeNull();
});