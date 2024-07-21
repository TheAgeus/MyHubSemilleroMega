const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, connect } = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar a SQL Server
connect();

// Registro de Usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.query`INSERT INTO Users (username_u, mail_u, password_u) VALUES (${username}, ${mail}, ${hashedPassword})`;

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'El registro falló' });
  }
});

// Inicio de Sesión
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await sql.query`SELECT * FROM Users WHERE username_u = ${username}`;
    

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password_u);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '24h' });
    res.json({ token });
    
  } catch (error) {
    res.status(400).json({ error: 'El inicio de sesión falló' });
  }
});

// Middleware de Autorización
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
};

// Ruta Protegida get
app.get('/api/me', auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    const id = decoded.userId;
    const result = await sql.query`SELECT username_u, mail_u FROM Users WHERE id=${id}`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
});

app.get('/api/movies', auth, async (req, res) => {
  const result = await sql.query`SELECT * FROM Movies`;
  res.status(200).json(result.recordset);
});

app.get('/api/movies/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await sql.query`SELECT * FROM Movies WHERE id=${id}`;
  if(result.recordset.length == 1) {
    res.status(200).json(result.recordset[0]);
  }
  else {
    res.status(400).json({ error: 'No encontrado' });
  }
});

app.get('/api/series', auth, async (req, res) => {
  const result = await sql.query`SELECT * FROM Series`;
  res.status(200).json(result.recordset);
});

app.get('/api/series/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await sql.query`SELECT * FROM Series WHERE id=${id}`;

  if(result.recordset.length == 1) {
    res.status(200).json(result.recordset[0]);
  }
  else {
    res.status(400).json({ error: 'No encontrado' });
  }
});

app.post('/api/user_like_movie/:movie_id', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const movie_id = req.params.movie_id;
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_have_favorite_movies (user_id, movie_id) VALUES (${user_id}, ${movie_id})`;
    res.status(201).json({ message: 'Favorito agregado' });
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar agregar a favorito' });
  }
});

app.post('/api/user_watch_movie/:movie_id', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const movie_id = req.params.movie_id;
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_are_watching_movies (user_id, movie_id) VALUES (${user_id}, ${movie_id})`;
    res.status(201).json({ message: 'Viendo pelicula agregado' });
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar agregar a viendo pelicula' });
  }
});

app.post('/api/user_like_serie/:serie_id', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const serie_id = req.params.serie_id;
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_have_favorite_series (user_id, serie_id) VALUES (${user_id}, ${serie_id})`;
    res.status(201).json({ message: 'Serie agregada a favoritos' });
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar agregar series favoritas' });
  }
});

app.post('/api/user_watch_serie/:serie_id', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const serie_id = req.params.serie_id;
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_are_watching_series (user_id, serie_id) VALUES (${user_id}, ${serie_id})`;
    res.status(201).json({ message: 'Viendo serie agregado' });
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar agregar a viendo serie' });
  }
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
