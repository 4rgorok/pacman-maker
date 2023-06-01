from django.shortcuts import render

def index(request):
    return render(request, "core/main-menu.html")

def generator(request):
    return render(request,"core/generator.html")

def game(request):
    return render(request,"core/game.html")