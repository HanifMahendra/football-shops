from django import forms
from .models import Product, Seller

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'thumbnail', 'category', 'is_featured', 'stock', 'brand']

#class SellerForm(forms.ModelForm):
#    password = forms.CharField(widget=forms.PasswordInput)

#    class Meta:
#        model = Seller
#        fields = ['nama', 'tanggal_lahir', 'email', 'no_telp', 'link socmed', 'password']
