//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http');

//-- Acceso al módulo fs, para lectura de ficheros
const fs = require('fs');

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  //-- Peticion recibida
  console.log(req.url)

  //-- Crear mensaje de respuesta

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
