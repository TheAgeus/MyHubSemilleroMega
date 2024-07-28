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
('The Mandalorian', 'Ambientada en el universo de Star Wars, la serie sigue las aventuras de un cazarrecompensas solitario conocido como Mandaloriano, que viaja a través de los confines de la galaxia en busca de su próximo objetivo. La trama se enriquece con el descubrimiento de un niño con habilidades especiales y la lucha por protegerlo de fuerzas peligrosas.', 'Acción', 'https://m.media-amazon.com/images/I/71OnyVp1DJL._AC_UF894,1000_QL80_.jpg'),
('The Office', 'Esta serie de comedia ofrece una visión hilarante de la vida diaria en una oficina de ventas de papel. A través de un estilo de falso documental, se exploran las dinámicas personales y profesionales entre los empleados, destacando las situaciones cómicas y los conflictos cotidianos que surgen en el entorno laboral.', 'Comedia', 'https://m.media-amazon.com/images/I/71oaJCGFJRL._AC_UF894,1000_QL80_.jpg'),
('Narcos', 'La serie narra el auge y la caída de los cárteles de narcóticos en Colombia, enfocándose en el infame Pablo Escobar y las operaciones de la DEA para combatir el tráfico de drogas. Con una representación realista y cruda, la serie explora la violencia, la corrupción y el impacto social del narcotráfico en la región.', 'Crimen', 'https://moviepostermexico.com/cdn/shop/products/narcos_xlg_1012x.jpg?v=1584379581');


