# Generated by Django 2.2.10 on 2020-05-24 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0004_auto_20200518_1026'),
    ]

    operations = [
        migrations.AddField(
            model_name='registro',
            name='talla',
            field=models.CharField(default='', max_length=3),
        ),
    ]
