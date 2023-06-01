from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Map(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    name = models.CharField(max_length = 100)
    creation_date = models.DateTimeField("creation date", default=timezone.now)
    approval = models.IntegerField(default=0) # Idea is that this correlates to number of thumbs up under the map
    layout = models.JSONField()
