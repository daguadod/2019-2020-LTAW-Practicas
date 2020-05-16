//-- Modulo https
const http = require('http');
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
// --Modulo URL
const url = require('url');
//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');
console.log("Arrancando servidor...")

let productos = ["camiseta", "zapatilla", "gorra"];
let resultado = "";
let x = -1;
//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function petition(req, res) {

  resultado = "";

  //COOOKIEEES
  const cookie = req.headers.cookie;
  //-- Peticion recibida
  console.log("Peticion recibida");
  console.log("Recurso solucitado (URL): " + req.url)

  let q = url.parse(req.url, true);

  //-- Crear mensaje de respuesta
  let filename = "";
  //Parte de query
  console.log("Pathname: " +  q.pathname);
  switch (q.pathname) {
    case "/":
      filename = "Web_1.html";
      break;
    case "/myform":
      if (req.method === 'POST') {
        var content = "";
        var parametro = "";
        resultado = "";
        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            //-- Añadir los datos a la respuesta
            content += data;
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            parametro = content.split("=")[1];
            for (let i=0; i < productos.length; i++) {
              x = -1;
              x = productos[i].indexOf(parametro);
              //-- Añadir cada producto al párrafo de visualización
              if (x == 0){
                resultado = productos[i];
              }
            }
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
          req.on('end', ()=> {
            fs.readFile(filename, (err, data) => {
              ///--Fichero no encontrado
              if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("<h1>Product doesnt exist</h1>");
                return res.end();
              }else {
                //-- Tipo mime por defecto html
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
          new_user = true;
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
    case "/compra":
      if (req.method === 'POST') {
        req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
          data = chunk.toString();
          console.log(data);
          parametro1 = data.split("=")[0];
          parametro2 = data.split("=")[1];
          new_user = true;
          //-- Tipo mime por defecto html
          if(cookie){
            content = "";
            for (var i = 0; i < cookie.split("; ").length; i++) {
              if (cookie.split("; ")[i].split("=")[0] == parametro2) {
                new_user = false;
                content = cookie.split("; ")[i].split("=")[1] += parametro1 += "/";
                res.setHeader("Set-Cookie", parametro2 + "=" + content);
                filename = "Web_1.html";
                break;
              }
            }
            if (new_user) {
              filename = "sesion.html";
            }
          }else{
            filename = "sesion.html";
          }
        })
        req.on('end', () => {
          fs.readFile(filename, (err, data) => {
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
          })
        })
        return
      }
      break;
    case "/carrito":
      if (req.method === 'POST') {
        var parametro = "";
        resultado = "";
        var content = ``;
        req.on('data', chunk => {
          data = chunk.toString();
          parametro1 = data.split("&")[0].split("=")[1];
          parametro2 = data.split("&")[1].split("=")[1];
          parametro3 = data.split("&")[2].split("=")[1];
          parametro4 = data.split("&")[3].split("=")[1];
          content = `
          <!DOCTYPE html>
          <html>
          	<head>
          		<meta name="viewport" content="width=device-width, initial-scale=1.0">
          		<title>REGISTRO</title>
          		<link rel="Stylesheet" type="text/css" href="styles.css"/>
          		<link rel="shortcut icon" href="LOGO.png">
          	</head>
          	<body>
          		<div id="Web_2">
          			<svg class="RECTANGULO1_B">
          				<rect fill="rgba(0,0,0,1)" rx="0" ry="0" x="0" y="0" width="1920" height="138">
          				</rect>
          			</svg>
          			<div id="INICIO">
          				<a class = "Hypertext" href="Web_1.html"><span>INICIO</span></a>
          			</div>
          			<div id="j">
          			<a class = "Hypertext" href="Web_1.html"><img id="J" src="JB.png"></a>
          			</div>
          		  <p id="nombretxt">AQUI TIENE SUS DATOS:</p>
                <p id="name">Nombre: `
          content += parametro1 += `</p><br><p id="apellido">Apellido:`
          content += parametro2 += `</p><br><p id="correo">Correo: `
          content += parametro3 += `</p><br><p id="pago">Pago: `
          content += parametro4 += `</p><br><p id="productos">Tus productos son: `
          new_user = true;
          parametro1 = data.split("&")[0].split("=")[1];
          parametro2 = data.split("&")[1].split("=")[1];
          parametro3 = data.split("&")[2].split("=")[1];
          parametro4 = data.split("&")[3].split("=")[1];
          //-- Tipo mime por defecto html
          if(cookie){
            for (var i = 0; i < cookie.split("; ").length; i++) {
              if (cookie.split("; ")[i].split("=")[0] == parametro1) {
                console.log(cookie.split("; ")[i]);
                products = cookie.split("; ")[i].split("=")[1];
                content += products += `</p><br>`
                content +=
                     `<svg class="RECTANGULO3_B">
                				<rect fill="rgba(0,0,0,1)" rx="0" ry="0" x="0" y="0" width="1920" height="179">
                				</rect>
                			</svg>
                			<div id="Contacto2">
                				<span>Contacto</span><br><span style="font-style:normal;font-weight:normal;">Tlf: 68899955<br/>Email : jarjarbinks_shop.jarjar.es</span>
                			</div>
                		</div>
                	</body>
                </html> `
                new_user = false;
                break;
              }
            }
            if (new_user) {
              filename = "sesion.html";
            }
          }else{
            filename = "sesion.html";
          }
        })
        req.on('end', ()=> {
          if (new_user) {
            fs.readFile(filename, (err, data) => {
              //-- Tipo mime por defecto html
              res.writeHead(200, {'Content-Type': "text/html"});
              res.write(data);
              return res.end();
            })
          }else{
            //-- Tipo mime por defecto html
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(content);
            return res.end();
          }
        })
        return
      }
      break;
    case "/myquery":
      const params = q.query;
      console.log(params.param1);
      //-- El array de productos lo pasamos a una cadena de texto,
      //-- en formato JSON:
      //--Recorrer los productos del objeto JSON
      for (let i=0; i < productos.length; i++) {
        x = -1;
        x = productos[i].toLowerCase().indexOf(params.param1.toLowerCase());
        //-- Añadir cada producto al párrafo de visualización
        if (x == 0){
          resultado += productos[i];
        }
      }
      content = JSON.stringify(resultado) + '\n';
      //-- Generar el mensaje de respuesta
      //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
      //-- en la cabecera Content-Type
      res.setHeader('Content-Type', 'application/json');
      res.write(content);
      res.end();
      return
      break;
    default:
      filename = q.pathname.substr(1);
  }
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
  if (q.pathname != "/myquery" | q.pathname != "/myform") {
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
