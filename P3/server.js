//-- Modulo https
const http = require('http');
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
// --Modulo URL
const url = require('url');
//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');

console.log("Arrancando servidor...")

let productos = ["FPGA-1", "RISC-V", "74ls00", "FPGA-2", "74ls01", "AVR", "Arduino-UNO"];

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function petition(req, res) {

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
    case "/myquery":
      //-- El array de productos lo pasamos a una cadena de texto,
      //-- en formato JSON:
      content = JSON.stringify(productos) + '\n';
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
  console.log(filename);
  if (q.pathname != "/myquery") {
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
