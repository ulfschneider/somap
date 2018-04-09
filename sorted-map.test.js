const SortedMap = require('./sorted-map');
var map = new SortedMap();

beforeEach(() => {
    map.set('x-key', 'x-value');
    map.set('z-key', 'z-value');
    map.set('y-key', 'y-value');
    map.set('b-key', 'b-value');
    map.set('a-key', 'a-value');
    map.set('c-key', 'c-value');
    map.set('d-key', 'd-value');

    expect(map.toString()).toBe('SortedMap 7 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
});

afterEach(() => {
    map.clear();
    expect(map.toString()).toBe('SortedMap 0 { }');
});

test('delete root x', () => {
    map.delete('x-key');
    expect(map.toString()).toBe('SortedMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, y-key => y-value, z-key => z-value }');
});

test('delete y', () => {
    map.delete('y-key');
    expect(map.toString()).toBe('SortedMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, z-key => z-value }');
});

test('delete root x, then y which would be the new root', () => {
    map.delete('x-key');
    map.delete('y-key');
    expect(map.toString()).toBe('SortedMap 5 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, z-key => z-value }');
});

test('delete min key a', () => {
    map.delete('a-key');
    expect(map.toString()).toBe('SortedMap 6 { b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
});

test('delete max key z', () => {
    map.delete('z-key');
    expect(map.toString()).toBe('SortedMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value }');
});

test('delete unknown key', () => {
    map.delete('unknown-key');
    expect(map.toString()).toBe('SortedMap 7 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
});

test('delete entire content in order of insertion', () => {
    map.delete('x-key');
    expect(map.toString()).toBe('SortedMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, y-key => y-value, z-key => z-value }');
    map.delete('z-key');
    expect(map.toString()).toBe('SortedMap 5 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, y-key => y-value }');
    map.delete('y-key');
    expect(map.toString()).toBe('SortedMap 4 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value }');
    map.delete('b-key');
    expect(map.toString()).toBe('SortedMap 3 { a-key => a-value, c-key => c-value, d-key => d-value }');
    map.delete('a-key');
    expect(map.toString()).toBe('SortedMap 2 { c-key => c-value, d-key => d-value }');
    map.delete('c-key');
    expect(map.toString()).toBe('SortedMap 1 { d-key => d-value }');
    map.delete('d-key');
    expect(map.toString()).toBe('SortedMap 0 { }');
});

test('delete entire content in order', () => {
    map.delete('a-key');
    expect(map.toString()).toBe('SortedMap 6 { b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
    map.delete('b-key');
    expect(map.toString()).toBe('SortedMap 5 { c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
    map.delete('c-key');
    expect(map.toString()).toBe('SortedMap 4 { d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
    map.delete('d-key');
    expect(map.toString()).toBe('SortedMap 3 { x-key => x-value, y-key => y-value, z-key => z-value }');
    map.delete('x-key');
    expect(map.toString()).toBe('SortedMap 2 { y-key => y-value, z-key => z-value }');
    map.delete('y-key');
    expect(map.toString()).toBe('SortedMap 1 { z-key => z-value }');
    map.delete('z-key');
    expect(map.toString()).toBe('SortedMap 0 { }');
});

test('delete entire content in reverse order', () => {
    map.delete('z-key');
    expect(map.toString()).toBe('SortedMap 6 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value }');
    map.delete('y-key');
    expect(map.toString()).toBe('SortedMap 5 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value }');
    map.delete('x-key');
    expect(map.toString()).toBe('SortedMap 4 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value }');
    map.delete('d-key');
    expect(map.toString()).toBe('SortedMap 3 { a-key => a-value, b-key => b-value, c-key => c-value }');
    map.delete('c-key');
    expect(map.toString()).toBe('SortedMap 2 { a-key => a-value, b-key => b-value }');
    map.delete('b-key');
    expect(map.toString()).toBe('SortedMap 1 { a-key => a-value }');
    map.delete('a-key');
    expect(map.toString()).toBe('SortedMap 0 { }');
});

test('double assign a', () => {
    map.set('a-key', 'new a value');
    expect(map.toString()).toBe('SortedMap 7 { a-key => new a value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
    map.set('a-key', 'a-value');
    expect(map.toString()).toBe('SortedMap 7 { a-key => a-value, b-key => b-value, c-key => c-value, d-key => d-value, x-key => x-value, y-key => y-value, z-key => z-value }');
});

test('successful has', () => {
    expect(map.has('a-key')).toBeTruthy();
    expect(map.has('b-key')).toBeTruthy();
    expect(map.has('c-key')).toBeTruthy();
    expect(map.has('d-key')).toBeTruthy();
    expect(map.has('x-key')).toBeTruthy();
    expect(map.has('y-key')).toBeTruthy();
    expect(map.has('z-key')).toBeTruthy();
});

test('unsuccessful has', () => {
    expect(map.has('unknown-key')).toBeFalsy();
});

test('successful get', () => {
    expect(map.get('a-key')).toBe('a-value');
    expect(map.get('b-key')).toBe('b-value');
    expect(map.get('c-key')).toBe('c-value');
    expect(map.get('d-key')).toBe('d-value');
    expect(map.get('x-key')).toBe('x-value');
    expect(map.get('y-key')).toBe('y-value');
    expect(map.get('z-key')).toBe('z-value');
});

test('unsuccessful get', () => {
    expect(map.get('unknown-key')).toBeNull();
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
    expect(map.size).toBe(keys.size);

    //get
    keys.forEach(key => {
        expect(map.get(key)).toBe('' + key + '-value');
    });

    //delete
    var size = map.size;
    keys.forEach(key => {
        map.delete(key);
        expect(map.size).toBe(--size);
    });
    expect(map.size).toBe(0);
});