'use strict';

const assert = require('assert');

// guarantee semantic and security for objects

// ---- apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
};

// possible problems described below
// Function.prototype.apply = () => {
//   throw new TypeError('Eita!');
// };
// myObj.add.apply = function () {
//   throw new TypeError('Vixxx');
// };

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// problem that can happen (very rare)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// this can happen!
myObj.add.apply = function () {
  throw new TypeError('Vixxx');
};

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixxx',
  }
);

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// ---- end apply

// ---- defineProperty
// for semantics!

function MyDate() {
}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' });

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');

// ---- deleteProperty
const withDelete = { user: 'ErickWendel' };
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'XuxaDaSilva' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// ---- get
assert.deepStrictEqual(1['userName'], undefined);
// with reflection, an exception is thrown!
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// ---- has
assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// ---- ownKeys
const user = Symbol('user');
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickwendel'
};

// with traditional object methods, need to do 2 requests
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];
console.log('objectKeys', objectKeys);

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// with reflection
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);
