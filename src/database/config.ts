import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.DEV_HOST,
  user: process.env.DEV_USER,
  password: process.env.DEV_PASSWORD,
  database: process.env.DEV_DATABASE,
})
;