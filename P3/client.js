//-- Obtener el botón de VER del DOM
const resultado = document.getElementById('resultado');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const busqueda = document.getElementById('busqueda');

//-- Cuando el usuario aprieta el botón de ver los productos
busqueda.onkeyup = ()=>{
  //-- Borrar el resultado anterior que hubiese en el párrafo
  //-- de resultado
  resultado.innerHTML = "";
  if (busqueda.value.length >= 3) {
    //-- Crear objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();

    //-- Configurar la petición
    m.open("GET","http://localhost:8080/myquery?param1=" + busqueda.value, true);

    //-- Cuando la haya alguna noticia sobre la peticion
    //-- ejecuta este código
    m.onreadystatechange=function(){
       //-- Petición enviada y recibida. Todo OK!
       if (m.readyState==4 && m.status==200){

         //-- La respuesta es un objeto JSON
         let productos = JSON.parse(m.responseText);

         //--Recorrer los productos del objeto JSON
         for (let i=0; i < productos.length; i++) {

           //-- Añadir cada producto al párrafo de visualización
           resultado.innerHTML += productos[i];

         }
       }
     }
     //-- Enviar la petición!
     m.send();
  }
}
