const Database = require('../util/database');
const UserRepository = require('../repository/userRepository');
const UserService = require('../service/userService');

class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: 'mongodb://localhost' });
    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });

    return new UserService({ userRepository });
  }
}

module.exports = UserFactory;
