'use babel';

const {
    SoMap
} = require('somap');

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

var DATA_REVERSE_ORDER = [
    ['z-key', 'z-value'],
    ['y-key', 'y-value'],
    ['x-key', 'x-value'],
    ['d-key', 'd-value'],
    ['c-key', 'c-value'],
    ['b-key', 'b-value'],
    ['a-key', 'a-value']
];

//helper
function makeMapString(data) {
    let result = 'SoMap ' + data.length;
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
function removeTestData(data, key) {
    let newData = [];
    for (let entry of data) {
        if (entry[0] != key) {
            newData.push(entry);
        }
    }
    return newData;
}

//helper
function changeTestData(data, key, value) {
    let newData = [];
    for (let entry of data) {
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
    for (let entry of DATA_INSERT_ORDER) {
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
    let testData = DATA_SORTED_ORDER;
    for (let entry of DATA_INSERT_ORDER) {
        map.delete(entry[0]);
        testData = removeTestData(testData, entry[0]);
        expect(map.toString())
            .toBe(makeMapString(testData));
    }
});

test('delete entire content in order', () => {
    let testData = DATA_SORTED_ORDER;
    for (let entry of DATA_SORTED_ORDER) {
        map.delete(entry[0]);
        testData = removeTestData(testData, entry[0]);
        expect(map.toString())
            .toBe(makeMapString(testData));
    }
});

test('delete entire content in reverse order', () => {
    let reverseOrder = DATA_SORTED_ORDER.slice(0);
    let testData = DATA_SORTED_ORDER;
    for (let entry of reverseOrder) {
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
    for (let entry of DATA_SORTED_ORDER) {
        expect(map.has(entry[0]))
            .toBeTruthy();
    }

    for (let entry of DATA_INSERT_ORDER) {
        expect(map.has(entry[0]))
            .toBeTruthy();
    }
});

test('unsuccessful has', () => {
    expect(map.has('unknown-key'))
        .toBeFalsy();
});

test('successful get', () => {
    for (let entry of DATA_SORTED_ORDER) {
        expect(map.get(entry[0]))
            .toBe(entry[1]);
    }

    for (let entry of DATA_INSERT_ORDER) {
        expect(map.get(entry[0]))
            .toBe(entry[1]);
    }
});

test('unsuccessful get', () => {
    expect(map.get('unknown-key'))
        .toBeNull();
});

test('iterating for..of map', () => {
    let i = 0;
    for (let entry of map) {
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
    let i = 0;
    for (let entry of map.entries()) {
        expect(entry[0])
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(entry[1])
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    let iterator = map.entries();
    let next = iterator.next();
    while (!next.done) {
        expect(next.value[0])
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(next.value[1])
            .toBe(DATA_SORTED_ORDER[i][1]);
        expect(next.index).toBe(i);
        expect(iterator.index()).toBe(i + 1);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
    expect(iterator.index()).toBe(map.size);

    iterator = map.entries();
    i = 0;
    while ((next = iterator.next()).index < map.size / 2) {
        i++;
    }
    expect(next.index).toBe(i);
    expect(iterator.index()).toBe(i + 1);
    iterator.return();
    expect(iterator.index()).toBe(map.size);
    expect(iterator.next().done).toBe(true);
});

test('iterating for..of map.keys()', () => {
    let i = 0;
    for (let entry of map.keys()) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i][0]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    let iterator = map.keys();
    let next = iterator.next();
    while (!next.done) {
        expect(next.value)
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(next.index).toBe(i);
        expect(iterator.index()).toBe(i + 1);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
    expect(iterator.index()).toBe(map.size);

    iterator = map.keys();
    i = 0;
    while ((next = iterator.next()).index < map.size / 2) {
        i++;
    }
    expect(next.index).toBe(i);
    expect(iterator.index()).toBe(i + 1);
    iterator.return();
    expect(iterator.index()).toBe(map.size);
    expect(iterator.next().done).toBe(true);
});

test('iterating for..of map.values()', () => {
    let i = 0;
    for (let entry of map.values()) {
        expect(entry)
            .toBe(DATA_SORTED_ORDER[i][1]);
        i++;
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);

    i = 0;
    let iterator = map.values();
    let next = iterator.next();
    while (!next.done) {
        expect(next.value)
            .toBe(DATA_SORTED_ORDER[i][1]);
        expect(next.index).toBe(i);
        expect(iterator.index()).toBe(i + 1);
        i++;
        next = iterator.next();
    }
    expect(i)
        .toBe(DATA_SORTED_ORDER.length);
    expect(iterator.index()).toBe(map.size);

    iterator = map.values();
    i = 0;
    while ((next = iterator.next()).index < map.size / 2) {
        i++;
    }
    expect(next.index).toBe(i);
    expect(iterator.index()).toBe(i + 1);
    iterator.return();
    expect(iterator.index()).toBe(map.size);
    expect(iterator.next().done).toBe(true);
});

test('forEach', () => {
    map.forEach((value, key, m, i) => {
        expect(value)
            .toBe(DATA_SORTED_ORDER[i][1]);
        expect(key)
            .toBe(DATA_SORTED_ORDER[i][0]);
        expect(m)
            .toBe(map);
    });
});

test('thisArg', function () {
    function Counter() {
        this.sum = 0;
        this.count = 0;
    }
    //providing this as a pointer to the Counter object
    function addThisArg(map, counter) {
        map.forEach(function (value, key) {
            this.sum += key;
            ++this.count;
        }, counter);
    };

    let counter = new Counter();
    addThisArg(new SoMap([
        [2, 'two'],
        [5, 'five'],
        [9, 'nine']
    ]), counter);
    expect(counter.count).toBe(3);
    expect(counter.sum).toBe(16);
});


test('construct with array', () => {
    let map = new SoMap(DATA_INSERT_ORDER);
    expect(map.toString())
        .toBe(makeMapString(DATA_SORTED_ORDER));
});

test('reverse comparator', () => {
    let reverseMap = new SoMap(DATA_INSERT_ORDER, (a, b) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });

    expect(reverseMap.toString())
        .toBe(makeMapString(DATA_REVERSE_ORDER));
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

test('different key types', () => {
    map.clear();
    map.set(1, '1-value');
    expect(() => {
        map.set('1', '1-value')
    }).toThrow();

    map.set(null, 'null value');
    expect(map.size).toEqual(1);
    expect(map.toString()).toBe('SoMap 1 { 1 => 1-value }');

    map.set(undefined, 'undefined value');
    expect(map.size).toEqual(1);
    expect(map.toString()).toBe('SoMap 1 { 1 => 1-value }');

    expect(map.get(undefined)).toBeNull();
    expect(map.get(null)).toBeNull();
});

test('create, get and remove many', () => {
    let randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let many = 10000;
    let keys = new Set();
    map.clear();

    //create
    for (let i = 0; i < many; i++) {
        let random = randomInt(0, many);
        keys.add(random);
        map.set(random, '' + random + '-value');
    }
    expect(map.size)
        .toBe(keys.size);

    //get
    keys.forEach(key => {
        expect(map.get(key))
            .toBe('' + key + '-value');
    });

    //delete
    let size = map.size;
    keys.forEach(key => {
        map.delete(key);
        expect(map.size)
            .toBe(--size);
    });
    expect(map.size)
        .toBe(0);
});