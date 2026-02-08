const path = require('path');
const dotenv = require('dotenv');
const { DataSource } = require('typeorm');

dotenv.config();

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

 entities: [path.join(__dirname, '../dist/entities/*.js')],
 migrations: [path.join(__dirname, '../dist/migrations/*.js')],

});
