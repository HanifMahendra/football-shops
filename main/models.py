from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)  # nama item
    price = models.IntegerField()  # harga item
    description = models.TextField()  # deskripsi item
    thumbnail = models.URLField()  # URL gambar item
    category = models.CharField(max_length=50)  # kategori item
    is_featured = models.BooleanField(default=False)  # status unggulan

    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name
