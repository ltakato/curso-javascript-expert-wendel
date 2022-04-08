const assert = require('assert');

// --- keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

console.log('getting normal Objects', user.userName);

// always unique in memory address
console.log('getting normal Objects', user[uniqueKey]);
console.log('getting normal Objects', user[Symbol('userName')]); // don't work!

assert.deepStrictEqual(user.userName, 'value for normal Objects');
assert.deepStrictEqual(user[Symbol('userName')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// it's harder to get it, but not impossible to see it!
console.log('symbols', Object.getOwnPropertySymbols(user));

// (bad practice!)
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// well known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    }
  })
};

// for (const item of obj) {
//   console.log('item', item);
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  // also, can be used to override coercion
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    const itens = this[kItems]
      .map(item => new Intl
        .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
        .format(item));

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(itens);
  }

  * [Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async* [Symbol.asyncIterator]() {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?';
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2018, 2, 2],
);

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2),
];

// console.log('myDate', myDate + 1);
assert.throws(() => myDate + 1, TypeError);

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]');

console.log(String(myDate));
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018');

// implementing iterators
console.log([...myDate]);
assert.deepStrictEqual([...myDate], expectedDates);

;(async () => {
  for await(const item of myDate) {
    console.log('asyncIterator', item);
  }
})();

;(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
