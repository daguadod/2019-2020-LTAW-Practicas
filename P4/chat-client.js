console.log("Ejecutando cliente JS...");

//Obtenemos objetos del DOM
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");

//Creamos un websocker. Establece la conexion cliente-Servidor
const socket = io();

//Recepción de un hello
socket.on('hello', (msg) =>{
  console.log("Mensaje del servidor: " + msg);

  //Ponerlo en el display
  display.innerHTML = msg;
});

//Recepción de un mensaje común
socket.on('msg', (msg) => {
  //Añadir el mensaje al display
  display.innerHTML += "<br> > " + msg;
})

//Enviamos mensaje
send.onclick = () => {

  //-- Se envía el mensaje escrito
  //-- Usamos el nombre 'msg' para los mensajes de usuario
  if (msg.value)
    if (msg.value[0] == "/"){
      socket.emit('cmd', msg.value);
    }else{
      socket.emit('msg', msg.value);
    };

  //-- Borramos el mensaje escrito
  msg.value="";
}
