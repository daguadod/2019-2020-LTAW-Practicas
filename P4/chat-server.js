//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 8080

//--Contador de clientes
var clients = 0;

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  clients += 1;
  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);

  //--Mensaje de bienvenida
  console.log("Cliente número " + clients);
  socket.emit("hello", "Bienvenido al Chat eres el usuario número: " + clients.toString());
  io.emit('msg', "Se ha conectado el usuario número: " + clients,toString());
  //Comandos para el Servidor
  socket.on('cmd', (msg) =>{
    switch (msg) {
      case "/help":
        socket.emit("msg", "Comandos disponibles: /help, /date, /list, /hello");
        break;
      case "/date":
        let date = new Date();
        socket.emit("msg", date.getDate() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear());
        break;
      case "/list":
        socket.emit("msg", "El numero de usuarios conectados es de: " + clients);
        break;
      case "/hello":
        socket.emit("msg", "Bienvenido al Chat");
        break;
      default:
    }
  })

  //Respuesta a mensaje recibido por un cliente (retrollamada)
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ": " + msg);
    //Reenviamos a todos los clientes
    io.emit('msg', msg);
  })


  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
    clients -= 1;
    io.emit('msg', "Se ha desconectado un usuario");
  });
});
