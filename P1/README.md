# Práctica 1
Esta práctica se basa en un servidor web de una tienda desarrollado en nodejs.

Para su ejecución, necesitamos todos los archivos que se encuentran en la carpeta P1. Posteriormente ejecutamos el servidor con el comando node server.js.

Para conectarnos a dicho servidor, debemos acceder desde el navegador a la página principal a través de la url http://localhost:8080/.

En este caso, la tienda se llama JarJarBinks en relación al gran lider Sith y contiene ropa de merchandising de la saga StarWars.

En todo momento, podemos observar en la terminal los recursos pedidos por el cliente al servidor. De donde el servidor creará una respuesta con el mime correspondiente.

Lo primero que nos encontramos es la página principal con los 3 productos de nuestra tienda. Esta página ha sido devuelta al cliente por parte del servidor debido a la solicitud de la URL mencionada anteriormente.

La única parte interactiva de dicha página, son las 3 fotos de los productos las cuales si clicamos encima, el cliente envía una solicitud al servidor con la página relacionada al producto clicado.

Una vez solicitada la URL del producto en concreto, el servidor devuelve una página que contiene la información del producto en cuestión incluyendo descripción, producto, precio y talla. En el caso de la talla, esto es simplemente informativo y no produce ninguna acción.

En la parte inferior nos encontramos una sección de contacto la cual es visible en toda la tienda.

En la parte superior, nos encontramos con un hipertexto de inicio así como el icono de la tienda JB. Ambos son clicables y solicitan al servidor la página principal de nuestra tienda.

Decir que en relación al diseño, se ha hecho con tamaños y dimensiones fijas de ventana por lo que puede verse distorsionado si no se establece el zoom correcto además de no ser escalable. La anchura correcta es de 1920 pixeles, en relación a una pantalla FullHD.
