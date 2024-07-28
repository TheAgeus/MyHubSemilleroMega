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
('The Shawshank Redemption', 'En esta historia �pica, dos hombres encarcelados en una prisi�n de m�xima seguridad forman una profunda amistad a lo largo de los a�os. Mientras enfrentan las duras condiciones de la vida en prisi�n, encuentran consuelo y redenci�n a trav�s de actos de decencia com�n. La pel�cula explora temas de esperanza, perseverancia y la capacidad del esp�ritu humano para superar incluso las circunstancias m�s dif�ciles.', 'Drama', 'https://m.media-amazon.com/images/I/81dLj5FeX7L._AC_UF894,1000_QL80_.jpg'),
('The Godfather', 'El patriarca de una poderosa familia criminal transfiere el control de su imperio clandestino a su hijo reacio, mientras enfrenta desaf�os tanto dentro como fuera del mundo criminal. La pel�cula profundiza en los temas de poder, lealtad y traici�n, mostrando la complejidad de la vida familiar en el contexto de un imperio criminal en expansi�n.', 'Crimen', 'https://m.media-amazon.com/images/I/41CqHgnZ-CL._SY445_SX342_.jpg'),
('The Dark Knight', 'Cuando el Joker, un criminal con un pasado enigm�tico, aparece en Gotham City, desata el caos y la destrucci�n. Batman se enfrenta a uno de los mayores desaf�os de su carrera al tratar de detener al Joker, que busca sumergir la ciudad en el caos total. La pel�cula es un estudio profundo de los temas del bien contra el mal y el sacrificio personal en la lucha contra la injusticia.', 'Acci�n', 'https://images.barrons.com/im-566858?width=700&height=1026'),
('Pulp Fiction', 'Las vidas de dos matones, un boxeador, un g�nster y su esposa se entrelazan en una serie de relatos no lineales que exploran la violencia y la redenci�n. La pel�cula es conocida por su estilo narrativo �nico y sus di�logos memorables, ofreciendo una visi�n de la vida en el crimen y la conexi�n inesperada entre personajes aparentemente dispares.', 'Crimen', 'https://cdn.europosters.eu/image/750/1288.jpg'),
('Forrest Gump', 'A trav�s de las d�cadas, un hombre con un coeficiente intelectual bajo y una visi�n inocente del mundo experimenta eventos hist�ricos significativos y cambia la vida de quienes lo rodean. Desde la presidencia de Kennedy hasta la guerra de Vietnam, la pel�cula muestra c�mo la bondad y la perseverancia pueden tener un impacto profundo en la vida y en la historia.', 'Drama', 'https://www.petersbilliards.com//assets/uploads/forrest-gump-movie-poster.jpg'),
('Inception', 'Un ladr�n experto en el arte de robar secretos corporativos a trav�s del sue�o recibe la tarea inversa de implantar una idea en la mente de un CEO. La pel�cula desaf�a la percepci�n de la realidad con su innovador enfoque sobre los sue�os y la mente humana, ofreciendo una narrativa compleja y visualmente impresionante.', 'Ciencia Ficci�n', 'https://m.media-amazon.com/images/I/714b1KQmskL._AC_UF894,1000_QL80_.jpg'),
('Fight Club', 'Un trabajador de oficina insomne forma un club de lucha subterr�neo con un fabricante de jab�n, que se transforma en una rebeli�n contra la sociedad consumista. La pel�cula explora temas de identidad, salud mental y el impacto de las presiones sociales en el comportamiento individual a trav�s de una narrativa provocadora.', 'Drama', 'https://m.media-amazon.com/images/I/61tbxfA-uPL._AC_UF1000,1000_QL80_.jpg'),
('The Matrix', 'En un futuro dist�pico, un hacker descubre que la realidad que conoce es una simulaci�n creada por m�quinas para mantener a la humanidad bajo control. La serie de eventos que sigue desaf�a su percepci�n de la realidad y lo lleva a luchar por la libertad humana en un mundo donde nada es lo que parece.', 'Ciencia Ficci�n', 'https://m.media-amazon.com/images/I/71PfZFFz9yL._AC_UF894,1000_QL80_.jpg'),
('Goodfellas', 'La pel�cula sigue la vida de Henry Hill desde su juventud en la mafia hasta su vida adulta, explorando su ascenso en el mundo del crimen organizado y sus consecuencias. A trav�s de una narrativa visceral y realista, se muestran las relaciones personales y profesionales que definen el estilo de vida criminal y sus efectos devastadores.', 'Crimen', 'https://bananaroad.com/cdn/shop/products/pst0599_Goodfellas_Movie_Poster_grande.jpg?v=1608435217'),
('The Lord of the Rings: The Return of the King', 'En la �pica conclusi�n de la trilog�a, las fuerzas de la Tierra Media se re�nen bajo el liderazgo de Gandalf y Aragorn para enfrentar a las hordas de Sauron. Mientras Frodo y Sam se acercan al Monte del Destino con el Anillo �nico, la pel�cula ofrece una impresionante conclusi�n a una saga de valent�a, sacrificio y la lucha entre el bien y el mal.', 'Fantas�a', 'https://upload.wikimedia.org/wikipedia/en/a/a1/Lord_Rings_Two_Towers.jpg');

