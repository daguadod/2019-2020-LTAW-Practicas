# Práctica 2
Esta práctica se basa en un servidor web de una tienda desarrollado en DJANGO.

Para su ejecución, necesitamos todos los archivos que se encuentran en la carpeta P2-mi_proyectoweb. Posteriormente ejecutamos el servidor con el comando en la terminal: python3 manage.py runserver. En la terminal podemos comprobar si el servidor se ha iniciado correctamente.

En la terminal, podremos comprobar en todo momento los recursos enviados del servidor al cliente como respuesta de las solicitudes del cliente (peticiones GET). Podemos comprobar el estado de dicha REQUEST con las cabeceras informativas.

Para conectarnos a dicho servidor, debemos acceder desde el navegador a la página principal a través de la url http://localhost:8000/mi_tienda.

En este caso, la tienda se llama JarJarBinks en relación al gran lider Sith y contiene ropa de merchandising de la saga StarWars.

En el caso de las solicitudes de recursos, podemos comprobar las pet(iciones GET correspondientes a cada recurso en la propia terminal.

La URL disponibles para ser pedidas por el servidor, se encuentran en urls.py y todas deben ser de la forma http://localhost:8000/mi_tienda/ [...]. Una vez recibidas por dicho servidor, este ejecutara la función de views.py correspondiente, renderizando una página dinámica así como realizando alguna transformación en nuestra base de datos.

A la base de datos se puede acceder a través de la url http://localhost:8000/admin

Funcionalidades de la página web:

 - En la página principal nos encontramos

    - Una barra de búsqueda en la que debemos introducir el producto a buscar o parte de el. Ya cliquemos en el botón de buscar o le demos al enter, el cliente enviará un formulario y si el producto se encuentra en la página web, el servidor devolverá una página similar a la página principal pero con solo el producto deseado.

    - Un hipertexto con la palabra "INICIO" el cual se encuentra en todas las páginas de la tienda lo que permite regresar a la página principal. En este caso, hace la función de actualizar dicha página con los 3 productos disponibles de la tienda.

    - Un hipertexto con "A cerca de". Este hipertexto hará una petición cuya respuesta es una página estática con información de la tienda.

    - Una imagen con la forma de un carro de la compra: Si clicamos en dicha imagen, recibiremos como respuesta del servidor, una página cuya funcionalidad es acceder tanto acceder al carrito de la compra como eliminar el registro de un usuario en concreto rellenando el formulario correspondiente.

    - 3 imágenes correspondientes a los 3 productos de la tienda. Si clicamos en alguna de las 3 imágenes, solicitaremos la página correspondiente a dicho producto.

  - Páginas de los productos:

    - En dichas páginas, nos encontramos tanto con el hipertexto de "INICIO" como el hipertexto de "A cerca de" y la imagen del carrito de la compra cuyas funcionalidades se explican en el apartado anterior.

    - Por otra parte, nos encontramos con la imagen del producto así como el precio y la descripción de este. Si el producto en el que nos encontramos es el deseado, debemos rellenar el formulario que se encuentra en la misma página.
      - Todos los campos se deben rellenar con el contenido correspondiente, teniendo que rellenarse el campo de correo con un correo válido.
      - El campo de producto viene rellenado previamente con el contenido del producto actual.
      - Por último debemos elegir la talla deseada con los radio buttons correspondientes viniendo por defecto la talla M.
      - Una vez terminado el formulario, se enviará al servidor a través del botón "Añadir a la cesta" y el servidor guardará o creará en la base de datos un registro con los datos del cliente así como los productos añadidos a la cesta. El servidor también reducirá la cantidad de stock que tenemos en la tienda de dicho producto.

  - Página del carrito:

    - En dicha página nos encontramos 2 formularios para rellenar:

      - Un primer formulario con el nombre del registro que queremos buscar.
        - Si el cliente ha creado un registro previamente al añadir productos a la cesta, el servidor devolverá la misma página pero conteniendo la información del carrito del cliente (Productos en la cesta con la talla seleccionada y el precio total de todos los productos comprados.)

      - Un segundo formulario con los campos Nombre y Contraseña. Este formulario, enviará los datos del cliente cuyo registro deseemos eliminar. El servidor borrará dicho registro de la base de datos y nos devolverá a la página principal de la tienda.


Todas las páginas de la tienda contienen un encabezado con la imagen y icono además de un pié de página con el contacto de la tienda.

Decir que en relación al diseño, se ha hecho con tamaños y dimensiones fijas de ventana por lo que puede verse distorsionado si no se establece el zoom correcto además de no ser escalable. La anchura correcta es de 1920 pixeles, en relación a una pantalla FullHD.
