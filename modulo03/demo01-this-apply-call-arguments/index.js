'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watch(event, fileName) {
    console.log('this', this);

    // avoid using 'arguments'!!!
    console.log('arguments', arguments);
    console.log('arguments', Array.prototype.slice.call(arguments));

    this.showContent(fileName);
  }

  async showContent(fileName) {
    console.log((await readFile(fileName)).toString());
  }
}

const file = new File();

// when call like this, inherits "this" from FSWatcher context!
// watch(__filename, file.watch);

// to don't inherit
// watch(__filename, (event, fileName) => file.watch(event, fileName));

// explicitly define the context
// watch(__filename, file.watch.bind(file));

// the difference is that last one passes arguments as array!
file.watch.call({ showContent: () => console.log('call: hey from .call!!') }, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey from .apply!!') }, [null, __filename]);

