const SoMap = require('./somap');
var map = new SoMap();

var DATA_INSERT_ORDER = [
    ['x-key', 'x-value'],
    ['z-key', 'z-value'],
    ['y-key', 'y-value'],
    ['b-key', 'b-value'],
    ['a-key', 'a-value'],
    ['c-key', 'c-value'],
    ['d-key', 'd-value']
];

var DATA_SORTED_ORDER = [
    ['a-key', 'a-value'],
    ['b-key', 'b-value'],
    ['c-key', 'c-value'],
    ['d-key', 'd-value'],
    ['x-key', 'x-value'],
    ['y-key', 'y-value'],
    ['z-key', 'z-value']
];

//helper
var makeMapString = function(data) {
    var result = 'SoMap ' + data.length;
    result += ' { ';
    data.forEach((entry, i) => {
        result += entry[0] + ' => ' + entry[1];
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
var removeTestData = function(data, key) {
    var newData = [];
    for (var entry of data) {
        if (entry[0] != key) {
            newData.push(entry);
        }
    }
    return newData;
}

//helper
var changeTestData = function(data, key, value) {
    var newData = [];
    for (var entry of data) {
        if (entry[0] == key) {
            newData.push([key, value]);
        } else {
            newData.push(entry);
        }
    }
    return newData;
}

//tests

beforeEach(() => {
    for (var entry of DATA_INSERT_ORDER) {
        map.set(entry[0], entry[1]);
    }

    expect(map.toString())
        .toBe(makeMapString(DATA_SORTED_ORDER));
});

afterEach(() => {
    map.clear();
    expect(map.toString())
        .toBe(makeMapString([]));
});

//test the helper functions
test('make map string', () => {
    expect(makeMapString(DATA_SORTED_ORDER))
        .toBe('SoMap 7 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');

    expect(makeMapString(DATA_INSERT_ORDER))
        .toBe('SoMap 7 { x-key => x-value, z-key => z-value, y-key => y-value, b-key => b-value, a-key => a-value, c-key => c-value, d-key => d-value }');
});

test('remove test data', () => {
    expect(makeMapString(removeTestData(DATA_SORTED_ORDER, 'x-key')))
        .toBe('SoMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, y-key => y-value, z-key => z-value }');
});

test('change test data', () => {
    expect(makeMapString(changeTestData(DATA_SORTED_ORDER, 'x-key', 'another x value')))
        .toBe('SoMap 7 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => another x value, y-key => y-value, z-key => z-value }');
});

//test the functions
test('species', () => {
    expect(map instanceof SoMap)
        .toBeTruthy();
});

test('delete root x', () => {
    map.delete('x-key');

    expect(map.toString())
        .toBe(makeMapString(removeTestData(DATA_SORTED_ORDER, 'x-key')));
});

test('delete y', () => {
    map.delete('y-key');
    expect(map.toString())
        .toBe(makeMapString(removeTestData(DATA_SORTED_ORDER, 'y-key')));
});

test('delete root x, then y which would be the new root', () => {
    map.delete('x-key');
    map.delete('y-key');
    expect(map.toString())
        .toBe(makeMapString(removeTestData(removeTestData(DATA_SORTED_ORDER, 'x-key'), 'y-key')));
});

test('delete min key a', () => {
    map.delete('a-key');
    expect(map.toString())
        .toBe(makeMapString(removeTestData(DATA_SORTED_ORDER, 'a-key')));
});

test('delete max key z', () => {
    map.delete('z-key');
    expect(map.toString())
        .toBe(makeMapString(removeTestData(DATA_SORTED_ORDER, 'z-key')));
});

test('delete unknown key', () => {
    map.delete('unknown-key');
    expect(map.toString())
        .toBe(makeMapString(removeTestData(DATA_SORTED_ORDER, 'unknown-key')));
});

test('delete entire content in order of insertion', () => {
    var testData = DATA_SORTED_ORDER;
    for (var entry of DATA_INSERT_ORDER) {
        map.delete(entry[0]);
        testData = removeTestData(testData, entry[0]);
        expect(map.toString())
            .toBe(makeMapString(testData));
    }
});

test('delete entire content in order', () => {
    var testData = DATA_SORTED_ORDER;
    for (var entry of DATA_SORTED_ORDER) {
        map.delete(entry[0]);
        testData = removeTestData(testData, entry[0]);
        expect(map.toString())
            .toBe(makeMapString(testData));
    }
});

test('delete entire content in reverse order', () => {
    var reverseOrder = DATA_SORTED_ORDER.slice(0);
    var testData = DATA_SORTED_ORDER;
    for (var entry of reverseOrder) {
        map.delete(entry[0]);
        testData = removeTestData(testData, entry[0]);
        expect(map.toString())
            .toBe(makeMapString(testData));
    }
});

test('double assign a', () => {
    map.set('a-key', 'new a value');
    expect(map.toString())
        .toBe(makeMapString(changeTestData(DATA_SORTED_ORDER, 'a-key', 'new a value')));
    map.set('a-key', 'a-value');
    expect(map.toString())
        .toBe(makeMapString(DATA_SORTED_ORDER));
});

test('successful has', () => {
    for (var entry of DATA_SORTED_ORDER) {
        expect(map.has(entry[0]))
            .toBeTruthy();
    }

    for (var entry of DATA_INSERT_ORDER) {
        expect(map.has(entry[0]))
            .toBeTruthy();
    }
});

test('unsuccessful has', () => {
    expect(map.has('unknown-key'))
        .toBeFalsy();
});

test('successful get', () => {
    for (var entry of DATA_SORTED_ORDER) {
        expect(map.get(entry[0]))
            .toBe(entry[1]);
    }

    for (var entry of DATA_INSERT_ORDER) {
        expect(map.get(entry[0]))
            .toBe(entry[1]);
    }
});

test('unsuccessful get', () => {
    expect(map.get('unknown-key'))
        .toBeNull();
});

test('iterating for..of map', () => {
    var i = 0;
    for (var entry of map) {
        expect(entry[0])
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(entry[1])
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
});

test('iterating for..of map.entries()', () => {
    var i = 0;
    for (var entry of map.entries()) {
        expect(entry[0])
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(entry[1])
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    var iterator = map.entries();
    var next = iterator.next();
    while (!next.done) {
        expect(next.value[0])
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(next.value[1])
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

});

test('iterating for..of map.keys()', () => {
    var i = 0;
    for (var entry of map.keys()) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i][0]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    var iterator = map.keys();
    var next = iterator.next();
    while (!next.done) {
        expect(next.value)
            .toBe(DATA_SORTED_ORDER[i][0]);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

});

test('iterating for..of map.values()', () => {
    var i = 0;
    for (var entry of map.values()) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    var iterator = map.values();
    var next = iterator.next();
    while (!next.done) {
        expect(next.value)
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
});

test('construct with array', () => {
    var map = new SoMap(DATA_INSERT_ORDER);
    expect(map.toString())
        .toBe(makeMapString(DATA_SORTED_ORDER));
});

test('create, get and remove many', () => {
    var randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var many = 10000;
    var keys = new Set();
    map.clear();

    //create
    for (var i = 0; i < many; i++) {
        var random = randomInt(0, many);
        keys.add(random);
        map.set(random, '' + random + '-value');
    }
    console.log('created ' + keys.size + ' entries');
    expect(map.size)
        .toBe(keys.size);

    //get
    keys.forEach(key => {
        expect(map.get(key))
            .toBe('' + key + '-value');
    });

    //delete
    var size = map.size;
    keys.forEach(key => {
        map.delete(key);
        expect(map.size)
            .toBe(--size);
    });
    expect(map.size)
        .toBe(0);
});

test('is empty', () => {
    expect(map.size > 0)
        .toBeTruthy();
    expect(map.isEmpty())
        .toBeFalsy();

    map.clear();

    expect(map.size == 0)
        .toBeTruthy();
    expect(map.isEmpty())
        .toBeTruthy();
});

test('min', () => {
    expect(map.min())
        .toEqual({
            key: 'a-key',
            value: 'a-value'
        });

    map.clear();

    expect(map.min())
        .toBeNull();
});

test('max', () => {
    expect(map.max())
        .toEqual({
            key: 'z-key',
            value: 'z-value'
        });

    map.clear();

    expect(map.max())
        .toBeNull();
});