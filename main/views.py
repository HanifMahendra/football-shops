from django.shortcuts import render

def show_main(request):
    context = {
        'name': 'Hanif Awiyoso Mahendra',
        'class': 'PBP F'
    }

    return render(request, "main.html", context)    

# Create your views here.
