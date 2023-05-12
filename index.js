const app = require('./src/app');
const sequelize = require('./src/config/database');

sequelize.sync();

app.listen(8000, () => {
  console.log('app running 8000');
});
