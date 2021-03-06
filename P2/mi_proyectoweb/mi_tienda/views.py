from django.shortcuts import render
from django.http import HttpResponse
# -- Debemos importar los modelos de nuestra tienda
from mi_tienda.models import Producto, Registro
# -- Vista principal de mi tienda
def index(request):
    return render(request, 'index.html', {'productos' : Producto.objects.all()})

# -- Vista de Producto (Responde con una página secundaria personalizada según el producto)
# -- El producto nos llega del href del index.html en forma de url con el nombre de dicho producto
def producto(request, prodname):
    return render(request, 'products.html', {'producto' : Producto.objects.get(name=prodname)})

# -- Vista que crea una página personalizada según el producto que se esté buscando.
# -- La página está basada en el index.html pero reduciendo el bucle al producto que comience las letras buscadas.
def busqueda(request):
    # -- Extraemos el nombre del producto de los contenidos del método POST
    prodname = request.POST['Busqueda'].lower()
    return render(request, 'index.html', {'productos' : Producto.objects.filter(name__startswith=prodname)})

# -- Vista para registrar una compra
def compra(request):
    #Extraemos los datos del cliente con los contenidos del método POST
    nombre = request.POST['nombre'].lower()
    contrasena = request.POST['contrasena'].lower()
    correo = request.POST['correo'].lower()
    producto = Producto.objects.get(name=request.POST['producto'].lower())
    talla = request.POST['talla']
    #Si no existe un registro con el cliente creamos uno, sino, lo actualizamos
    try:
        r = Registro.objects.get(name=nombre)
    except:
        r = Registro(name=nombre, contrasena=contrasena, correo=correo)
    if contrasena == r.contrasena:
        r.precio += producto.prize
        r.carrito += producto.name + '(' + talla + '),'
        producto.stock = producto.stock - 1
        print(f"pedido recibido de {nombre}")
        r.save()
        producto.save()
        #Volvemos a la página principal tras la compra
        return render(request, 'index.html', {'productos' : Producto.objects.all()})
    else:
        #Devolvemos una respuesta simple
        return HttpResponse("<h1>Contraseña incorrecta</h1>")

#Vista para consultar el carrito. La parte del resultado estará vacía
def carrito(request):
    return render(request, 'carrito.html', {'carrito' : '', 'precio' : ''})

#Vista para devolver el carrito del cliente solicitado.
def consultar(request):
    #Extraemos el nombre del método POST
    nombre = request.POST['nombre'].lower()
    #Si el cliente está registrado, extraemos sus datos de la base de datos, si no, devolvemos los campos vacios para evitar errores
    try:
        carrito = Registro.objects.get(name=nombre).carrito
        precio = Registro.objects.get(name=nombre).precio
    except:
        carrito = 'No ha realizado ninguna compra'
        precio = '0'
    return render(request, 'carrito.html', {'carrito' : carrito, 'precio' : precio})

#Vista para eliminar los datos de un usuario registrado
def eliminar(request):
    nombre = request.POST['name'].lower()
    contrasena = request.POST['contrasena']
    #Comprobamos si el usuario que se desea eliminar está registrado
    try:
        name = Registro.objects.get(name=nombre).name
        password = Registro.objects.get(name=nombre).contrasena
        #Comprobamos si las contraseñas coinciden
        if contrasena == password:
            r = Registro.objects.get(name=nombre)
            r.delete();
            return render(request, 'index.html', {'productos' : Producto.objects.all()})
        else:
            #Devolvemos una respuesta simple
            return HttpResponse("<h1>Contraseña incorrecta</h1>")
    except:
        return HttpResponse("<h1>No se ha podido encontrar el usuario</h1>")
