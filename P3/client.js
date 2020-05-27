//-- Obtener el botón de VER del DOM
const resultado = document.getElementById('resultado');

//-- Obtener el párrafo del DOM donde mostrar el resultado
const busqueda = document.getElementById('busqueda');

//-- Cuando el usuario escribe en la barra de búsqueda
busqueda.onkeyup = ()=>{
  //-- Borrar el resultado anterior que hubiese en el párrafo
  //-- de resultado
  resultado.innerHTML = "";
  if (busqueda.value.length >= 3) {
    //-- Crear objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();
    result = "";
    //-- Configurar la petición
    m.open("GET","http://localhost:8080/myquery?param1=" + busqueda.value, true);

    //-- Cuando haya alguna noticia sobre la peticion
    //-- ejecuta este código
    m.onreadystatechange=function(){
       //-- Petición enviada y recibida. Todo OK!
       if (m.readyState==4 && m.status==200){

         //-- La respuesta es un objeto JSON
         let productos = JSON.parse(m.responseText);

         //--Recorrer los productos del objeto JSON
         for (let i=0; i < productos.length; i++) {
           result += productos[i];
         }
         //-- Añadir cada producto al párrafo de visualización
         //Esto es añadido para poder extrapolarlo al caso en el que haya más produtos con el mismo empiece
         //En el caso de haber más productos, añadir más <p> resultado para ir añadiendo los productos
         resultado.innerHTML = result.split("/")[0];
       }
     }
     //-- Enviar la petición!
     m.send();
  }
}
//--Evento para autocompletar, pasando el ratón por encima del resultado de la búsqueda
//Si quisieramos añadir más productos con inicios similares, añadiriamos más event listener
//De esta forma con pasar el ratón, tendríamos autocompletado del objeto deseado.
resultado.addEventListener('mouseover', function(event){
    busqueda.value = result;
  })
