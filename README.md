# SPRINT 2 - HUB DE ENTRETENIMIENTO - MY HUB - MIGRACION A ANGULAR

* Nombre del proyecto - MYHUB
* Nombre del desarrollador: Agustín Aguilar Eusebio
* Usuario de discord: ageus94


### Descripción

En el Sprint 2, "MYHUB" se transformará desde una configuración básica de HTML, CSS y JS a una aplicación estructurada con Angular. Angular proporciona un framework potente para construir aplicaciones dinámicas de una sola página (SPA), mejorando la escalabilidad, mantenibilidad y rendimiento general.


### Objetivo

- Estructura de Componentes: Implementar una arquitectura modular basada en componentes para dividir la aplicación en partes reutilizables como la navbar, el dashboard y la lista de carátulas de películas.

- Enrutamiento y Navegación: Configurar Angular Router para gestionar la navegación entre diferentes vistas y componentes de manera eficiente. Cada ruta mostrará los datos correspondientes según el contexto de la aplicación.

- Funcionalidad de Favoritos: Introducir la capacidad de agregar y eliminar elementos a una lista de favoritos. Esto incluye la integración de botones de acción en cada elemento de la lista de películas para facilitar la gestión de favoritos.

- Personalización de Configuración: Implementar una ruta de configuración donde los usuarios puedan personalizar el proyecto, incluyendo la opción de cambiar el color de la fuente globalmente.



### Capturas

![/capturas/cap1.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintTwo/capturas/cap1.PNG)
![/capturas/cap2.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintTwo/capturas/cap2.PNG)
![/capturas/cap3.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintTwo/capturas/cap3.PNG)


### Instrucciones de uso
- Clonar el proyecto
- cd MyHubSemilleroMega
- git checkout sprintTwo
- code .
- open new terminal
- npm install
- ng s
- ctrl + click in link
- enjoy


### Descripción del proceso

Primero, tuve que decidir si utilizar módulos o no. Escuché que las nuevas versiones de Angular estaban alentando a utilizar componentes independientes en lugar de módulos, así que me enfoqué en crear componentes standalone para cada funcionalidad que necesitaba implementar. En cuanto a las vistas, procuré diseñar el dashboard de manera que pudiera ser reutilizado extensamente.

Crear los componentes y transferir el código HTML y CSS fue la parte más sencilla y directa. Sin embargo, adaptar mi código JavaScript existente a TypeScript fue un desafío inicial, dado el cambio en el flujo de trabajo al utilizar un framework como Angular.

A medida que avanzaba, incorporé nuevas funcionalidades y mejoré mis vistas. Esto incluyó aspectos como agregar a favoritos y una pequeña sección de configuración. Una de las partes más complicadas fue implementar el enrutamiento, especialmente al intentar utilizar enrutamiento anidado, lo cual me llevó tiempo comprender y configurar correctamente. Afortunadamente, mi experiencia previa con frameworks como Laravel me proporcionó una base comprensiva para entender los conceptos subyacentes.

Después de configurar las rutas, decidí utilizar localStorage para mantener la consistencia en funcionalidades como cambiar el color en la configuración y guardar elementos en favoritos. Esto aseguró que los datos persistieran localmente y proporcionó una experiencia más coherente para los usuarios.


### Problemas conocidos

- El enrutamiento no lo terminaba de entender, sigo sin entenderlo bien, pero al menos ya hice que funcionara lo que quería que funcionara.
- El cómo hacer que los datos fueran filtrados dependiendo de la ruta en la que estabas.
- Me surgió otro problema con el localStorage, me salía un error "localStorage is not defined", después de un rato, creí que era porque trataba de llamarlo mucho antes de que estuviera disponible, lo solucioné con un try.


### Retrospectiva
### ¿Qué hice bien?
- Utilizar una bandera para los favoritos en lugar de crear otra lista y otro componente a parte
- Lo de utilizar listas para que la vista recorriera en ella algunas cosas como las categorías, o las opciones de favoritos, cerrar sesión, configuraciión. Además de allí almacenar la ruta la cual va a ser utilizada en el click. O utilizar parámaetros en las rutas para filtrar el contenido que tengo.

### ¿Qué no hice bien?
Tal vez no utilizé el local storage a una temprana edad de mi sprint y siento que hubiera dejado el código más limpio y entendible si lo hubiera utilizado desde un principio para no tener que utilizar dos listas de las peliculas.

### ¿Qué podría mejorar?
Usar más el local storage y hacer que se cierre el menú cuando se selecciona una opción.