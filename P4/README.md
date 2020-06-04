# Práctica 4

El funcionamiento de la práctica 4 es un chat en el que se puedan comunicar entre varios clientes.

EL chat se basa en un servidor el cual realiza la función de conectar los distintos clientes entre ellos al mismo tiempo que devuelve el recurso de la página web principal del chat así como el archivo del cliente.

Dentro de las funcionalidades del chat nos encontramos:

 - El servidor envía al cliente recién conectado, el número de usuario que eres lo que te permite conocer cuantos usuarios se encuentran en activo ahora mismo.

 - Los mensajes que envías, son reenviados a todos os usuarios que se encuentran conectados ahora mismo.

 - Comandos que envía el cliente al servidor y este devuelve solo al cliente que ha enviado una respuesta en concreto:
    - /help: Lista de comandos disponibles.
    - /date: Fecha del momento en el que se envía dicho comando representada como Día-Mes-Año
    - /list: Número de usuarios conectados en ese momento incluyendo el usuario que envía el comando.
    - /hello: El servidor envía al cliente que lo ha solicitado, un mensaje de bienvenida.
