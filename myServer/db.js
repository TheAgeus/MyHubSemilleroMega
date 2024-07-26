const sql = require('mssql');
require("dotenv").config();

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER, // O el nombre de tu servidor
  database: process.env.DATABASE,
  options: {
    encrypt: true, // Para conexiones seguras
    trustServerCertificate: true // Solo si es necesario
  }
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Conectado a SQL Server');
  } catch (err) {
    console.error('Error conectando a SQL Server:', err);
  }
}

module.exports = {
  sql,
  connect
};