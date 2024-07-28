# SPRINT 4 - HUB DE ENTRETENIMIENTO - MY HUB - Consumo de Base de datos

* Nombre del proyecto - MYHUB
* Nombre del desarrollador: Agustín Aguilar Eusebio
* Usuario de discord: ageus94


### Descripción
Tenemos una aplicación funcional en ángular, con diseño. Ya implementamos funcionalidad asíncrona y testing, ahora para que se asemeje más a la realidad, vamos a consumir base de datos.

Las bases de datos son una herramienta crucial en el mundo de las aplicaciones y la información. Casi toda aplicación si no es que todas, ocupan bases de datos para mantener concordancia con la información de los usuarios.

En nuestra aplicación aplica lo de dar seguimiento a la información de los usuarios, ya que los usuarios pueden tener películas o series favoritas.

La autentificación es una parte importante de las aplicaciones ya que, no a todo mundo le vamos a facilitar nuestros servicios, ya sea por méritos económicos o de personalización, la autentificación es algo que no debe de faltar en las aplicaciones modernas.

### Objetivo

- Implementar una base de datos para que nuestra aplicación funcione en base a esa base de datos y a los datos que esta contiene.
- Implementación de autentifiación
- Aplicar seguridad a las rutas


### Capturas
Primera entrada en el dashboard al logearse
![/capturas/1.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/1.JPG)

Favoritos
![/capturas/2.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/2.JPG)

Cuando agregas o eliminas un favorito cambia el boton, se actualiza la base de datos y sale un mensaje por consola
![/capturas/3.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/3.JPG)

Puedes cerrar sesion y se borra el toquen, entonces ya no puedes entrar, te redirecciona al login. VER VIDEO EN LA CARPETA DE VIDEOS
![/capturas/4.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/4.JPG)

Agrege pagina de no found para cualquiera que no sea una ruta registrada.
![/capturas/5.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/5.JPG)

Ahora el code coverage y tests
![/capturas/codecoverage.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/codecoverage.JPG)

![/capturas/6.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/6.JPG)

![/capturas/7.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/7.JPG)

![/capturas/8.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/8.JPG)

Diagrama entidad relacion
![/capturas/9.png](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintFour/capturas/9.png)


Las queries las tiengo en el directiorio raiz de este proyecto


### Instrucciones de uso
PARA LA BASE DE DATOS
- Instalar servidor sql express es recomendado
- crear tu base de datos
- generar las tablas y procedimientos desde mi archivo de queries

PARA EL PROYECTO
- Clonar el proyecto
- cd MyHubSemilleroMega
- git checkout sprintFour

PARA EL FRONT
- en una terminal en directiorio raiz del proyecto...
- code .
- open new terminal
- npm install
- ng s
- ctrl + click in link

PARA EL BACK
- abrir otra terminal en la ruta raiz del proyecto
- cd myServer
- poner un .env siguiendo el ejemplo del .env example
- node server.js

Para probar los testing:
- ng test
- ng test --code-coverage

- registra usuarios no se necesita confirmacion de mail
- listo, a disfrutar

### Descripción del proceso

La verdad a principios del sprint me sentía muy relajado, pensé que solo sería una implementación sencilla de una base de datos, pero poco a poco se me fueron presentando problema tras problema, y cada vez se me hacía más complejo el asunto. Para empezar, quise pensar en mis entidades, yo quise utilizar solo cuatro, Usuario, Película, Serie y Capítulo.

Me di cuenta que usuario con serie y pelicula tenian relacion muchos a muchos por lo que se me gerenaron otras dos tablas, para llevar a cabo la relacion de los favoritos de un usuario y los que se esta viendo, pero duplique esa tabla para llevar a cabo ese cometido. Tal vez no fue lo mejor porque dupliqué la complejidad del proyecto. Bueno, despues de haber hecho mis tablas, quise hacer unas queries para irme familiarizando con lo ellas. Después quise hacer la api para conectarla con mi base de datos. Hasta eso todo bien, pero en ese punto recordé que tenía que ser con autentificación, entonces tuve que buscar cómo hacerlo y para encontrarlo y entenderlo me tardé un tiempo.

Para proteger las rutas y eso, también me tomó tiempo comprenderlo, y modificar mis rutas de la api para que funcionaran con auth. 

Después tuve que ver como conectar la aplicacion de angular con la api. Es lo que más me costó trabajo porque tuve que borrar casi todo lo que ya tenía y adaptarlo para que consumiera desde una api y ademas bucar el como conectar el front con la api. 

Despues de batallar mucho, lo logre, desde el front ya hacia peticiones http y me regresaba resultados, despues de unas correcciones y seguir adaptando, ya se logró.

Ya estaba listo para entregar y olvido que tambien había que hacer test de esto, y me ayude mucho de chatgpt porque hay muchas cosas de los test que no entiendo muy bien como funciona y menos cuando hay tanta funcion asíncrona y mucho tema. Pero despues de leer tantos test ya me voy dando una idea.



### Problemas conocidos

- el como hacer peticiones http se me dificulto mucho, el tema de seguridad tambien
- el tener que cambiar y adaptar el código que ya tenía se me hizo pesado también además de hacer los test
- lo de la programacion asíncrona también y el local storage me volvió a pasar, además del cors, aunque eso estuvo más facil de solucionar


### Retrospectiva
### ¿Qué hice bien?
Sigo creyendo que mi interfaz de usuario es muy bonita, el usar tokens para la autorizacion y basarme en el para no tener que tomar el id del usuario, aunque creo que eso ya se hace en todos lados desde el token.

### ¿Qué no hice bien?
No planificar bien las consultas antes de implementar la api, pensar en todas las posibles consultas que se me iban a presentar que realizara

### ¿Qué podría mejorar?
definitivamente el diseño de la api y también, ahora que se usar un poco más ángular, planificar mejor la aplicacion, los servicios, los guards, las rutas.