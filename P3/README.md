# Práctica 3

Esta práctica se basa en un servidor web de una tienda desarrollado con nodejs

Para su ejecución, necesitamos todos los archivos que se encuentran en la carpeta P3. Posteriormente ejecutamos el servidor con el comando en la terminal: node server.js. En la terminal podemos comprobar si el servidor se ha iniciado correctamente y en que puerto está escuchando.

En la terminal, podremos comprobar en todo momento los recursos que solicitan los clientes al servidor. Para conectarse a dicho servidor, debemos introducir en el navegador la url http://localhost:8080/ la cual hace una petición al servidor que nos devuelve como respuesta la página principal de nuestra página web.

En este caso, la tienda se llama JarJarBinks y contiene ropa de merchandising de la saga StarWars.

La estructura de la página web es la siguiente:

  - Página principal: La cual contiene como objetos interactivos:

    - Una barra de búsqueda en la cual podemos buscar el producto que deseamos. En el momento de introducir 3 o más caracteres de dicho producto, debajo de la barra aparecerá el producto correspondiente como sugerencia. Si pasamos el cursor por encima de dicho producto, la barra de búsqueda se auto rellenará. Esto lo realiza el programa client.js enviando una petición AJAX al servidor cada vez que escribimos en dicha barra.
    Así mismo, si damos a buscar solo con un fragmento del nombre del producto o con el nombre entero, el cliente lo enviará al servidor como petición con formulario y este devolverá la página web del producto deseado.
    En el caso de no encontrarse el producto dentro de la tienda, el servidor nos devolverá una respuesta en formato html de que el producto no existe.

    - Hipertexto de "REGISTRO": Nos derivará a una página web en la que se encuentra un formulario a rellenar con los campos de nombre y contraseña.

    - Imagen de carrito: Si clicamos en esta imagen, se enviará al servidor la petición de la página web del carrito.

    - 3 Imágenes correspondientes a los 3 objetos de la tienda. Si clicamos en cualquiera de las imágenes, se enviará una petición al servidor con el nombre de la página correspondiente al producto seleccionado.

  - Página de registro:

    - Al rellenar el formulario y enviarlo al servidor, este creará una cookie con los datos del cliente (en esta versión primitiva solo guarda el nombre) y se la enviará para que el cliente la almacene en el navegador para poder realizar sus compras. El servidor también devolverá la página web principal de la tienda. Si existe una cookie con el mismo nombre de usuario, el servidor no modificará dicha cookie.

  - Página de carrito:

    En esta página web, nos encontramos con un formulario con los datos de nombre, contraseña, correo y 3 radio buttons del método de pago. Siendo todos los campos obligatorios y debiendo rellenarse en el formato correcto.
    Al enviar los datos en forma de petición AJAX a través del programa client2.js, el servidor comparará los datos con los guardados en las cookies del cliente:

    - Si tiene una cookie con el cliente, el servidor devolverá como respuesta a la petición AJAX todos los productos que contenga el usuario buscado en la cookie correspondiente y el cliente los representará en el lateral izquierdo de la ventana en forma de ticket de compra virtual con todos los datos proporcionados.

    - Si no existe una cookie, aparecerá un mensaje indicando que el usuario que se busca no se ha registrado y debe registrarse primero.

  - Páginas de los productos:

    En estas páginas nos encontramos con la imagen del producto, descripción y precio del mismo. Así como unas imágenes de las tallas disponibles aunque estas son meramente estéticas y no contienen ninguna funcionalidad.

    También, se dispone de una barra a rellenar en forma de formulario. Este formulario debe rellenarse con el nombre del cliente que desea adquirir dicho producto para así añadirlo en la cookie correspondiente a su carrito. Si el usuario no se encontrara registrado, el servidor nos enviará automáticamente a la página de registro.

En todas páginas nos encontramos con un pie de página conteniendo la información de contacto de la empresa. Además, en todas las páginas excluyendo la principal, nos encontramos con un encabezado que contiene un hipertexto "INICIO" así como el logo de la compañía siendo ambos interactivos y enviando al servidor una petición de la página principal de la tienda.

Decir que en relación al diseño, se ha hecho con tamaños y dimensiones fijas de ventana por lo que puede verse distorsionado si no se establece el zoom correcto además de no ser escalable. La anchura correcta es de 1920 pixeles, en relación a una pantalla FullHD.
