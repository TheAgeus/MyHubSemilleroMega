const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'karla6yagustin1',
  server: 'DESKTOP-68V7H89\\AGEUS', // O el nombre de tu servidor
  database: 'MYHUB',
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