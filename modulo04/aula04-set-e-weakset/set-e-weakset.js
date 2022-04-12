const assert = require('assert');

// used in many cases for lists with unique itens

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();

arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

console.log('Set with add item per item', set);

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

console.log('set.keys', set.keys());
console.log('set.values', set.values());

assert.ok(set.has('3'));

const users01 = new Set([
  'erick',
  'mariazinha',
  'xuxa da silva',
]);

const users02 = new Set([
  'joaozinho',
  'erick',
  'julio',
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
console.log(intersection);
assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users01].filter(user => !users02.has(user)));
console.log(difference);
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa da silva']);

// weakSet

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);

weakSet.add(user2);
weakSet.delete(user);
console.log(weakSet.has(user));
