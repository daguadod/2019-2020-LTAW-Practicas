//-- Modulo https
const http = require('http');
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
// --Modulo URL
const url = require('url');
//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');
console.log("Arrancando servidor...")

//VARIABLES GENERALES PARA TODO EL CODIGO
//Creamos un Array con los productos de nuestra tienda para poder trabajar con ellos
let productos = ["camiseta", "zapatilla", "gorra"];
//Resultados a devolver
let resultado = "";
//Contenidos de las request
let content = "";
let parametro = "";
let parametro1 = "";
let parametro2 = "";
let parametro3 = "";
let parametro4 = "";
//-- Variable que servirá para devolver un archivo
let filename = "";
let new_user = Boolean;
//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function petition(req, res) {

  //Reiniciamos las variables
  resultado = "";
  content = "";
  filename = "";
  parametro = "";
  parametro1 = "";
  parametro2 = "";
  parametro3 = "";
  parametro4 = "";
  new_user = true;
  //COOKIES enviadas por el cliente ya que se guardan en el browser
  const cookie = req.headers.cookie;
  //-- Peticion recibida
  console.log("Peticion recibida");
  console.log("Recurso solucitado (URL): " + req.url)

  let q = url.parse(req.url, true);

  //Parte de query
  console.log("Pathname: " +  q.pathname);
  //Comprobamos la URL que se solicita
  switch (q.pathname) {
    //Solicitud de la página principal (index)
    case "/":
      filename = "Web_1.html";
      break;
    //Caso que se solicita envía un form (este caso es la búsqueda de productos)
    case "/busqueda":
      if (req.method === 'POST') {
        //Creamos un procedimiento cuando ocurre el evento request
        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            //-- Añadir los datos a la respuesta
            content += data;
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            //Guardamos como parametro el contenido tecleado por el usuario (Producto = "")
            parametro = content.split("=")[1];
            //Iteramos entre los productos de la tienda
            for (let i=0; i < productos.length; i++) {
              let x = -1;
              //La función indexOf busca dentro de un array, sí esta contenido otro array como parámetro e indica su posición
              x = productos[i].indexOf(parametro);
              //Al buscar el comienzo del array, la posición debe ser 0
              if (x == 0){
                //--  En este caso ningún producto comparte empiece por lo que no tendremós problemas de multiples resultados
                resultado = productos[i];
              }
            }
            //Observamos el resultado anterior y devolvemos la página correspondiente a dicho producto
            switch (resultado) {
              case "camiseta":
                filename = "Web_2.html";
                break;
              case "zapatilla":
                filename = "Web_3.html";
                break;
              case "gorra":
                filename = "Web_4.html";
                break;
              default:
            }
          });
          //Se llama a la función inmediatamente después de haber llamado a la anterior
          req.on('end', ()=> {
            //Leemos la variable que contiene el nombre del fichero que queremos enviar
            fs.readFile(filename, (err, data) => {
              ///--Fichero no encontrado en el caso de que no se encuentre el producto en nuestra tienda
              if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("<h1>Product doesnt exist</h1>");
                return res.end();
              }else {
                //-- Si el producto era correcto, devolvemos la página con el fichero
                res.writeHead(200, {'Content-Type': "text/html"});
                res.write(data);
                return res.end();
              }
            })
          })
          return
        }
      break;
    case "/registro":
      if (req.method === 'POST') {
        req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
          data = chunk.toString();
          console.log(data);
          parametro1 = data.split("=")[1].split("&")[0];
          parametro2 = data.split("&")[1].split("=")[1];
        })
        filename = "Web_1.html";
        req.on('end', () => {
          fs.readFile(filename, (err, data) => {
            //-- Tipo mime por defecto html
            if(cookie){
              for (var i = 0; i < cookie.split("; ").length; i++) {
                if (cookie.split("; ")[i].split("=")[0] == parametro1) {
                  new_user = false;
                  break;
                }
              }
              if (new_user) {
                res.setHeader("Set-Cookie", parametro1 + "=" +  "");
              }
            }else{
              res.setHeader("Set-Cookie", parametro1 + "=" + "");
            }
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
          })
        })
        return
      }
      break;
    //Solicitud de registro con la acción compra y el método POST (Igual que el myform anterior)
    case "/compra":
      if (req.method === 'POST') {
        req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
          data = chunk.toString();
          //Guardamos tanto el nombre del cliente como el producto que desea comprar
          parametro1 = data.split("=")[0];
          parametro2 = data.split("=")[1];
          //Comprobamos si existen cookies
          if(cookie){
            content = "";
            //Iteramos entre las distintas cookies (Se encuentran separadas por defecto por ; )
            for (var i = 0; i < cookie.split("; ").length; i++) {
              //Comprobamos que el nombre de la cookie actual es igual que el nombre del cliente que quiere comprar
              if (cookie.split("; ")[i].split("=")[0] == parametro2) {
                new_user = false;
                //Actualizamos el Value de la cookie (Nombre=Value) añadiendo el producto a esta
                content = cookie.split("; ")[i].split("=")[1] += parametro1 += "/";
                //Enviamos la cookie como respuesta al cliente para que la almacene en el browser
                res.setHeader("Set-Cookie", parametro2 + "=" + content);
                //Volvemos a la página principal tras la compra
                filename = "Web_1.html";
                break;
              }
            }
            //Si no se encuentra registrado le enviamos a registrarse
            if (new_user) {
              filename = "sesion.html";
            }
            //Si no se encuentra registrado le enviamos a registrarse
          }else{
            filename = "sesion.html";
          }
        })
        req.on('end', () => {
          //Enviamos el archivo al cliente,en este caso el error no está contemplado puesto que filename siempre tendrá valor
          fs.readFile(filename, (err, data) => {
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
          })
        })
        return
      }
      break;
    //Solicitud de consultar el carrito(Mismo formato que el anterior, es un POST con datos)
    case "/carrito":
      if (req.method === 'POST') {
        req.on('data', chunk => {
          //Guardamos los datos del cliente "nombre, apellido, correo, método de pago"
          data = chunk.toString();
          parametro1 = data.split("&")[0].split("=")[1];
          parametro2 = data.split("&")[1].split("=")[1];
          parametro3 = data.split("&")[2].split("=")[1];
          parametro4 = data.split("&")[3].split("=")[1];
          //Generamos un html al vuelo con los datos personalizados del cliente
          content = `
          <!DOCTYPE html>
          <html>
          	<head>
          		<meta name="viewport" content="width=device-width, initial-scale=1.0">
          		<title>CARRITO</title>
          		<link rel="Stylesheet" type="text/css" href="styles.css"/>
          		<link rel="shortcut icon" href="LOGO.png">
          	</head>
          	<body>
          		<div id="Web_2">
          			<svg class="RECTANGULO_superior">
          				<rect fill="rgba(0,0,0,1)" rx="0" ry="0" x="0" y="0" width="1920" height="138">
          				</rect>
          			</svg>
          			<div id="INICIO">
          				<a class = "Hypertext" href="Web_1.html"><span>INICIO</span></a>
          			</div>
          			<div id="INICIO_JB">
          			<a class = "Hypertext" href="Web_1.html"><img id="J" src="JB.png"></a>
          			</div>
          		  <p id="nombretxt">AQUI TIENE SUS DATOS:</p>
                <p id="name">Nombre: `
                //Añadimos los parametros al documento html al vuelo en content
          content += parametro1 += `</p><br><p id="apellido">Apellido:`
          content += parametro2 += `</p><br><p id="correo">Correo: `
          content += parametro3 += `</p><br><p id="pago">Pago: `
          content += parametro4 += `</p><br><p id="productos">Tus productos son: `
          parametro1 = data.split("&")[0].split("=")[1];
          parametro2 = data.split("&")[1].split("=")[1];
          parametro3 = data.split("&")[2].split("=")[1];
          parametro4 = data.split("&")[3].split("=")[1];
          //-- Iteramos entre las cookies almacenadas
          if(cookie){
            for (var i = 0; i < cookie.split("; ").length; i++) {
              if (cookie.split("; ")[i].split("=")[0] == parametro1) {
                //Guardamos el value de la cookie correspondiente al cliente en concreto
                products = cookie.split("; ")[i].split("=")[1];
                content += products += `</p><br>`
                content +=
                     `<svg class="RECTANGULO_CONTACTO1">
                				<rect fill="rgba(0,0,0,1)" rx="0" ry="0" x="0" y="0" width="1920" height="179">
                				</rect>
                			</svg>
                			<div id="Contacto2">
                				<span>Contacto</span><br><span>Tlf: 68899955<br/>Email : jarjarbinks_shop.jarjar.es</span>
                			</div>
                		</div>
                	</body>
                </html> `
                new_user = false;
                break;
              }
            }
            //Enviamos a registrarse si no está registrado
            if (new_user) {
              filename = "sesion.html";
            }
          }else{
            filename = "sesion.html";
          }
        })
        req.on('end', ()=> {
        //Devolvemos el archivo html como respuesta ya sea el creado al vuelo o el de registro
          fs.readFile(filename, (err, data) => {
            res.writeHead(200, {'Content-Type': "text/html"});
            if (new_user) {
              //html de registro
              res.write(data);
              return res.end();
            }else{
              //html creado al vuelo
              res.writeHead(200, {'Content-Type': "text/html"});
              res.write(content);
              return res.end();
            }
          })
        })
        return
      }
      break;
      //Usamos myquery para ir enviando datos de sugerencia mientras se busca un producto
    case "/myquery":
      const params = q.query;
      console.log(params.param1);
      //-- El array de productos lo pasamos a una cadena de texto,
      //-- en formato JSON:
      //--Recorrer los productos del objeto JSON
      for (let i=0; i < productos.length; i++) {
        x = -1;
        //Empleamos la función indexOf para saber si lo que está escribiendo el cliente corresponde al inicio de algún producto
        x = productos[i].toLowerCase().indexOf(params.param1.toLowerCase());
        //-- Añadir cada producto al párrafo de visualización (Al no compartir empiece ningún producto, será un único producto)
        if (x == 0){
          resultado += productos[i];
        }
      }
      content = JSON.stringify(resultado) + '\n';
      //-- Generar el mensaje de respuesta
      //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
      //-- en la cabecera Content-Type||MIME
      res.setHeader('Content-Type', 'application/json');
      res.write(content);
      res.end();
      return
      break;
    default:
      filename = q.pathname.substr(1);
  }
  //Extraemos la terminación del recurso solicitado para poder generar el mime correspondiente
  let extension = filename.split(".")[1];
  console.log(extension);
  let mime = "";
  switch (extension) {
    case "js":
      mime = "application/js"
    case "jpg":
      mime = "imagen/jpg";
      break;
    case "png":
      mime = "imagen/png";
      break;
    case "gif":
      mime = "imagen/gif";
      break;
    case "ico":
      mime = "imagen/ico";
      break;
    case "html":
      mime = "text/html";
      break;
    case "css":
      mime = "text/css";
      break;
    case "json":
      mime = "application/json";
      break;
    default:
      mime = "text/html";
  }
  //_- Crear el mensaje de respuesta. Primero la cabecera
  //-- El código 200 se usa para indicar que todo está ok
  //-- En el campo Content-Type tenemos que introducir el tipo MIME
  //-- de lo que devolvemos
  if (q.pathname != "/myquery" | q.pathname != "/busqueda") {
    //Leer fihchero html
    fs.readFile(filename, (err, data) => {

      //--Fichero no encontrado
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      };

      //-- Tipo mime por defecto html
      res.writeHead(200, {'Content-Type': mime});
      return res.end(data);
    });
  };
}


//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(petition);

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!");
console.log("Escuchando en puerto: " + PUERTO);
