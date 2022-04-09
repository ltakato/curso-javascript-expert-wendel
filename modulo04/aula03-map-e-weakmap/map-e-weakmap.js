const assert = require('assert');

const myMap = new Map();

myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hello');

const myMapWithContructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

console.log('myMap', myMap);
console.log('myMap.get(1)', myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// keys can just be string or symbol for objects (numbers are converged to string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: 'ErickWendel' });

console.log('get', myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' });

// utilities
// - looks like Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// to verify if an item exists in an object
// for object: item.key => if exists = undefined, if () => implicit coalescing for boolean and return false
// best way for object => ({ name: 'Erick' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// to remove item from object
// delete item.id
// bad performance!
assert.ok(myMap.delete(onlyReferenceWorks));

// can't iterate objects directly!
// need to transform with Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([[1, 'one'], ['Erick', { 'text': 'two' }], [true, () => {
  }]])
);

for (const [key, value] of myMap) {
  console.log({ key, value });
}

// object is not safe, because depending on key name, can overwrite with another default behaviour
// ({ }).toString() => '[object Object]'
// ({ toString: () => 'Hey'}).toString() === 'Hey'

// any keys can collide, with properties inherited from object as constructor, toString, valueOf, etc

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen Xuxa da Silva'
};

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// can't clean obj without reassigning

// with Map, it's very easy!
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- WeakMap

// can be collected after losing references
// it has most of good parts of Map
// however, it's not iterable!
// it avoids memory leak because after their instances get out from memory, everything gets cleaned!

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// most of basic things, look like Map
weakMap.set(hero);
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);
