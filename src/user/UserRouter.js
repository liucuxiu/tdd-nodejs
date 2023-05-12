const express = require('express');
const router = express.Router();
const UserService = require('./UserService');

router.post('/api/v1/users', async (req, res) => {
  await UserService.saveUser(req.body);

  return res.send({ message: 'User created' })
})

module.exports = router;
