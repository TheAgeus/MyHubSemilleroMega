CREATE DATABASE MYHUB;

USE MYHUB;

CREATE TABLE [Users] (
    id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    username_u NVARCHAR(100) NOT NULL UNIQUE,
    mail_u NVARCHAR(100) NOT NULL UNIQUE,
    password_u NVARCHAR(255) NOT NULL,
    color_u NVARCHAR(10) DEFAULT('#FFFFFF')
);


CREATE TABLE [Movies] (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    name_m NVARCHAR(100) NOT NULL UNIQUE,
    description_m NVARCHAR(500) NOT NULL,
    category_m NVARCHAR(20) NOT NULL,
    img_url NVARCHAR(100)
);

CREATE TABLE Users_have_favorite_movies (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE Users_are_watching_movies (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE [Series] (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    name_s NVARCHAR(100) NOT NULL UNIQUE,
    description_s NVARCHAR(500) NOT NULL,
    category_s NVARCHAR(20) NOT NULL,
    img_url NVARCHAR(100)
);

CREATE TABLE Users_has_favorite_series (
    user_id INT NOT NULL,
    serie_id INT NOT NULL,
    PRIMARY KEY (user_id, serie_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (serie_id) REFERENCES Series(id)
);

CREATE TABLE Users_are_watching_series (
    user_id INT NOT NULL,
    serie_id INT NOT NULL,
    PRIMARY KEY (user_id, serie_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (serie_id) REFERENCES Series(id)
);

CREATE TABLE [Chapters] (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    season_number_c INT NOT NULL,
    title_c NVARCHAR(45) NOT NULL,
    description_c NVARCHAR(500) NOT NULL,
	serie_id INT NOT NULL,
	FOREIGN KEY (serie_id) REFERENCES Series(id)
);


-- Insert test movies
INSERT INTO Movies (name_m, description_m, category_m, img_url) VALUES
('The Shawshank Redemption', 'En esta historia épica, dos hombres encarcelados en una prisión de máxima seguridad forman una profunda amistad a lo largo de los años. Mientras enfrentan las duras condiciones de la vida en prisión, encuentran consuelo y redención a través de actos de decencia común. La película explora temas de esperanza, perseverancia y la capacidad del espíritu humano para superar incluso las circunstancias más difíciles.', 'Drama', 'https://m.media-amazon.com/images/I/81dLj5FeX7L._AC_UF894,1000_QL80_.jpg'),
('The Godfather', 'El patriarca de una poderosa familia criminal transfiere el control de su imperio clandestino a su hijo reacio, mientras enfrenta desafíos tanto dentro como fuera del mundo criminal. La película profundiza en los temas de poder, lealtad y traición, mostrando la complejidad de la vida familiar en el contexto de un imperio criminal en expansión.', 'Crimen', 'https://m.media-amazon.com/images/I/41CqHgnZ-CL._SY445_SX342_.jpg'),
('The Dark Knight', 'Cuando el Joker, un criminal con un pasado enigmático, aparece en Gotham City, desata el caos y la destrucción. Batman se enfrenta a uno de los mayores desafíos de su carrera al tratar de detener al Joker, que busca sumergir la ciudad en el caos total. La película es un estudio profundo de los temas del bien contra el mal y el sacrificio personal en la lucha contra la injusticia.', 'Acción', 'https://images.barrons.com/im-566858?width=700&height=1026'),
('Pulp Fiction', 'Las vidas de dos matones, un boxeador, un gánster y su esposa se entrelazan en una serie de relatos no lineales que exploran la violencia y la redención. La película es conocida por su estilo narrativo único y sus diálogos memorables, ofreciendo una visión de la vida en el crimen y la conexión inesperada entre personajes aparentemente dispares.', 'Crimen', 'https://cdn.europosters.eu/image/750/1288.jpg'),
('Forrest Gump', 'A través de las décadas, un hombre con un coeficiente intelectual bajo y una visión inocente del mundo experimenta eventos históricos significativos y cambia la vida de quienes lo rodean. Desde la presidencia de Kennedy hasta la guerra de Vietnam, la película muestra cómo la bondad y la perseverancia pueden tener un impacto profundo en la vida y en la historia.', 'Drama', 'https://www.petersbilliards.com//assets/uploads/forrest-gump-movie-poster.jpg'),
('Inception', 'Un ladrón experto en el arte de robar secretos corporativos a través del sueño recibe la tarea inversa de implantar una idea en la mente de un CEO. La película desafía la percepción de la realidad con su innovador enfoque sobre los sueños y la mente humana, ofreciendo una narrativa compleja y visualmente impresionante.', 'Ciencia Ficción', 'https://m.media-amazon.com/images/I/714b1KQmskL._AC_UF894,1000_QL80_.jpg'),
('Fight Club', 'Un trabajador de oficina insomne forma un club de lucha subterráneo con un fabricante de jabón, que se transforma en una rebelión contra la sociedad consumista. La película explora temas de identidad, salud mental y el impacto de las presiones sociales en el comportamiento individual a través de una narrativa provocadora.', 'Drama', 'https://m.media-amazon.com/images/I/61tbxfA-uPL._AC_UF1000,1000_QL80_.jpg'),
('The Matrix', 'En un futuro distópico, un hacker descubre que la realidad que conoce es una simulación creada por máquinas para mantener a la humanidad bajo control. La serie de eventos que sigue desafía su percepción de la realidad y lo lleva a luchar por la libertad humana en un mundo donde nada es lo que parece.', 'Ciencia Ficción', 'https://m.media-amazon.com/images/I/71PfZFFz9yL._AC_UF894,1000_QL80_.jpg'),
('Goodfellas', 'La película sigue la vida de Henry Hill desde su juventud en la mafia hasta su vida adulta, explorando su ascenso en el mundo del crimen organizado y sus consecuencias. A través de una narrativa visceral y realista, se muestran las relaciones personales y profesionales que definen el estilo de vida criminal y sus efectos devastadores.', 'Crimen', 'https://bananaroad.com/cdn/shop/products/pst0599_Goodfellas_Movie_Poster_grande.jpg?v=1608435217'),
('The Lord of the Rings: The Return of the King', 'En la épica conclusión de la trilogía, las fuerzas de la Tierra Media se reúnen bajo el liderazgo de Gandalf y Aragorn para enfrentar a las hordas de Sauron. Mientras Frodo y Sam se acercan al Monte del Destino con el Anillo Único, la película ofrece una impresionante conclusión a una saga de valentía, sacrificio y la lucha entre el bien y el mal.', 'Fantasía', 'https://upload.wikimedia.org/wikipedia/en/a/a1/Lord_Rings_Two_Towers.jpg');

-- Insert test series
INSERT INTO Series (name_s, description_s, category_s, img_url) VALUES
('Breaking Bad', 'Un profesor de química que recibe un diagnóstico terminal decide utilizar sus conocimientos para fabricar metanfetaminas y asegurar el futuro financiero de su familia. A medida que se adentra en el mundo del crimen, su transformación de un hombre ordinario en un peligroso narcotraficante plantea preguntas profundas sobre moralidad, familia y poder.', 'Drama', 'https://m.media-amazon.com/images/I/51fWOBx3agL._AC_.jpg'),
('Stranger Things', 'En un pequeño pueblo de Indiana, la desaparición de un niño desencadena una serie de eventos paranormales y misteriosos. Un grupo de amigos se une para desentrañar la verdad detrás de fenómenos inexplicables, mientras una niña con habilidades psíquicas y un gobierno encubierto amenazan con cambiar sus vidas para siempre.', 'Ciencia Ficción', 'https://m.media-amazon.com/images/I/81SG03G+g7L._AC_UF894,1000_QL80_.jpg'),
('Game of Thrones', 'En el vasto mundo de Westeros, varias familias nobles luchan por el control del trono de hierro mientras enfrentan intrigas, traiciones y guerras. La serie combina una narrativa épica con personajes complejos, ofreciendo una visión cruda y realista de la lucha por el poder en un entorno medieval lleno de magia y conflicto.', 'Fantasía', 'https://i.pinimg.com/736x/ae/8c/21/ae8c21bc78b35923cdd54ef5868915ef.jpg'),
('The Crown', 'La serie retrata la vida y el reinado de la Reina Isabel II, explorando no solo los eventos históricos más significativos, sino también los desafíos personales y políticos que ha enfrentado a lo largo de su largo reinado. Ofrece una visión íntima y detallada del impacto de la monarquía británica en el siglo XX.', 'Drama', 'https://i.ebayimg.com/images/g/N5wAAOSwpgRi7DVb/s-l1200.webp'),
('Money Heist', 'Un grupo de criminales, bajo la dirección de un líder conocido como "El Profesor", lleva a cabo el mayor atraco a la Real Casa de la Moneda de España. La serie combina tensión y emoción con una narrativa centrada en las relaciones personales y los conflictos internos de los atracadores, mientras buscan ejecutar el plan perfecto.', 'Crimen', 'https://m.media-amazon.com/images/I/71tqf702KNL.jpg'),
('The Witcher', 'En un mundo lleno de magia y criaturas fantásticas, el cazador de monstruos Geralt de Rivia enfrenta desafíos tanto sobrenaturales como humanos. Mientras las fuerzas políticas y los conflictos devastadores sacuden el continente, Geralt busca su lugar en un mundo donde el bien y el mal no son claros.', 'Fantasía', 'https://files.ekmcdn.com/allwallpapers/images/the-witcher-poster-61cm-x-91.5cm-24-x-36-36346-p.jpg'),
('Black Mirror', 'Cada episodio de esta serie antológica presenta una historia independiente que explora aspectos oscuros y a menudo perturbadores de la tecnología y su impacto en la sociedad. A través de narrativas provocativas y escenarios distópicos, la serie invita a reflexionar sobre las implicaciones éticas y sociales de la tecnología en la vida moderna.', 'Ciencia Ficción', 'https://upload.wikimedia.org/wikipedia/en/5/53/Black_mirror_bandersnatch_poster.jpg'),
('The Mandalorian', 'Ambientada en el universo de Star Wars, la serie sigue las aventuras de un cazarrecompensas solitario conocido como Mandaloriano, que viaja a través de los confines de la galaxia en busca de su próximo objetivo. La trama se enriquece con el descubrimiento de un niño con habilidades especiales y la lucha por protegerlo.', 'Acción', 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/4A999A734F6895F6F70A278DAA142A45E94EFCF778263D1D546ECF029D301E0E/scale?width=1200&aspectRatio=1.78&format=jpeg'),
('Sherlock', 'En la Londres contemporánea, el detective Sherlock Holmes y su compañero, el Dr. John Watson, resuelven una serie de casos complejos y fascinantes. Utilizando habilidades de deducción extraordinarias y una comprensión profunda de la psicología criminal, la serie reinventa al legendario detective para el siglo XXI.', 'Crimen', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Sherlock_titlecard.jpg/250px-Sherlock_titlecard.jpg'),
('The Office', 'Esta comedia en formato de falso documental sigue la vida diaria de los empleados de una oficina en la ciudad de Scranton, Pensilvania. A través de personajes excéntricos y situaciones cómicas, la serie ofrece una mirada humorística y a veces conmovedora de la vida laboral y las relaciones personales en un entorno de oficina.', 'Comedia', 'https://m.media-amazon.com/images/I/51n2EKp5g3L._AC_.jpg');


/*
SELECT * FROM Users;
SELECT * FROM Movies;
SELECT * FROM Series;
SELECT * FROM Chapters;
GO

DROP PROCEDURE SP_GetFavoriteMoviesByUser;
DROP PROCEDURE SP_GetWatchingMoviesByUser;
DROP PROCEDURE SP_GetFavoriteSeriesByUser;
DROP PROCEDURE SP_GetWatchingSeriesByUser;

EXEC SP_GetFavoriteMoviesByUser @UserId = 1;
GO

DELETE FROM Users_have_favorite_movies WHERE user_id=1 AND movie_id=1;
*/


-- Get favorite movies from user
-- The correspont store procedure

CREATE PROCEDURE SP_GetFavoriteMoviesByUser
    @UserId INT
AS
BEGIN
    SELECT 
        u.username_u as username,
		m.id as movie_id,
        m.name_m as movie_name,
        m.description_m as movie_description,
        m.category_m as movie_category,
        m.img_url as movie_img_url
    FROM 
        Users_have_favorite_movies um
    JOIN
        Movies m ON um.movie_id = m.id
    JOIN
        Users u ON um.user_id = u.id
    WHERE
        um.user_id = @UserId;
END;
GO

-- Get movies watching from user
CREATE PROCEDURE SP_GetWatchingMoviesByUser
	@UserId INT
AS
BEGIN
	SELECT 
		u.username_u as username,
		m.id as movie_id,
		m.name_m as movie_name,
		m.description_m as movie_description,
		m.category_m as movie_category,
		m.img_url as movie_img_url
	FROM 
		Users_are_watching_movies um
	JOIN
		Movies m ON um.movie_id = m.id
	JOIN
		Users u ON um.user_id = u.id
	WHERE
		um.user_id = @UserId;
END;
GO


-- Get favorite series from user
CREATE PROCEDURE SP_GetFavoriteSeriesByUser
	@UserId INT
AS
BEGIN
	SELECT 
		u.username_u as username,
		s.id as serie_id,
		s.name_s as serie_name,
		s.description_s as serie_description,
		s.category_s as serie_category,
		s.img_url as serie_img_url
	FROM 
		Users_has_favorite_series us
	JOIN
		Series s ON us.serie_id = s.id
	JOIN
		Users u ON us.user_id = u.id
	WHERE
		us.user_id = @UserId;
END;
GO

-- Get series watching from user
CREATE PROCEDURE SP_GetWatchingSeriesByUser
	@UserId INT
AS
BEGIN
	SELECT 
		u.username_u as username,
		s.id as serie_id,
		s.name_m as serie_name,
		s.description_m as serie_description,
		s.category_m as serie_category,
		s.img_url as serie_img_url
	FROM 
		Users_are_watching_series us
	JOIN
		Movies s ON us.serie_id = s.id
	JOIN
		Users u ON us.user_id = u.id
	WHERE
		us.user_id = @UserId;
END;
GO
/*

DELETE FROM Chapters;
DBCC CHECKIDENT ('Chapters', RESEED, 0);
DELETE FROM Series;
DBCC CHECKIDENT ('Series', RESEED, 0);
DELETE FROM Movies;
DBCC CHECKIDENT ('Movies', RESEED, 0);
DELETE FROM Users;
DBCC CHECKIDENT ('Users', RESEED, 0);
DROP TABLE Chapters;
DROP TABLE Series;
DROP TABLE Movies;
DROP TABLE Users;

SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE';

SELECT 
    *
FROM 
    Movies as mv
LEFT JOIN
	Users_have_favorite_movies fm ON mv.id=fm.movie_id

;


SELECT 
    m.id AS movie_id,
    m.name_m AS movie_name,
    m.description_m AS movie_description,
    m.category_m AS movie_category,
    m.img_url AS movie_img_url,
    CASE 
        WHEN uhm.movie_id IS NOT NULL THEN 'S�'
        ELSE 'No'
    END AS es_favorito
FROM 
    Movies m
LEFT JOIN 
    (SELECT movie_id FROM Users_have_favorite_movies WHERE user_id = 1) uhm
ON 
    m.id = uhm.movie_id;

SELECT 
    s.id AS serie_id,
    s.name_s AS serie_name,
    s.description_s AS serie_description,
    s.category_s AS serie_category,
    s.img_url AS serie_img_url,
    CASE 
        WHEN uhm.serie_id IS NOT NULL THEN 'S�'
        ELSE 'No'
    END AS es_favorito
FROM 
    Series s
LEFT JOIN 
    (SELECT serie_id FROM Users_has_favorite_series WHERE user_id = 1) uhm
ON 
    s.id = uhm.serie_id;



*/