//-- Modulo https
const http = require('http');
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
// --Modulo URL
const url = require('url');
//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');

console.log("Arrancando servidor...")

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
  if (q.pathname == "/"){
    filename = "index.html";
  }else{
    filename = q.pathname.substr(1);
  };

  let extension = filename.split(".")[1];
  let mime = "";
  switch (extension) {
    case "jpg":
      mime = "imagen/jpg";
    case "png":
      mime = "imagen/png";
    case "gif":
      mime = "imagen/gif";
    case "ico":
      mime = "imagen/ico";
    case "html":
      mime = "text/html";
    case "css":
      mime = "text/css";
    case "json":
      mime = "application/json";
    default:
      mime = "text/html";
    break;
  }
  //_- Crear el mensaje de respuesta. Primero la cabecera
  //-- El código 200 se usa para indicar que todo está ok
  //-- En el campo Content-Type tenemos que introducir el tipo MIME
  //-- de lo que devolvemos

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


//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(petition);

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!");
console.log("Escuchando en puerto: " + PUERTO);
