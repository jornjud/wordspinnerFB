const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const encodeRoutes = require('./routes/encode');

const app = express();
const PORT = process.env.PORT || 3000;

// กำหนดค่า MySQL (แก้ไข host, user, password, และ database ให้ถูกต้อง)
const dbConfig = {
  host: 'localhost',
  user: 'admin', 
  password: 'admin1234',
  database: 'wordspinner_db'
};

// สร้าง connection pool
const pool = mysql.createPool(dbConfig);

// ใช้ middleware
app.use(bodyParser.json());

// ใช้ routes
app.use('/users', userRoutes);
app.use('/', encodeRoutes);

// เริ่ม Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});