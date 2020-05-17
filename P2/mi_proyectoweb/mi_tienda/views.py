from django.shortcuts import render
from mi_tienda.models import Producto
# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    return render(request, 'index.html', {'productos' : Producto.objects.all()})

def producto(request, prodname):
    return render(request, 'products.html', {'producto' : Producto.objects.get(name=prodname)})
