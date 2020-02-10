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
function peticion(req, res) {

  //-- Peticion recibida
  console.log("Recurso solucitado (URL): " + req.url)

  let q = url.parse(req.url, true);
  //-- Crear mensaje de respuesta
  console.log("Pathname: " +  q.pathname)
  console.log("search: " + q.search)
  console.log("Búsqueda:")
  let qdata = q.query
  console.log(qdata)

  //-- Acceso al objeto
  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

  console.log()
  fs.readFile('index.html', 'utf8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

}


//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
