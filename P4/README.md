# Práctica 4

El funcionamiento de la práctica 4 es un chat en el que se puedan comunicar entre varios clientes.

EL chat se basa en un servidor el cual realiza la función de conectar los distintos clientes entre ellos al mismo tiempo que devuelve el recurso de la página web principal del chat así como el archivo del cliente.

El servidor se ejecuta a través de la terminal con el comando node chat-server.js y los clientes se conectan con la url http://localhost:8080

En la terminal encontramos tanto los recursos solicitados por los clientes como los mensajes que estos envían.

Dentro de las funcionalidades del chat nos encontramos:

 - El servidor envía al cliente recién conectado, el número de usuario que eres lo que te permite conocer cuantos usuarios se encuentran en activo ahora mismo. Del mismo modo, envía al resto de clientes que un usuario nuevo se ha conectado con el número de usuario.

 - Los mensajes que envías, son reenviados a todos os usuarios que se encuentran conectados ahora mismo.

 - Comandos que envía el cliente al servidor y este devuelve solo al cliente que ha enviado una respuesta en concreto:
    - /help: Lista de comandos disponibles.
    - /date: Fecha del momento en el que se envía dicho comando representada como Día-Mes-Año
    - /list: Número de usuarios conectados en ese momento incluyendo el usuario que envía el comando.
    - /hello: El servidor envía al cliente que lo ha solicitado, un mensaje de bienvenida.

- Cuando se desconecta un cliente, el servidor envía un mensaje a todos los usuarios de que un cliente se ha desconectado.
