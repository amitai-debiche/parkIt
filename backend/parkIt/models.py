from django.db import models
from django.contrib.auth.models import User


# Create your models here.

#Creating

class Post(models.Model):
    # Creator temporarily a name, should change to more unique id per user
    # CHANGE User later on?
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=300)
    description = models.TextField(null = True, blank=True)
    spots = models.IntegerField()
    price = models.FloatField()
    created = models.DateTimeField(auto_now_add = True)
    # post_id
    #
    class Meta:
        ordering = ['-created']

    def __str__(self):
        return str(self.location)
    
   