-- Insert test chapters
INSERT INTO [Chapters] (season_number_c, title_c, description_c, serie_id) VALUES
(1, 'Piloto', 'Walter White, un profesor de química, recibe un diagnóstico de cáncer terminal y decide fabricar metanfetaminas para asegurar el futuro financiero de su familia.', 1),
(1, 'Correr o Morir', 'Walter y Jesse enfrentan los primeros problemas con la producción de metanfetaminas y se encuentran con sus primeros obstáculos legales y personales.', 1),
(1, 'Enemigos de la Calle', 'Walter se adentra en el mundo del crimen y enfrenta amenazas de los narcotraficantes mientras trata de mantener su doble vida.', 1),
(1, 'Cuánto Costará', 'La tensión aumenta cuando Walter debe manejar una situación complicada con su socio, Jesse, mientras las consecuencias de sus decisiones comienzan a hacerse evidentes.', 1),
(1, 'Granada', 'Los problemas de Walter y Jesse llegan a un punto crítico cuando enfrentan un peligro inminente que pone en riesgo su operación de metanfetaminas.', 1),
(2, 'Nuevo Socio', 'Walter busca un nuevo socio para ayudar en la producción de metanfetaminas, lo que lleva a nuevos conflictos y complicaciones.', 1),
(2, 'Riesgo de Exposición', 'Walter y Jesse enfrentan el riesgo de ser descubiertos mientras intentan expandir su operación en un mercado cada vez más competitivo.', 1),
(2, 'El Método de la Estufa', 'Walter utiliza métodos no convencionales para resolver problemas, mientras sus acciones empiezan a tener consecuencias inesperadas.', 1),
(2, 'La Caída', 'Las decisiones de Walter llevan a un colapso en su vida personal y profesional, lo que crea una situación insostenible.', 1),
(2, 'Fin de la Carrera', 'La temporada concluye con un enfrentamiento decisivo que marca un giro importante en la vida de Walter y en la trama general.', 1),
(1, 'Desaparición', 'Un niño desaparece en un pequeño pueblo y sus amigos comienzan una búsqueda desesperada, descubriendo un mundo oculto.', 2),
(1, 'La Niña Extraña', 'Un grupo de amigos encuentra a una niña con habilidades especiales que parece tener conexión con la desaparición del niño.', 2),
(1, 'Experimentos Secretos', 'Se revelan experimentos secretos realizados por el gobierno que podrían estar relacionados con los eventos paranormales.', 2),
(1, 'El Mundo del Revés', 'Los personajes descubren un mundo paralelo que está causando los fenómenos inexplicables en su pueblo.', 2),
(1, 'La Búsqueda Continúa', 'La búsqueda del niño desaparecido lleva a los personajes a enfrentar peligros desconocidos en el mundo alternativo.', 2),
(2, 'Regresos Inesperados', 'Los personajes enfrentan nuevas amenazas mientras los eventos del mundo del revés continúan afectando sus vidas.', 2),
(2, 'Aliados y Enemigos', 'Los personajes hacen alianzas con nuevos aliados para enfrentar a los enemigos que se han vuelto más poderosos.', 2),
(2, 'Ecos del Pasado', 'Se revelan más detalles sobre el pasado de los personajes y cómo se relacionan con los eventos paranormales.', 2),
(2, 'El Último Enfrentamiento', 'El enfrentamiento final contra las fuerzas del mundo del revés pone en juego la vida de los personajes y su futuro.', 2),
(2, 'Nuevos Comienzos', 'La temporada concluye con los personajes ajustando sus vidas después de los eventos dramáticos que han ocurrido.', 2),
(1, 'Un Juego de Tronos', 'La serie comienza con la lucha por el trono en el mundo de Westeros, donde varias casas nobles se preparan para la guerra.', 3),
(1, 'La Caída de un Rey', 'Un rey es derrocado, lo que provoca una serie de eventos que desencadenan conflictos y traiciones entre las casas nobles.', 3),
(1, 'La Dama de la Tormenta', 'Los personajes enfrentan desafíos en medio de tormentas físicas y políticas que amenazan con desestabilizar el reino.', 3),
(1, 'La Larga Noche', 'Los personajes se preparan para una invasión inminente que pone a prueba sus habilidades y lealtades.', 3),
(1, 'La Muerte de un Héroe', 'Un héroe de la serie enfrenta una trágica muerte que cambia el equilibrio de poder en Westeros.', 3),
(2, 'Regreso de los Muertos', 'Los muertos regresan de manera inesperada, provocando caos y nuevas amenazas en el reino.', 3),
(2, 'Nuevas Alianzas', 'Las casas nobles forman nuevas alianzas en un intento por enfrentar los desafíos emergentes y asegurar su poder.', 3),
(2, 'Conspiraciones en el Palacio', 'Se revelan conspiraciones dentro del palacio que afectan la política y el futuro del reino.', 3),
(2, 'Batallas Decisivas', 'Se llevan a cabo batallas decisivas que cambian el rumbo de la guerra y el destino de los personajes.', 3),
(2, 'El Trono de Hierro', 'La temporada concluye con un enfrentamiento final por el trono, con consecuencias significativas para todos los personajes.', 3),
(1, 'El Ascenso de la Reina', 'La serie comienza con el ascenso de Isabel II al trono y los desafíos iniciales de su reinado.', 4),
(1, 'Los Primeros Años', 'Isabel enfrenta los primeros desafíos y decisiones difíciles en sus primeros años como reina.', 4),
(1, 'La Crisis de Suez', 'Un episodio que explora la crisis de Suez y cómo afectó la política internacional y la monarquía británica.', 4),
(1, 'El Matrimonio de la Princesa', 'El matrimonio de una princesa británica es un evento significativo que tiene repercusiones en la familia real.', 4),
(1, 'Cambio en la Dinastía', 'La serie muestra los cambios en la dinastía real y cómo afectan la vida y el reinado de Isabel II.', 4),
(2, 'Conflictos Internos', 'Se abordan los conflictos internos en la familia real y cómo afectan la política británica.', 4),
(2, 'Desafíos Internacionales', 'Isabel enfrenta desafíos internacionales que ponen a prueba su liderazgo y diplomacia.', 4),
(2, 'El Año del Jubileo', 'El jubileo de Isabel II es un evento importante que se explora en este episodio, mostrando su impacto en la nación.', 4),
(2, 'Decisiones Difíciles', 'Isabel toma decisiones difíciles que afectan el futuro de la monarquía y su relación con el pueblo británico.', 4),
(2, 'Reflexiones y Legado', 'La temporada concluye con reflexiones sobre el legado de Isabel II y el futuro de la monarquía británica.', 4),
(1, 'La Preparación', 'Un grupo de criminales se prepara para llevar a cabo el mayor atraco a la Real Casa de la Moneda de España.', 5),
(1, 'El Plan', 'Se revela el plan detallado para el atraco y los desafíos que el equipo enfrentará durante la operación.', 5),
(1, 'Dentro de la Fábrica', 'El equipo comienza el atraco y se enfrenta a situaciones imprevistas dentro de la Real Casa de la Moneda.', 5),
(1, 'Tensiones Internas', 'Las tensiones entre los miembros del equipo comienzan a surgir, complicando la ejecución del plan.', 5),
(1, 'La Primera Crisis', 'El equipo enfrenta su primera gran crisis durante el atraco, poniendo en peligro el éxito de la operación.', 5),
(2, 'Repercusiones', 'Las consecuencias del atraco comienzan a manifestarse, afectando tanto a los criminales como a sus víctimas.', 5),
(2, 'El Cambio de Estrategia', 'El equipo ajusta su estrategia en respuesta a los cambios en la situación y las nuevas amenazas.', 5),
(2, 'Conflictos Externos', 'Surgen conflictos con las fuerzas del orden y otros enemigos externos que complican la situación.', 5),
(1, 'El Lobo Blanco', 'Geralt de Rivia comienza su viaje como cazador de monstruos, enfrentándose a criaturas sobrenaturales en un mundo lleno de magia y peligro.', 6),
(1, 'El Destino Cruel', 'Geralt se encuentra con personajes que tienen un destino entrelazado con el suyo, mientras lucha contra enemigos y busca respuestas sobre su propio propósito.', 6),
(1, 'La Caza', 'La serie presenta varias cacerías de monstruos, mostrando el lado oscuro del mundo y la lucha de Geralt por mantener el equilibrio.', 6),
(1, 'La Magia y el Poder', 'Se exploran las intrigas mágicas y los conflictos políticos que afectan a los personajes y al mundo en el que viven.', 6),
(1, 'El Mito del Lobo', 'Geralt enfrenta un mito antiguo que pone en peligro a todos a su alrededor y revela verdades ocultas sobre su pasado.', 6),
(2, 'El Retorno', 'La segunda temporada comienza con el regreso de Geralt a nuevas tierras y desafíos, con un enfoque en nuevas aventuras y enemigos.', 6),
(2, 'Aliados y Traiciones', 'Los personajes enfrentan nuevas alianzas y traiciones, mientras la trama se complica y los conflictos se intensifican.', 6),
(2, 'El Hechizo Perdido', 'Geralt busca un hechizo perdido que podría cambiar el curso de su misión y la estabilidad del mundo.', 6),
(2, 'La Guerra de los Magos', 'Se desata una guerra entre magos que afecta a todos los personajes y sus objetivos, con batallas épicas y conflictos intensos.', 6),
(2, 'El Fin del Viaje', 'La temporada concluye con la resolución de los conflictos principales y el destino final de Geralt y los otros personajes importantes.', 6),
(1, 'El Primer Caso', 'Un episodio que explora el impacto de la tecnología en la privacidad y la vida cotidiana a través de un caso perturbador.', 7),
(1, 'El Futuro del Entretenimiento', 'Se examina un futuro donde el entretenimiento se ha convertido en una obsesión que afecta la vida de los personajes de manera extrema.', 7),
(1, 'Redes Sociales', 'La trama gira en torno a una red social que tiene un impacto profundo y a menudo destructivo en las relaciones humanas y la percepción de uno mismo.', 7),
(1, 'La Realidad Virtual', 'Un episodio que presenta una inmersión en la realidad virtual y los efectos psicológicos y sociales que puede tener en los usuarios.', 7),
(1, 'La Medida de la Felicidad', 'Explora una sociedad donde la felicidad se mide y se controla de manera rigurosa, mostrando los efectos en los individuos y la sociedad en general.', 7),
(2, 'Tecnología y Poder', 'La temporada explora cómo la tecnología puede ser utilizada para controlar y manipular a las personas, con consecuencias impredecibles.', 7),
(2, 'El Precio del Progreso', 'Se aborda el costo del progreso tecnológico y cómo puede llevar a la deshumanización y el aislamiento.', 7),
(2, 'El Control de la Información', 'Un episodio sobre cómo el control de la información puede cambiar la percepción de la realidad y manipular a las masas.', 7),
(2, 'Efectos Colaterales', 'Se presentan los efectos colaterales de una nueva tecnología que promete mejorar la vida pero que tiene consecuencias no deseadas.', 7),
(2, 'Reflexiones Futuras', 'La temporada concluye con una reflexión sobre el futuro de la tecnología y su impacto en la humanidad, dejando preguntas abiertas para el espectador.', 7),
(1, 'El Mandaloriano', 'El cazarrecompensas conocido como Mandaloriano comienza su misión en una galaxia lejana, enfrentándose a peligros y desafíos.', 8),
(1, 'El Niño', 'Mandaloriano descubre a un niño con habilidades especiales y enfrenta la decisión de protegerlo o entregarlo a sus enemigos.', 8),
(1, 'El Primer Encargo', 'El Mandaloriano recibe su primer encargo importante y enfrenta situaciones complicadas mientras intenta cumplir con su misión.', 8),
(1, 'La Alianza', 'El Mandaloriano forma una alianza con otros personajes para enfrentar amenazas comunes y proteger al niño.', 8),
(1, 'Rostros Ocultos', 'El Mandaloriano se encuentra con enemigos y aliados con identidades ocultas, creando nuevas complicaciones en su misión.', 8),
(2, 'Nuevas Amenazas', 'La segunda temporada presenta nuevas amenazas para el Mandaloriano y el niño, con aventuras y desafíos en el camino.', 8),
(2, 'El Legado', 'Se explora el legado del Mandaloriano y cómo su pasado influye en sus decisiones y en el desarrollo de la trama.', 8),
(2, 'Caminos Cruzados', 'El Mandaloriano se encuentra con viejos conocidos y enfrenta nuevas alianzas mientras avanza en su misión.', 8),
(2, 'El Precio de la Protección', 'El Mandaloriano enfrenta las consecuencias de proteger al niño, con conflictos internos y externos que ponen en peligro su misión.', 8),
(2, 'El Destino Final', 'La temporada concluye con una resolución importante en la historia del Mandaloriano y el destino del niño, marcando un giro crucial en la trama.', 8),
(1, 'Pilot', 'El primer episodio presenta a los empleados de la oficina de ventas de papel, mostrando su dinámica y el estilo de vida laboral.', 9),
(1, 'El Primer Día', 'Los personajes se ajustan a sus nuevos roles y enfrentan situaciones cómicas mientras intentan establecerse en el entorno de oficina.', 9),
(1, 'La Fiesta de la Oficina', 'Una fiesta en la oficina crea oportunidades para situaciones hilarantes y revela más sobre las relaciones entre los empleados.', 9),
(1, 'El Desafío de Ventas', 'La oficina enfrenta un desafío de ventas que pone a prueba las habilidades y la competencia entre los empleados.', 9),
(1, 'La Reunión', 'Una reunión de oficina revela los diferentes estilos de liderazgo y gestión, creando situaciones cómicas y tensiones entre los empleados.', 9),
(2, 'Nuevos Proyectos', 'La segunda temporada introduce nuevos proyectos y desafíos para los empleados, con situaciones cómicas y dinámicas cambiantes.', 9),
(2, 'El Viaje de Empresa', 'Un viaje de empresa ofrece una visión más profunda de las relaciones entre los empleados y sus interacciones fuera de la oficina.', 9),
(2, 'Crisis de Recursos Humanos', 'La oficina enfrenta una crisis de recursos humanos que crea situaciones cómicas y conflictos internos.', 9),
(2, 'El Concurso', 'Un concurso en la oficina genera competencias y rivalidades entre los empleados, con resultados inesperados y divertidos.', 9),
(2, 'Cambio de Dirección', 'La temporada concluye con un cambio de dirección que afecta la dinámica de la oficina y prepara el escenario para futuros episodios.', 9),
(1, 'El Rey del Narco', 'La serie comienza con la ascensión de Pablo Escobar como el principal narcotraficante en Colombia y el impacto de sus operaciones.', 10),
(1, 'La Guerra de los Cárteles', 'Se explora la guerra entre cárteles de narcóticos en Colombia y las acciones de la DEA para controlar la situación.', 10),
(1, 'La Primera Caída', 'Los esfuerzos de las autoridades llevan a la primera caída significativa de uno de los principales líderes del cártel.', 10),
(1, 'La Resistencia', 'Pablo Escobar y su cártel enfrentan resistencia de las autoridades y rivales, lo que complica aún más la situación.', 10);

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
        WHEN uhm.movie_id IS NOT NULL THEN 'Sí'
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
        WHEN uhm.serie_id IS NOT NULL THEN 'Sí'
        ELSE 'No'
    END AS es_favorito
FROM 
    Series s
LEFT JOIN 
    (SELECT serie_id FROM Users_has_favorite_series WHERE user_id = 1) uhm
ON 
    s.id = uhm.serie_id;



*/