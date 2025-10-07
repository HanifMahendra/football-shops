from django.urls import path
from main.views import *

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),
    path('products/', product_list, name='product_list'),
    path('product/add/', add_product, name='add_product'),
    path('product/<int:id>/', product_detail, name='product_detail'),
    path('product/<int:pk>/edit/', edit_product, name='edit_product'),
    path('product/<int:pk>/delete/', delete_product, name='delete_product'),

    path('xml/', show_xml, name='show_xml'),
    path('xml/<int:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/', show_json, name='show_json'),
    path('json/<int:id>/', show_json_by_id, name='show_json_by_id'),

    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    path('get-products-json/', get_products_json, name='get_products_json'),
    path('get-product-json/<int:id>/', get_product_json, name='get_product_json'),
    path('add-product-ajax/', add_product_ajax, name='add_product_ajax'),
    path('product-ajax/<int:id>/edit/', edit_product_ajax, name='edit_product_ajax'),
    path('delete-product-ajax/<int:id>/', delete_product_ajax, name='delete_product_ajax'),

    path('auth/register-ajax/', register_ajax, name='register_ajax'),
    path('auth/login-ajax/', login_ajax, name='login_ajax'),
    path('auth/logout-ajax/', logout_ajax, name='logout_ajax'),
]
