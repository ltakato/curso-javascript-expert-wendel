const rewireMock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');
const UserFactory = require('../src/factory/userFactory');

// <could be in another file>
const dbData = [{ name: 'Mariazinha' }, { name: 'Joazin' }];

class MockDataBase {
  connect = () => this;
  find = async (query) => dbData;
}

// </could be in another file>

rewireMock(() => require('../src/util/database')).with(MockDataBase);

(async () => {
  {
    const expected = [{ name: 'MARIAZINHA' }, { name: 'JOAZIN' }];
    rewireMock.enable();
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewireMock.disable();
  }

  {
    const expected = [{ name: 'ERICKWENDEL' }];
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
