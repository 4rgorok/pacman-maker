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
        return reverse_lazy('core:index') 
    
    def form_invalid(self, form):
        messages.error(self.request,'Invalid username or password')
        return self.render_to_response(self.get_context_data(form=form))
    
class SignUpView(CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('core:login')
    template_name = 'registration/signup.html'