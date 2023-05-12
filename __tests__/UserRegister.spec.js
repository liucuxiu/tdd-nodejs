const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postValidator = () => {
    return request(app).post('/api/v1/users').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'password',
    });
  };

  it('should return 200 OK when signup request is valid', async () => {
    const response = await postValidator();
    expect(response.status).toBe(200);
  });

  it('should return success message when signup request is valid', async () => {
    const response = await postValidator();
    expect(response.body.message).toBe('User created');
  });

  it('should save the user to database', async () => {
    await postValidator();
    const result = await User.findAll();
    expect(result.length).toBe(1);
  });

  it('should save the username and email to database', async () => {
    await postValidator();
    const result = await User.findAll();
    const savedUser = result[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@gmail.com');
  });

  it('should hashed the password in database', async () => {
    await postValidator();
    const result = await User.findAll();
    const saveUser = result[0];
    expect(saveUser.password).not.toBe('password');
  });
});
