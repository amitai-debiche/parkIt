from django.db import models
from django.contrib.auth.models import User


# Create your models here.

#Creating
# first, last, password, email,
#

class FavoritePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)

    def __str__(self):
         return f"{self.user.username}'s Favorite: {self.post.location}"
    

class Post(models.Model):
    # Creator temporarily a name, should change to more unique id per user
    # CHANGE User later on?
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=300)
    description = models.TextField(null = True, blank=True)
    spots = models.IntegerField()
    price = models.FloatField()
    created = models.DateTimeField(auto_now_add = True)

    creator_email = models.EmailField(null=True, blank=True)
    # post_id
    #
    class Meta:
        ordering = ['-created']

    def save(self, *args, **kwargs):
        # Set creator_email when saving the post
        if self.creator:
            self.creator_email = self.creator.email
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.location)
    
   