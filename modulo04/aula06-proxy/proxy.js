'user strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';

event.on(eventName, msg => console.log('counter update', msg));

event.emit(eventName, 'oi');
event.emit(eventName, 'tchau');

const myCounter = {
  counter: 0
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    console.log('chamou!', { object, prop });
    return object[prop];
  }
});

setInterval(function () {
  proxy.counter += 1;
  console.log('[3]: setInterval!');
  if (proxy.counter === 10) clearInterval(this);
}, 200);

// workaround for doing "async" things!
// called after next tick
setTimeout(() => {
  proxy.counter = 4;
  console.log('[2]: timeout!');
}, 100);

// when want to execute immediately
// called before set time out
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
});

// executing NOW!
// next tick have high priority, jumping all of events to be processed!
process.nextTick(() => {
  proxy.counter = 2;
  console.log('[0] nextTick');
});