from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.contrib import messages
from django.views.generic import CreateView
from .forms import SignUpForm

def index(request):
    return render(request, "core/main-menu.html")

def generator(request):
    return render(request,"core/generator.html")

def game(request):
    return render(request,"core/game.html")


class MyLoginView(LoginView):
    redirect_authenticated_user = True
    
    def get_success_url(self):
        return reverse_lazy('core:tasks') 
    
    def form_invalid(self, form):
        messages.error(self.request,'Invalid username or password')
        return self.render_to_response(self.get_context_data(form=form))
    
class SignUpView(CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('core:login')
    template_name = 'registration/signup.html'

from django.shortcuts import render, redirect
from .models import Map
from django.contrib.auth.decorators import login_required

def tasks(request):
    return render(request, "core/tasks.html")

@login_required
def user_maps(request):
    maps = Map.objects.filter(creator=request.user)
    for map in maps:
        map.user_is_creator = (map.creator == request.user)
    return render(request, 'core/user_maps.html', {'maps': maps})


@login_required
def public_maps(request):
    maps = Map.objects.filter(is_public=True)
    for map in maps:
        map.user_likes = request.user in map.approval.all()
    return render(request, 'core/public_maps.html', {'maps': maps})

@login_required
def toggle_public(request, map_id):
    map = Map.objects.get(id=map_id)
    if map.creator == request.user:
        map.is_public = not map.is_public
        map.save()
    return redirect('user_maps')

@login_required
def like_map(request, map_id):
    map = Map.objects.get(id=map_id)
    if request.user not in map.approval.all():
        map.approval.add(request.user)
    else:
        map.approval.remove(request.user)
    return redirect('public_maps')
