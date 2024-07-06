# SPRINT 1 - HUB DE ENTRETENIMIENTO - MY HUB


### Descripción

Este es un hub de entretenimiento construido con las tres herramientas básicas de la internet: HTML, CSS Y JS. 

Este repositorio contiene tanto el código como la documentación de este proyecto.


### Objetivo

Lograr crear una base/idea ya desarrollada de un proyecto como lo es un hub de entretenimiento, con las herramientas más básicas ya mencionadas. En el transcurso del desarrollo ir viendo problemáticas, y dar contraste con el desarrollo con un framework (que será la siguiente práctica) a cuando no estás utilizando uno.


* Nombre del proyecto - MYHUB
* Nombre del desarrollador: Agustín Aguilar Eusebio
* Usuario de discord: ageus94

### Capturas

![/capturas/dash menu open small.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintOne/capturas/dash%20menu%20open%20small.JPG)
![/capturas/detalle small.JPG](https://github.com/TheAgeus/MyHubSemilleroMega/blob/sprintOne/capturas/detalle%20small.JPG)


### Instrucciones de uso
- Clonar el proyecto
- Cambiar de rama a sprintOne
- Dar doble click en el index.html


### Descripción del proceso

Para empezar, inicié con un login porque sentí que se debía empezar por la primera vista que vería (válgame la redundancia) el usuario. Después me dí cuenta que debería de planear las vistas y la navegación en general, entonces en un paint, hice mi planeación. 

Fui seccionando las partes por vistas, o por "componentes" cuando el trabajo era más pesado en ciertos lugares. 

No utilizo mucho el direccionamiento porque queía hacerlo algo como una SPA. Además de que para tener varios datos no me llegó la idea de cómo hacerlo de la manera habitual, es decir, direccionando. Además de que pensé que si tenía muchos datos, iba a tener que replicar los archivos de vistas por cada una de las películas o series. Pero creo que fue un gran error, porque creo que pude haber separado más y manejado mejor con una plantilla y teniendo más control sobre la información que muestro cuando estoy en una cierta dirección.

Entonces más que nada estoy (dependiendo de a qué le des click), renderizando en elementos del dom, los items (películas o series), ya sea su cover, su presentación pequeña, la detallada o el reproductor.

Para lo de los videos, como son pesados, preferí utilizar solo uno.


### Problemas conocidos

- Me pasó varias veces que no enlazaba el archivo de js o css bien.
- En el login, me equivoqué de método para leer el valor de un input.
- Fue un problema cuando intenté hacer funcionalidad de "regresarte" porque en sí no utilizo direcciones para cuando navegas entre series.
- Para saber cómo renderizar en el dom, ciertas funciones con atributos, tuve que preguntarle varias cosas al chatgpt.


### Retrospectiva
### ¿Qué hice bien?
El diseño me gustó mucho, hacer que por defecto el tema fuera en modo oscuro me ayudó bastante a no estar tan inconforme con los colores a la hora de desarrollar.

### ¿Qué no hice bien?
En definitiva no haber utilizado más el direccionamiento

### ¿Qué podría mejorar?
El cómo distribuir mejor las vistas, o al menos haber tenido la idea de tener mi vista con dirección y con atributos en la dirección, renderizar lo del valor de esa dirección (sí lo hago) pero debí utilizar más ese recurso.

