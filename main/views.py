from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.http import HttpResponse
from .models import Product
from .forms import ProductForm

def show_main(request):
    products = Product.objects.all()
    context = {
        'name': 'Hanif Awiyoso Mahendra',
        'class': 'PBP F',
        'products': products
    }
    return render(request, "main.html", context)

def show_xml(request):
    data = Product.objects.all()
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json(request):
    data = Product.objects.all()
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

def show_xml_by_id(request, id):
    data = Product.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json_by_id(request, id):
    data = Product.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

# --- Form Add Product ---
def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('main:show_main')
    else:
        form = ProductForm()
    return render(request, "product_form.html", {"form": form})

# --- Detail Product ---
def product_detail(request, id):
    product = get_object_or_404(Product, pk=id)
    return render(request, "product_detail.html", {"product": product})

def product_list(request):
    products = Product.objects.all()
    return render(request, "product_list.html", {"products": products})

