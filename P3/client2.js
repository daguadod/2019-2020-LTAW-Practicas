//-- Obtener el párrafo del DOM donde mostrar el resultado
const nombre = document.getElementById('name');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const apellido = document.getElementById('apellido');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const correo = document.getElementById('correo');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const pago = document.getElementById('pago');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const boton3 = document.getElementById('boton3');

//-- Obtener el botón de VER del DOM
const resultado = document.getElementById('resultado');

//-- Cuando el usuario aprieta el botón de ver los productos
boton3.onclick = () =>{

  //-- Crear objeto para hacer peticiones AJAX
  const m = new XMLHttpRequest();

  //-- Configurar la petición
  m.open("GET","http://localhost:8080/carrito?nombre=" + nombre.value + "&apellido=" + apellido.value + "&correo=" + correo.value + "&pago=" + pago.value, true);
  m.send();
  //-- Cuando la haya alguna noticia sobre la peticion
  //-- ejecuta este código
  m.onreadystatechange=function(){
     //-- Petición enviada y recibida. Todo OK!
     if (m.readyState==4 && m.status==200){

       if (m.responseText != "") {
         //-- La respuesta es un objeto JSON
         let productos = JSON.parse(m.responseText);
         resultado.innerHTML = "Su ticket es: <br>Nombre: " + nombre.value + "<br>Apellido: " + apellido.value + "<br>Correo: " + correo.value + "<br>Metodo de pago: " + pago.value + "<br>Compra:<br>"
         //--Recorrer los productos del objeto JSON
         for (let i=0; i < productos.length; i++) {

           //-- Añadir cada producto al párrafo de visualización
           resultado.innerHTML += productos[i];
         }
       }else{
         resultado.innerHTML = "El cliente que busca no está registrado, <br>regístrese primero."
       }
     }
   }
   //-- Enviar la petición!
}
