from django.shortcuts import render
from mi_tienda.models import Producto, Registro
# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    return render(request, 'index.html', {'productos' : Producto.objects.all()})

def producto(request, prodname):
    return render(request, 'products.html', {'producto' : Producto.objects.get(name=prodname)})

def busqueda(request):
    prodname = request.POST['Busqueda'].lower()
    return render(request, 'index.html', {'productos' : Producto.objects.filter(name__startswith=prodname)})

def compra(request):
    nombre = request.POST['nombre'].lower()
    contrasena = request.POST['contrasena'].lower()
    correo = request.POST['correo'].lower()
    producto = Producto.objects.get(name=request.POST['producto'].lower())
    try:
        r = Registro.objects.get(name=nombre)
    except:
        r = Registro(name=nombre, contrasena=contrasena, correo=correo)
    r.precio += producto.prize
    r.carrito += producto.name + ','
    r.save()
    return render(request, 'index.html', {'productos' : Producto.objects.all()})

def carrito(request):
    return render(request, 'carrito.html', {'carrito' : '', 'precio' : ''})

def consultar(request):
    nombre = request.POST['nombre'].lower()
    try:
        carrito = Registro.objects.get(name=nombre).carrito
        precio = Registro.objects.get(name=nombre).precio
    except:
        carrito = ''
        precio = ''
    return render(request, 'carrito.html', {'carrito' : carrito, 'precio' : precio})
