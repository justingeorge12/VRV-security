from django.db import models

# Create your models here.




class Product(models.Model):
    name=models.CharField(max_length=60, unique=True)
    coins=models.IntegerField()
    image=models.ImageField(upload_to='products_image/',blank=True)

    def __str__(self):
        return self.name