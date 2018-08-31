## A sorted SoMap and a sorted set, implemented as a binary tree

### Construct a Sorted SoMap

Construct with <code>new SoMap([iterable], [comparator])</code> which will be sorted by the keys of the key-value pairs.

<code>iterable</code> - optional
An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]). Each key-value pair is added to the new Map; null values are treated as undefined.

<code>comparator</code> - optional
Specifies a function that defines the sort order of the keys. If omitted, the contents are sorted according by natural order of the keys.

If a and b are two elements being compared, then:

If <code>comparator(a, b)</code> is less than 0, sort a to an index lower than b, i.e. a comes first.
If <code>comparator(a, b)</code> returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. 
If <code>comparator(a, b)</code> is greater than 0, sort b to an index lower than a, i.e. b comes first.
<code>comparator(a, b)</code> must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined.

### Sorted Map API

<code>Map.prototype.size</code>
Returns the number of key/value pairs in the SoMap object.

<code>SoMap.prototype.clear()</code>
Removes all key/value pairs from the SoMap object.

<code>SoMap.prototype.delete(key)</code>
Returns true if an element in the SoMap object existed and has been removed, or false if the element does not exist. SoMap.prototype.has(key) will return false afterwards.

<code>SoMap.prototype.entries()</code>
Returns a new Iterator object that contains an array of [key, value] for each element in the SoMap object in defined order.

<code>SoMap.prototype.forEach(callbackFn[, thisArg])</code>
Calls callbackFn once for each key-value pair present in the SoMap object, in defined order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.

<code>SoMap.prototype.get(key)</code>
Returns the value associated to the key, or null if there is none.

<code>SoMap.prototype.has(key)</code>
Returns a boolean asserting whether a value has been associated to the key in the SoMap object or not.

<code>SoMap.prototype.keys()</code>
Returns a new Iterator object that contains the keys for each element in the SoMap object in defined order.

<code>SoMap.prototype.set(key, value)</code>
SoSets the value for the key in the SoMap object. Returns the SoMap object.

<code>SoMap.prototype.values()</code>
Returns a new Iterator object that contains the values for each element in the SoMap object in defined order.

<code>SoMap.prototype[@@iterator] ()</code>
Returns a new Iterator object that contains an array of [key, value] for each element in the SoMap object in defined order.

<code>SoMap.prototype.min()</code>
Returns the minimum key-value pair of the SoMap object

<code>SoMap.prototype.max()</code>
Returns the maximum key-value of the SoMap object

### Construct a Sorted Set

Construct with <code>new SoSet([iterable], [comparator])</code>

<code>iterable</code> - optional
An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]). Each key-value pair is added to the new Map; null values are treated as undefined.

<code>comparator</code> - optional
Specifies a function that defines the sort order. If omitted, the contents are sorted according by natural order of the keys.

If a and b are two elements being compared, then:

If <code>comparator(a, b)</code> is less than 0, sort a to an index lower than b, i.e. a comes first.
If <code>comparator(a, b)</code> returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. 
If <code>comparator(a, b)</code> is greater than 0, sort b to an index lower than a, i.e. b comes first.
<code>comparator(a, b)</code> must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned then the sort order is undefined.

### SoSet API

<code>SoSet.prototype.add(value)</code>
Appends a new element with the given value to the SoSet object. Returns the SoSet object.

<code>SoSet.prototype.clear()</code>
Removes all elements from the SoSet object.

<code>SoSet.prototype.delete(value)</code>
Removes the element associated to the value and returns the value that SoSet.prototype.has(value) would have previously returned. SoSet.prototype.has(value) will return false afterwards.

<code>SoSet.prototype.entries()</code>
Returns a new Iterator object that contains an array of [value, value] for each element in the SoSet object, in defined order. This is kept similar to the Map object, so that each entry has the same value for its key and value here.

<code>SoSet.prototype.forEach(callbackFn[, thisArg])</code>
Calls callbackFn once for each value present in the SoSet object, in defined order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.

<code>SoSet.prototype.has(value)</code>
Returns a boolean asserting whether an element is present with the given value in the SoSet object or not.

<code>SoSet.prototype.keys()</code>
Is the same function as the values() function and returns a new Iterator object that contains the values for each element in the SoSet object in defined order.

<code>SoSet.prototype.values()</code>
Returns a new Iterator object that contains the values for each element in the SoSet object in defined order.

<code>SoSet.prototype[@@iterator] ()</code>
Returns a new Iterator object that contains the values for each element in the SoSet object in defined order

<code>SoSet.prototype.min()</code>
Returns the minimum value of the SoSet object

<code>SoSet.prototype.max()</code>
Returns the maximum value of the SoSet object

### Tests
The tests for this code require `npm` and `Jest` to be installed on the machine. With that, tests will be fired by issuing

    npm test

from inside the working directory.

The working directory contains a `pre-commit.sh` script. When you create a symbol link to the git pre-commit hook via

    ln -s ../../pre-commit.sh .git/hooks/pre-commit

The Jest tests will be run before any commit. In case the tests fail, a commit will not be possible. In order to make this pre-commit behavior available in Tower for Mac, an `environment.plist` file needs to be created in the `~/Library/Application Support/com.fournova.Tower2` directory. That `environment.plist` needs to contain the `$PATH` setting of your shell. Here is an example how the `environment.plist` could look like:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>PATH</key>
            <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
      </dict>
    </plist>
