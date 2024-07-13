# SPRINT 3 - HUB DE ENTRETENIMIENTO - MY HUB - Procesos asíncronos y testing

* Nombre del proyecto - MYHUB
* Nombre del desarrollador: Agustín Aguilar Eusebio
* Usuario de discord: ageus94


### Descripción
Ahora que tenemos nuestro proyecto en angular, lo que sigue es aumentar la dificultad y agregar funcionalidades más actuales con programación asíncrona y además, para asegurar la calidad de nuestro código, utilizar testing que es muy utilizado en la empresas para asegurar esa calidad de código.

Utilizaremos funcionalidad de RXjs y Karma con Jasmine.

Code coverage es una herramienta que nos ayuda a saber cuánto de nuestro código está cubierto por nuestros tests.

### Objetivo

- Dar un primer acercamiento a lo que se refiere programación explicitamente asíncrona.
- Dar un primer acercamiento a lo que se refiere el testing.



### Capturas

![/capturas/cap1.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintThree/capturas/cap1.PNG)
![/capturas/cap2.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintThree/capturas/cap2.PNG)


### Mi code coverage
![/capturas/codecoverage2.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintThree/capturas/codecoverage2.PNG)

### Mi testing
![/capturas/test.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintThree/capturas/test.PNG)

### Instrucciones de uso
- Clonar el proyecto
- cd MyHubSemilleroMega
- git checkout sprintThree
- code .
- open new terminal
- npm install
- ng s
- ctrl + click in link
- enjoy

Para probar los testing:
- ng test
- ng test --code-coverage

### Descripción del proceso

Para empezar tuve que decidir en dónde iba a implementar el RXJS, yo ya tenía algo de programación asíncrona con "this.route.params.subscribe(params =>" según yo, hace uso de rxjs internamente, pero quise manejarlo ya más explicitamente con "of", "pipe", "finalice", "delay" e importando el módulo de rxjs.

Lo que hago con el route.params.suscribe, es que dos propiedades de la clase MediaListComponent están suscritos a los parámetros de la url de Dashboard, al menos así lo entiendo, y entonces cada que cambian esos parámetros y se manda a llamar o se utiliza el componente ligado a esa ruta, pues, dependiendo de los parámetros, cambia el contenido de ese componente MediaList. Esto puede ser disparado desde cualquier lugar de la aplicación.

Después sentí que no era suficiente y entonces hice una funcionalidad para que cuando se esté cargando información del localStorage o se estén filtrando los datos, se muestre una leyenda de que se está cargando la información. Esto desde un servicio.

Para los test la verdad tuve muchos problemas debido a que no sé mucho sobre rxjs y mucho menos a probar/testear cuando se utilizan estos y rutas. A lo que entendí, en el entorno virtual que se genera con lo de los tests, debes de igual manera simular que tienes en el entorno ciertos parámetros esperados para asi poder obtenerlos y con ellos ya hacer el test correspondiente, ya sea que se renderice o cualquier funcionalidad.



### Problemas conocidos

- Entender un poco el rxjs
- Acomodar mis componentes de forma en la que se adapten al cambio del rxjs
- Entender el testing con rxjs
- Simular un tiempo de carga y saber dónde colocarlo para testear esa funcionalida asíncrona


### Retrospectiva
### ¿Qué hice bien?
Las ideas que tuve tan vez no sean las más originales, pero creo que para fines prácticos son los ideales a la hora de aprender y acercarte a una nueva tecnología

### ¿Qué no hice bien?
No tener todo bien organizado y no haber cambiado por completo mi local storage para que de todas las formas se utiliza rxjs para traer los datos, utilizar mucho las rutas cuando no sabía que sumaría complejidad.

### ¿Qué podría mejorar?
Hacer un metodo que esconda mi menu si pico afuera de él