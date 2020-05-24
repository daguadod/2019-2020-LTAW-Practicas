from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Cada uno de los path, responde a una petición del cliente (url solicitada)
# -- Redirigiendo a las distintas vistas de nuestra aplicación.

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('<prodname>_product', views.producto, name='producto'),
    path('myform', views.busqueda, name='busqueda'),
    path('compra', views.compra , name='compra'),
    path('carrito', views.carrito, name='carrito'),
    path('consultar', views.consultar, name='consultar'),
    path('borrar', views.eliminar, name='borrar')
]
