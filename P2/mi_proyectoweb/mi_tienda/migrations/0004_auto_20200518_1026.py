# Generated by Django 2.2.10 on 2020-05-18 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0003_registro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registro',
            name='carrito',
            field=models.CharField(default='', max_length=500),
        ),
    ]
