from django.urls import path
from main.views import *

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),
    path('products/', product_list, name='product_list'),
    path('add/', add_product, name='add_product'),
    path('detail/<int:id>/', product_detail, name='product_detail'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<int:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:id>/', show_json_by_id, name='show_json_by_id'),
    path('add/', add_product, name='add_product'),
    path('detail/<int:id>/', product_detail, name='product_detail'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
]