-- Insert test series
INSERT INTO Series (name_s, description_s, category_s, img_url) VALUES
('Breaking Bad', 'Un profesor de qu�mica que recibe un diagn�stico terminal decide utilizar sus conocimientos para fabricar metanfetaminas y asegurar el futuro financiero de su familia. A medida que se adentra en el mundo del crimen, su transformaci�n de un hombre ordinario en un peligroso narcotraficante plantea preguntas profundas sobre moralidad, familia y poder.', 'Drama', 'https://m.media-amazon.com/images/I/51fWOBx3agL._AC_.jpg'),
('Stranger Things', 'En un peque�o pueblo de Indiana, la desaparici�n de un ni�o desencadena una serie de eventos paranormales y misteriosos. Un grupo de amigos se une para desentra�ar la verdad detr�s de fen�menos inexplicables, mientras una ni�a con habilidades ps�quicas y un gobierno encubierto amenazan con cambiar sus vidas para siempre.', 'Ciencia Ficci�n', 'https://m.media-amazon.com/images/I/81SG03G+g7L._AC_UF894,1000_QL80_.jpg'),
('Game of Thrones', 'En el vasto mundo de Westeros, varias familias nobles luchan por el control del trono de hierro mientras enfrentan intrigas, traiciones y guerras. La serie combina una narrativa �pica con personajes complejos, ofreciendo una visi�n cruda y realista de la lucha por el poder en un entorno medieval lleno de magia y conflicto.', 'Fantas�a', 'https://i.pinimg.com/736x/ae/8c/21/ae8c21bc78b35923cdd54ef5868915ef.jpg'),
('The Crown', 'La serie retrata la vida y el reinado de la Reina Isabel II, explorando no solo los eventos hist�ricos m�s significativos, sino tambi�n los desaf�os personales y pol�ticos que ha enfrentado a lo largo de su largo reinado. Ofrece una visi�n �ntima y detallada del impacto de la monarqu�a brit�nica en el siglo XX.', 'Drama', 'https://i.ebayimg.com/images/g/N5wAAOSwpgRi7DVb/s-l1200.webp'),
('Money Heist', 'Un grupo de criminales, bajo la direcci�n de un l�der conocido como "El Profesor", lleva a cabo el mayor atraco a la Real Casa de la Moneda de Espa�a. La serie combina tensi�n y emoci�n con una narrativa centrada en las relaciones personales y los conflictos internos de los atracadores, mientras buscan ejecutar el plan perfecto.', 'Crimen', 'https://m.media-amazon.com/images/I/71tqf702KNL.jpg'),
('The Witcher', 'En un mundo lleno de magia y criaturas fant�sticas, el cazador de monstruos Geralt de Rivia enfrenta desaf�os tanto sobrenaturales como humanos. Mientras las fuerzas pol�ticas y los conflictos devastadores sacuden el continente, Geralt busca su lugar en un mundo donde el bien y el mal no son claros.', 'Fantas�a', 'https://files.ekmcdn.com/allwallpapers/images/the-witcher-poster-61cm-x-91.5cm-24-x-36-36346-p.jpg'),
('Black Mirror', 'Cada episodio de esta serie antol�gica presenta una historia independiente que explora aspectos oscuros y a menudo perturbadores de la tecnolog�a y su impacto en la sociedad. A trav�s de narrativas provocativas y escenarios dist�picos, la serie invita a reflexionar sobre las implicaciones �ticas y sociales de la tecnolog�a en la vida moderna.', 'Ciencia Ficci�n', 'https://upload.wikimedia.org/wikipedia/en/5/53/Black_mirror_bandersnatch_poster.jpg'),
('The Mandalorian', 'Ambientada en el universo de Star Wars, la serie sigue las aventuras de un cazarrecompensas solitario conocido como Mandaloriano, que viaja a trav�s de los confines de la galaxia en busca de su pr�ximo objetivo. La trama se enriquece con el descubrimiento de un ni�o con habilidades especiales y la lucha por protegerlo de fuerzas peligrosas.', 'Acci�n', 'https://m.media-amazon.com/images/I/71OnyVp1DJL._AC_UF894,1000_QL80_.jpg'),
('The Office', 'Esta serie de comedia ofrece una visi�n hilarante de la vida diaria en una oficina de ventas de papel. A trav�s de un estilo de falso documental, se exploran las din�micas personales y profesionales entre los empleados, destacando las situaciones c�micas y los conflictos cotidianos que surgen en el entorno laboral.', 'Comedia', 'https://m.media-amazon.com/images/I/71oaJCGFJRL._AC_UF894,1000_QL80_.jpg'),
('Narcos', 'La serie narra el auge y la ca�da de los c�rteles de narc�ticos en Colombia, enfoc�ndose en el infame Pablo Escobar y las operaciones de la DEA para combatir el tr�fico de drogas. Con una representaci�n realista y cruda, la serie explora la violencia, la corrupci�n y el impacto social del narcotr�fico en la regi�n.', 'Crimen', 'https://moviepostermexico.com/cdn/shop/products/narcos_xlg_1012x.jpg?v=1584379581');


