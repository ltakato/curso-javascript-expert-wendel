console.log(true + 2);

console.log(true - 2);

console.log('21' + true);

console.log('21' - true);

console.log(0.1 + 0.2 === 0.3);

console.log(3 > 2 > 1);

console.log('1' == 1);
console.log('1' === 1); // without implicit coercion!

// ---------------------------------------------------------------

console.log(String(123)); // explicit
console.assert(String(123) === '123', 'explicit conversion to string');
console.log(123 + ''); // implicit
console.assert(123 + '' === '123', 'implicit conversion to string');

if (null || 1) {
  console.log('hey!');
}

if ('hello' || 1) {
  console.log('hello!');
}

// in these cases, they aren't returning boolean. in practice, if statements do the "implicit coercion"
console.assert(('hello' || 123) === 'hello', "|| returns the first element when both are true!");
console.assert(('hello' && 123) === 123, "&& returns the last element when both are true!");

// ---------------------------------------------------------------

const item = {
  name: 'ErickWendel',
  age: 25,
  //
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    /*
      if we write like this, explicit conversion (ex: Number) will return NaN
      and implicit conversion will call toString instead of this return because it's not a "primitive" return
     */
    // return { hey: 'dude' };

    return 007;
  },
  // when we add this implementation, it has priority!!!
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to:', coercionType);

    // hash table to "control" types of "returns" for each types
    const types = {
      string: JSON.stringify(this),
      number: '0007',
    }

    return types[coercionType] || types.string;
  }
};

// when implements "valueOf" to return a primitive value (number, string, boolean) it returns instead of toString
// if valueOf doesn't return primitive value it'll look for toString
console.log(item + 0);
console.log(Number(item)); // explicit alternative

// when call concat, we're forcing object to call toString
console.log('item, ', ''.concat(item) + 0);
console.log(String(item)); // explicit alternative

// testes after adding toPrimitive
console.info('tests for toPrimitive');
console.log('String', String(item));
console.log('Number', Number(item));
// will call "default" conversion!
console.log('Date', new Date(item));

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0');
console.log('!!item is true?', !!item);
console.assert(!!item);

console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item), '{"name":"ErickWendel","age":25}0');

console.log('implicit + explicit coercion (using ==)', item == String(item));
console.assert(item == String(item));

// test if all implementations of methods still the same!
const item2 = { ...item, name: 'Zézin', age: 20 };
console.log('item2', item2);
console.assert(item2.name === 'Zézin' && item2.age == 20);