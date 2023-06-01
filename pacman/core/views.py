from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.contrib import messages
from django.views.generic import CreateView
from .forms import SignUpForm
from .models import Map

def index(request):
    return render(request, "core/main-menu.html")

def generator(request):
    return render(request,"core/generator.html")

def game(request):
    return render(request,"core/game.html")

def get_public_maps(request):
    # get all maps that are public
    maps = Map.objects.filter(is_public=True)
    return JsonResponse(maps)

def get_maps_sorted_by_name(request):
    # get all maps sorted by name
    maps = Map.objects.filter(is_public=True).order_by('name')
    return JsonResponse(maps)

def get_maps_sorted_by_date(request):
    # get all maps sorted by date
    maps = Map.objects.filter(is_public=True).order_by('date')
    return JsonResponse(maps)

def get_maps_sorted_by_approval(request):
    # get all maps sorted by approval
    maps = Map.objects.filter(is_public=True).order_by('approval')
    return JsonResponse(maps)

class MyLoginView(LoginView):
    redirect_authenticated_user = True
    
    def get_success_url(self):
        return reverse_lazy('tasks') 
    
    def form_invalid(self, form):
        messages.error(self.request,'Invalid username or password')
        return self.render_to_response(self.get_context_data(form=form))
    
class SignUpView(CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'