-- Insert test chapters
INSERT INTO [Chapters] (season_number_c, title_c, description_c, serie_id) VALUES
(1, 'Piloto', 'Walter White, un profesor de qu�mica, recibe un diagn�stico de c�ncer terminal y decide fabricar metanfetaminas para asegurar el futuro financiero de su familia.', 1),
(1, 'Correr o Morir', 'Walter y Jesse enfrentan los primeros problemas con la producci�n de metanfetaminas y se encuentran con sus primeros obst�culos legales y personales.', 1),
(1, 'Enemigos de la Calle', 'Walter se adentra en el mundo del crimen y enfrenta amenazas de los narcotraficantes mientras trata de mantener su doble vida.', 1),
(1, 'Cu�nto Costar�', 'La tensi�n aumenta cuando Walter debe manejar una situaci�n complicada con su socio, Jesse, mientras las consecuencias de sus decisiones comienzan a hacerse evidentes.', 1),
(1, 'Granada', 'Los problemas de Walter y Jesse llegan a un punto cr�tico cuando enfrentan un peligro inminente que pone en riesgo su operaci�n de metanfetaminas.', 1),
(2, 'Nuevo Socio', 'Walter busca un nuevo socio para ayudar en la producci�n de metanfetaminas, lo que lleva a nuevos conflictos y complicaciones.', 1),
(2, 'Riesgo de Exposici�n', 'Walter y Jesse enfrentan el riesgo de ser descubiertos mientras intentan expandir su operaci�n en un mercado cada vez m�s competitivo.', 1),
(2, 'El M�todo de la Estufa', 'Walter utiliza m�todos no convencionales para resolver problemas, mientras sus acciones empiezan a tener consecuencias inesperadas.', 1),
(2, 'La Ca�da', 'Las decisiones de Walter llevan a un colapso en su vida personal y profesional, lo que crea una situaci�n insostenible.', 1),
(2, 'Fin de la Carrera', 'La temporada concluye con un enfrentamiento decisivo que marca un giro importante en la vida de Walter y en la trama general.', 1),
(1, 'Desaparici�n', 'Un ni�o desaparece en un peque�o pueblo y sus amigos comienzan una b�squeda desesperada, descubriendo un mundo oculto.', 2),
(1, 'La Ni�a Extra�a', 'Un grupo de amigos encuentra a una ni�a con habilidades especiales que parece tener conexi�n con la desaparici�n del ni�o.', 2),
(1, 'Experimentos Secretos', 'Se revelan experimentos secretos realizados por el gobierno que podr�an estar relacionados con los eventos paranormales.', 2),
(1, 'El Mundo del Rev�s', 'Los personajes descubren un mundo paralelo que est� causando los fen�menos inexplicables en su pueblo.', 2),
(1, 'La B�squeda Contin�a', 'La b�squeda del ni�o desaparecido lleva a los personajes a enfrentar peligros desconocidos en el mundo alternativo.', 2),
(2, 'Regresos Inesperados', 'Los personajes enfrentan nuevas amenazas mientras los eventos del mundo del rev�s contin�an afectando sus vidas.', 2),
(2, 'Aliados y Enemigos', 'Los personajes hacen alianzas con nuevos aliados para enfrentar a los enemigos que se han vuelto m�s poderosos.', 2),
(2, 'Ecos del Pasado', 'Se revelan m�s detalles sobre el pasado de los personajes y c�mo se relacionan con los eventos paranormales.', 2),
(2, 'El �ltimo Enfrentamiento', 'El enfrentamiento final contra las fuerzas del mundo del rev�s pone en juego la vida de los personajes y su futuro.', 2),
(2, 'Nuevos Comienzos', 'La temporada concluye con los personajes ajustando sus vidas despu�s de los eventos dram�ticos que han ocurrido.', 2),
(1, 'Un Juego de Tronos', 'La serie comienza con la lucha por el trono en el mundo de Westeros, donde varias casas nobles se preparan para la guerra.', 3),
(1, 'La Ca�da de un Rey', 'Un rey es derrocado, lo que provoca una serie de eventos que desencadenan conflictos y traiciones entre las casas nobles.', 3),
(1, 'La Dama de la Tormenta', 'Los personajes enfrentan desaf�os en medio de tormentas f�sicas y pol�ticas que amenazan con desestabilizar el reino.', 3),
(1, 'La Larga Noche', 'Los personajes se preparan para una invasi�n inminente que pone a prueba sus habilidades y lealtades.', 3),
(1, 'La Muerte de un H�roe', 'Un h�roe de la serie enfrenta una tr�gica muerte que cambia el equilibrio de poder en Westeros.', 3),
(2, 'Regreso de los Muertos', 'Los muertos regresan de manera inesperada, provocando caos y nuevas amenazas en el reino.', 3),
(2, 'Nuevas Alianzas', 'Las casas nobles forman nuevas alianzas en un intento por enfrentar los desaf�os emergentes y asegurar su poder.', 3),
(2, 'Conspiraciones en el Palacio', 'Se revelan conspiraciones dentro del palacio que afectan la pol�tica y el futuro del reino.', 3),
(2, 'Batallas Decisivas', 'Se llevan a cabo batallas decisivas que cambian el rumbo de la guerra y el destino de los personajes.', 3),
(2, 'El Trono de Hierro', 'La temporada concluye con un enfrentamiento final por el trono, con consecuencias significativas para todos los personajes.', 3),
(1, 'El Ascenso de la Reina', 'La serie comienza con el ascenso de Isabel II al trono y los desaf�os iniciales de su reinado.', 4),
(1, 'Los Primeros A�os', 'Isabel enfrenta los primeros desaf�os y decisiones dif�ciles en sus primeros a�os como reina.', 4),
(1, 'La Crisis de Suez', 'Un episodio que explora la crisis de Suez y c�mo afect� la pol�tica internacional y la monarqu�a brit�nica.', 4),
(1, 'El Matrimonio de la Princesa', 'El matrimonio de una princesa brit�nica es un evento significativo que tiene repercusiones en la familia real.', 4),
(1, 'Cambio en la Dinast�a', 'La serie muestra los cambios en la dinast�a real y c�mo afectan la vida y el reinado de Isabel II.', 4),
(2, 'Conflictos Internos', 'Se abordan los conflictos internos en la familia real y c�mo afectan la pol�tica brit�nica.', 4),
(2, 'Desaf�os Internacionales', 'Isabel enfrenta desaf�os internacionales que ponen a prueba su liderazgo y diplomacia.', 4),
(2, 'El A�o del Jubileo', 'El jubileo de Isabel II es un evento importante que se explora en este episodio, mostrando su impacto en la naci�n.', 4),
(2, 'Decisiones Dif�ciles', 'Isabel toma decisiones dif�ciles que afectan el futuro de la monarqu�a y su relaci�n con el pueblo brit�nico.', 4),
(2, 'Reflexiones y Legado', 'La temporada concluye con reflexiones sobre el legado de Isabel II y el futuro de la monarqu�a brit�nica.', 4),
(1, 'La Preparaci�n', 'Un grupo de criminales se prepara para llevar a cabo el mayor atraco a la Real Casa de la Moneda de Espa�a.', 5),
(1, 'El Plan', 'Se revela el plan detallado para el atraco y los desaf�os que el equipo enfrentar� durante la operaci�n.', 5),
(1, 'Dentro de la F�brica', 'El equipo comienza el atraco y se enfrenta a situaciones imprevistas dentro de la Real Casa de la Moneda.', 5),
(1, 'Tensiones Internas', 'Las tensiones entre los miembros del equipo comienzan a surgir, complicando la ejecuci�n del plan.', 5),
(1, 'La Primera Crisis', 'El equipo enfrenta su primera gran crisis durante el atraco, poniendo en peligro el �xito de la operaci�n.', 5),
(2, 'Repercusiones', 'Las consecuencias del atraco comienzan a manifestarse, afectando tanto a los criminales como a sus v�ctimas.', 5),
(2, 'El Cambio de Estrategia', 'El equipo ajusta su estrategia en respuesta a los cambios en la situaci�n y las nuevas amenazas.', 5),
(2, 'Conflictos Externos', 'Surgen conflictos con las fuerzas del orden y otros enemigos externos que complican la situaci�n.', 5),
(1, 'El Lobo Blanco', 'Geralt de Rivia comienza su viaje como cazador de monstruos, enfrent�ndose a criaturas sobrenaturales en un mundo lleno de magia y peligro.', 6),
(1, 'El Destino Cruel', 'Geralt se encuentra con personajes que tienen un destino entrelazado con el suyo, mientras lucha contra enemigos y busca respuestas sobre su propio prop�sito.', 6),
(1, 'La Caza', 'La serie presenta varias cacer�as de monstruos, mostrando el lado oscuro del mundo y la lucha de Geralt por mantener el equilibrio.', 6),
(1, 'La Magia y el Poder', 'Se exploran las intrigas m�gicas y los conflictos pol�ticos que afectan a los personajes y al mundo en el que viven.', 6),
(1, 'El Mito del Lobo', 'Geralt enfrenta un mito antiguo que pone en peligro a todos a su alrededor y revela verdades ocultas sobre su pasado.', 6),
(2, 'El Retorno', 'La segunda temporada comienza con el regreso de Geralt a nuevas tierras y desaf�os, con un enfoque en nuevas aventuras y enemigos.', 6),
(2, 'Aliados y Traiciones', 'Los personajes enfrentan nuevas alianzas y traiciones, mientras la trama se complica y los conflictos se intensifican.', 6),
(2, 'El Hechizo Perdido', 'Geralt busca un hechizo perdido que podr�a cambiar el curso de su misi�n y la estabilidad del mundo.', 6),
(2, 'La Guerra de los Magos', 'Se desata una guerra entre magos que afecta a todos los personajes y sus objetivos, con batallas �picas y conflictos intensos.', 6),
(2, 'El Fin del Viaje', 'La temporada concluye con la resoluci�n de los conflictos principales y el destino final de Geralt y los otros personajes importantes.', 6),
(1, 'El Primer Caso', 'Un episodio que explora el impacto de la tecnolog�a en la privacidad y la vida cotidiana a trav�s de un caso perturbador.', 7),
(1, 'El Futuro del Entretenimiento', 'Se examina un futuro donde el entretenimiento se ha convertido en una obsesi�n que afecta la vida de los personajes de manera extrema.', 7),
(1, 'Redes Sociales', 'La trama gira en torno a una red social que tiene un impacto profundo y a menudo destructivo en las relaciones humanas y la percepci�n de uno mismo.', 7),
(1, 'La Realidad Virtual', 'Un episodio que presenta una inmersi�n en la realidad virtual y los efectos psicol�gicos y sociales que puede tener en los usuarios.', 7),
(1, 'La Medida de la Felicidad', 'Explora una sociedad donde la felicidad se mide y se controla de manera rigurosa, mostrando los efectos en los individuos y la sociedad en general.', 7),
(2, 'Tecnolog�a y Poder', 'La temporada explora c�mo la tecnolog�a puede ser utilizada para controlar y manipular a las personas, con consecuencias impredecibles.', 7),
(2, 'El Precio del Progreso', 'Se aborda el costo del progreso tecnol�gico y c�mo puede llevar a la deshumanizaci�n y el aislamiento.', 7),
(2, 'El Control de la Informaci�n', 'Un episodio sobre c�mo el control de la informaci�n puede cambiar la percepci�n de la realidad y manipular a las masas.', 7),
(2, 'Efectos Colaterales', 'Se presentan los efectos colaterales de una nueva tecnolog�a que promete mejorar la vida pero que tiene consecuencias no deseadas.', 7),
(2, 'Reflexiones Futuras', 'La temporada concluye con una reflexi�n sobre el futuro de la tecnolog�a y su impacto en la humanidad, dejando preguntas abiertas para el espectador.', 7),
(1, 'El Mandaloriano', 'El cazarrecompensas conocido como Mandaloriano comienza su misi�n en una galaxia lejana, enfrent�ndose a peligros y desaf�os.', 8),
(1, 'El Ni�o', 'Mandaloriano descubre a un ni�o con habilidades especiales y enfrenta la decisi�n de protegerlo o entregarlo a sus enemigos.', 8),
(1, 'El Primer Encargo', 'El Mandaloriano recibe su primer encargo importante y enfrenta situaciones complicadas mientras intenta cumplir con su misi�n.', 8),
(1, 'La Alianza', 'El Mandaloriano forma una alianza con otros personajes para enfrentar amenazas comunes y proteger al ni�o.', 8),
(1, 'Rostros Ocultos', 'El Mandaloriano se encuentra con enemigos y aliados con identidades ocultas, creando nuevas complicaciones en su misi�n.', 8),
(2, 'Nuevas Amenazas', 'La segunda temporada presenta nuevas amenazas para el Mandaloriano y el ni�o, con aventuras y desaf�os en el camino.', 8),
(2, 'El Legado', 'Se explora el legado del Mandaloriano y c�mo su pasado influye en sus decisiones y en el desarrollo de la trama.', 8),
(2, 'Caminos Cruzados', 'El Mandaloriano se encuentra con viejos conocidos y enfrenta nuevas alianzas mientras avanza en su misi�n.', 8),
(2, 'El Precio de la Protecci�n', 'El Mandaloriano enfrenta las consecuencias de proteger al ni�o, con conflictos internos y externos que ponen en peligro su misi�n.', 8),
(2, 'El Destino Final', 'La temporada concluye con una resoluci�n importante en la historia del Mandaloriano y el destino del ni�o, marcando un giro crucial en la trama.', 8),
(1, 'Pilot', 'El primer episodio presenta a los empleados de la oficina de ventas de papel, mostrando su din�mica y el estilo de vida laboral.', 9),
(1, 'El Primer D�a', 'Los personajes se ajustan a sus nuevos roles y enfrentan situaciones c�micas mientras intentan establecerse en el entorno de oficina.', 9),
(1, 'La Fiesta de la Oficina', 'Una fiesta en la oficina crea oportunidades para situaciones hilarantes y revela m�s sobre las relaciones entre los empleados.', 9),
(1, 'El Desaf�o de Ventas', 'La oficina enfrenta un desaf�o de ventas que pone a prueba las habilidades y la competencia entre los empleados.', 9),
(1, 'La Reuni�n', 'Una reuni�n de oficina revela los diferentes estilos de liderazgo y gesti�n, creando situaciones c�micas y tensiones entre los empleados.', 9),
(2, 'Nuevos Proyectos', 'La segunda temporada introduce nuevos proyectos y desaf�os para los empleados, con situaciones c�micas y din�micas cambiantes.', 9),
(2, 'El Viaje de Empresa', 'Un viaje de empresa ofrece una visi�n m�s profunda de las relaciones entre los empleados y sus interacciones fuera de la oficina.', 9),
(2, 'Crisis de Recursos Humanos', 'La oficina enfrenta una crisis de recursos humanos que crea situaciones c�micas y conflictos internos.', 9),
(2, 'El Concurso', 'Un concurso en la oficina genera competencias y rivalidades entre los empleados, con resultados inesperados y divertidos.', 9),
(2, 'Cambio de Direcci�n', 'La temporada concluye con un cambio de direcci�n que afecta la din�mica de la oficina y prepara el escenario para futuros episodios.', 9),
(1, 'El Rey del Narco', 'La serie comienza con la ascensi�n de Pablo Escobar como el principal narcotraficante en Colombia y el impacto de sus operaciones.', 10),
(1, 'La Guerra de los C�rteles', 'Se explora la guerra entre c�rteles de narc�ticos en Colombia y las acciones de la DEA para controlar la situaci�n.', 10),
(1, 'La Primera Ca�da', 'Los esfuerzos de las autoridades llevan a la primera ca�da significativa de uno de los principales l�deres del c�rtel.', 10),
(1, 'La Resistencia', 'Pablo Escobar y su c�rtel enfrentan resistencia de las autoridades y rivales, lo que complica a�n m�s la situaci�n.', 10);

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