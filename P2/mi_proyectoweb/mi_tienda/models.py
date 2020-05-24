# Create your models here.
from django.db import models

#Creamos el modelo producto que podremos observar y editar en el administrador,
#En el guardamos toda la información relacionada para poder acceder a ella desde nuestra aplicación
class Producto(models.Model):
    """Modelo de datos de mis productos"""

    # -- Usamos el nombre para identificar
    # -- el producto
    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    prize = models.FloatField()
    description = models.CharField(max_length=500,default='')

    # Creamos métodos dentro del modelo para poder devolver combinaciones
    #haciendo uso de los campos de nuestro producto
    def __str__(self):
        return self.name

    def get_path(self):
        return 'image/' + self.name + '.png'

    def mesa_trabajo(self):
        return 'image/mesa' + self.name + '.png'

#Creamos el modelo Registro que podremos observar y editar en el administrador,
#Con este modelo podemos ir guardando los distintos usuarios que se registren con su correspondiente
#carrito de la compra incluyendo el precio total
class Registro(models.Model):
    """Modelo de datos de las personas registradas"""
    name = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    carrito = models.CharField(max_length=500, default='')
    precio = models.FloatField(default=0.0)

    def __str__(self):
        return self.name
