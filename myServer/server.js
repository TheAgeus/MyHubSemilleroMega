const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, connect } = require('./db');
const cors = require('cors');
const { moveCursor } = require('readline');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a SQL Server
connect();

// Registro de Usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const checkUser = await sql.query`
      SELECT * FROM Users WHERE username_u = ${username} OR mail_u = ${mail}
    `;

    if (checkUser.recordset.length > 0) {
      return res.status(409).json({ error: 'El usuario o correo ya están registrados' });
    }

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
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password_u);

    if (!isMatch) {
      return res.status(402).json({ error: 'Contraseña incorrecta' });
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

// get listo of categories from movies
app.get('/api/movie-categories', auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    const id = decoded.userId;
    const result = await sql.query`SELECT category_m FROM Movies group by category_m;`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
});

// get listo of categories from series
app.get('/api/serie-categories', auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    const id = decoded.userId;
    const result = await sql.query`SELECT category_s FROM Series group by category_s;`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
});

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

// Get all movies
app.get('/api/movies', auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, 'secretKey');
  const user_id = decoded.userId;
  const result = await sql.query`SELECT 
    m.id AS movie_id,
    m.name_m AS movie_name,
    m.description_m AS movie_description,
    m.category_m AS movie_category,
    m.img_url AS movie_img_url,
    CASE 
        WHEN uhm.movie_id IS NOT NULL THEN 'Sí'
        ELSE 'No'
    END AS es_favorito
FROM 
    Movies m
LEFT JOIN 
    (SELECT movie_id FROM Users_have_favorite_movies WHERE user_id = ${user_id}) uhm
ON 
    m.id = uhm.movie_id;`;
  res.status(200).json(result.recordset);
});

// Get all movies with certain category
app.get('/api/get_by_category/movies/:category', auth, async (req, res) => {
  const category = req.params.category;
  const result = await sql.query`SELECT * FROM Movies WHERE category_m=${category}`;
  res.status(200).json(result.recordset);
});

// Get all series with certain category
app.get('/api/get_by_category/series/:category', auth, async (req, res) => {
  const category = req.params.category;
  const result = await sql.query`SELECT * FROM Series WHERE category_s=${category}`;
  res.status(200).json(result.recordset);
});

// Get a certain movie
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

// Get all series
app.get('/api/series', auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, 'secretKey');
  const user_id = decoded.userId;
  const result = await sql.query`SELECT 
    s.id AS serie_id,
    s.name_s AS serie_name,
    s.description_s AS serie_description,
    s.category_s AS serie_category,
    s.img_url AS serie_img_url,
    CASE 
        WHEN uhm.serie_id IS NOT NULL THEN 'Sí'
        ELSE 'No'
    END AS es_favorito
FROM 
    Series s
LEFT JOIN 
    (SELECT serie_id FROM Users_has_favorite_series WHERE user_id = ${user_id}) uhm
ON 
    s.id = uhm.serie_id;`;
  res.status(200).json(result.recordset);
});

// Get certain serie
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

// Set a favorite movie to an user
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

// Set user is watching a movie
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

// Set user like a serie
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

// set user is watching a serie
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



// Get user favorite movies
app.get('/api/favorite_movies', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`EXEC SP_GetFavoriteMoviesByUser @UserId = ${user_id}`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar obtener tus peliculas favoritas' });
  }
});

// Get user favorite series
app.get('/api/favorite_series', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`EXEC SP_GetFavoriteSeriesByUser @UserId = ${user_id}`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar obtener tus series favoritas' });
  }
});

// Get user watching movies
app.get('/api/watching_movies', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`EXEC SP_GetWatchingMoviesByUser @UserId = ${user_id}`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar obtener las peliculas que estas viendo' });
  }
});

// Get user watching series
app.get('/api/watching_series', auth, async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`EXEC SP_GetWatchingSeriesByUser @UserId = ${user_id}`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al intentar obtener las series que estas viendo' });
  }
});

// erase fav movie
app.get('/api/eraseFavMovie/:id', auth, async (req, res) => {
  try {
    const movie_id = req.params.id;
    console.log(movie_id);
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    console.log(`DELETE FROM Users_have_favorite_movies WHERE user_id=${user_id} AND movie_id=${movie_id}`)
    const result = await sql.query`DELETE FROM Users_have_favorite_movies WHERE user_id = ${user_id} AND movie_id = ${movie_id}`;
    res.status(200).json({message: "favorito borrado"});
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al borrar favorito' });
  }
});
// erase fav serie
app.get('/api/eraseFavSerie/:id', auth, async (req, res) => {
  try {
    const serie_id = req.params.id;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`DELETE FROM Users_has_favorite_series WHERE user_id=${user_id} AND serie_id=${serie_id}`;
    res.status(200).json({message: "favorito borrado"});
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al borrar favorito' });
  }
});

// add fav serie
app.get('/api/addFavSerie/:id', auth, async (req, res) => {
  try {
    const serie_id = req.params.id;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_has_favorite_series (user_id, serie_id) VALUES (${user_id}, ${serie_id})`;
    res.status(200).json({message: "favorito agregado"});
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al agregar favorito' });
  }
});

// add fav serie
app.get('/api/addFavMovie/:id', auth, async (req, res) => {
  try {
    const movie_id = req.params.id;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    const user_id = decoded.userId;
    const result = await sql.query`INSERT INTO Users_have_favorite_movies (user_id, movie_id)
    VALUES (${user_id}, ${movie_id})`;
    res.status(200).json({message: "favorito agregado"});
  } catch (error) {
    res.status(400).json({ error: 'Hubo error al agregar favorito' });
  }
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
