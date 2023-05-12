const bcrypt = require('bcrypt');
const User = require('./User');

const saveUser = async (body) => {
  const hash = await bcrypt.hash(body.password, 10);
  const user = { ...body, password: hash };

  await User.create(user);
};
module.exports = { saveUser };
