# Create your models here.
from django.db import models

class Producto(models.Model):
    """Modelo de datos de mis productos"""

    name = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    prize = models.FloatField()
    description = models.CharField(max_length=500,default='')

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.name

    def get_path(self):
        return 'image/' + self.name + '.png'

    def mesa_trabajo(self):
        return 'image/mesa' + self.name + '.png'

class Registro(models.Model):

    name = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)
    correo = models.CharField(max_length=50)
    carrito = models.CharField(max_length=500, default='')
    precio = models.FloatField(default=0.0)

    def __str__(self):
        return self.name
