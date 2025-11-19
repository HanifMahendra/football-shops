from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.core import serializers
from .models import Product
from .forms import ProductForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
import json
import datetime
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

@login_required(login_url='/login')
def show_main(request):
    filter_type = request.GET.get("filter","all")

    if filter_type == "all":
        products = Product.objects.all()
    else:
        products = Product.objects.filter(user=request.user)
    context = {
        'name': 'Hanif Awiyoso Mahendra',
        'class': 'PBP F',
        'products': products,
        'last_login': request.COOKIES.get('last_login', 'Never')
    }
    return render(request, "main.html", context)

def show_xml(request):
    data = Product.objects.all()
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json(request):
    product_list = Product.objects.all()
    data = [
        {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'thumbnail': product.thumbnail,
            'category': product.category,
            'is_featured': product.is_featured,
            'stock': product.stock,
            'brand': product.brand,
            'user_id': product.user.id if product.user else None,
        }
        for product in product_list
    ]
    return JsonResponse(data, safe=False)

def show_json(request):
    data = Product.objects.filter(user=request.user)
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

def show_xml_by_id(request, id):
    data = Product.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json_by_id(request, id):
    data = Product.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

@login_required
def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.user = request.user
            product.save()
            messages.success(request, f"Produk '{product.name}' berhasil ditambahkan!")
            return redirect("main:product_list")  # 👉 Redirect ke daftar produk
        else:
            messages.error(request, "Terjadi kesalahan saat menambahkan produk.")
    else:
        form = ProductForm()

    context = {"form": form, "title": "Tambah Produk"}
    return render(request, "add_product.html", context)

# --- API: get all products serialized as JSON ---
def get_products_json(request):
    filter_type = request.GET.get("filter", "all")
    
    if filter_type == "my" and request.user.is_authenticated:
        products = Product.objects.filter(user=request.user).order_by('-id')
    else:
        products = Product.objects.all().order_by('-id')
        
    data = serializers.serialize('json', products)
    return HttpResponse(data, content_type='application/json')

# --- API: get single product JSON ---
def get_product_json(request, id):
    try:
        p = Product.objects.filter(pk=id)
        if not p.exists():
            return JsonResponse({'error': 'not found'}, status=404)
        data = serializers.serialize('json', p)
        # data is a JSON array string of one element
        return HttpResponse(data, content_type='application/json')
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# --- API: add product (AJAX) ---
@login_required(login_url='/login')
@require_http_methods(["POST"])
def add_product_ajax(request):
    try:
        body = request.body.decode('utf-8')
        # Accept JSON or form-data; try JSON first
        try:
            payload = json.loads(body) if body else {}
        except:
            payload = request.POST.dict()
        name = payload.get('name')
        category = payload.get('category')
        price = payload.get('price') or 0
        thumbnail = payload.get('thumbnail') or ''
        if not name or not category:
            return JsonResponse({'success': False, 'error': 'name and category required'}, status=400)
        p = Product.objects.create(user=request.user, name=name, category=category, price=price, thumbnail=thumbnail)
        return JsonResponse({'success': True, 'message': 'Product added', 'id': p.pk})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

def delete_product_ajax(request, id):
    try:
        product = Product.objects.get(pk=id)
        product.delete()
        return JsonResponse({"success": True})
    except Product.DoesNotExist:
        return JsonResponse({"success": False})


# --- Detail Product ---
@login_required(login_url='/login')
def product_detail(request, id):
    product = get_object_or_404(Product, pk=id)
    return render(request, "product_detail.html", {"product": product})

@login_required(login_url='/login')
def product_list(request):
    filter_type = request.GET.get("filter", "all")
    
    if filter_type == "my":
        products = Product.objects.filter(user=request.user)
    else:
        products = Product.objects.all()
        
    return render(request, "product_list.html", {"products": products, "filter": filter_type})

def register(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:login')
    context = {'form':form}
    return render(request, 'register.html', context)

def login_user(request):
   if request.method == 'POST':
      form = AuthenticationForm(data=request.POST)

      if form.is_valid():
        user = form.get_user()
        login(request, user)
        response = HttpResponseRedirect(reverse("main:show_main"))
        response.set_cookie('last_login', str(datetime.datetime.now()))
        return response

   else:
      form = AuthenticationForm(request)
   context = {'form': form}
   return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

@login_required
def edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk, user=request.user)

    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, f"Produk '{product.name}' berhasil diperbarui!")
            return redirect("main:product_list")
        else:
            messages.error(request, "Gagal memperbarui produk. Periksa kembali form.")
    else:
        form = ProductForm(instance=product)

    context = {"form": form, "title": "Edit Produk"}
    return render(request, "edit_product.html", context)

# --- API: edit product (AJAX) ---
@login_required(login_url='/login')
@require_http_methods(["POST"])
def edit_product_ajax(request, id):
    try:
        p = Product.objects.get(pk=id)
        if p.user != request.user:
            return JsonResponse({'success': False, 'error': 'Unauthorized'}, status=403)
        payload = {}
        try:
            payload = json.loads(request.body.decode('utf-8')) if request.body else request.POST.dict()
        except:
            payload = request.POST.dict()
        p.name = payload.get('name', p.name)
        p.category = payload.get('category', p.category)
        p.price = payload.get('price', p.price)
        p.thumbnail = payload.get('thumbnail', p.thumbnail)
        p.save()
        return JsonResponse({'success': True, 'message': 'Product updated'})
    except Product.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

@login_required
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk, user=request.user)

    if request.method == "POST":
        product_name = product.name
        product.delete()
        messages.success(request, f"Produk '{product_name}' berhasil dihapus!")
        return redirect("main:product_list")  #  Redirect ke daftar produk

    context = {"product": product, "title": "Hapus Produk"}
    return render(request, "delete_product.html", context)

# --- API: delete product (AJAX) ---
@login_required(login_url='/login')
@require_http_methods(["POST"])
def delete_product_ajax(request, id):
    try:
        p = Product.objects.get(pk=id)
        if p.user != request.user:
            return JsonResponse({'success': False, 'error': 'Unauthorized'}, status=403)
        name = p.name
        p.delete()
        return JsonResponse({'success': True, 'message': f'Product \"{name}\" deleted'})
    except Product.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
    
# --- AUTH via AJAX: register/login/logout ---
@require_http_methods(["POST"])
@csrf_exempt
def register_ajax(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"success": False, "message": "Username already exists"})

        user = User.objects.create_user(username=username, password=password)
        user.save()
        return JsonResponse({"success": True, "message": "Registration successful"})

    return JsonResponse({"success": False, "message": "Invalid request method"})

@require_http_methods(["POST"])
@csrf_exempt
def login_ajax(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "message": "Invalid credentials"})
    return JsonResponse({"success": False, "message": "Invalid request"})


@require_http_methods(["POST"])
def logout_ajax(request):
    logout(request)
    return JsonResponse({"success": True, "message": "Logout successful"})