# Generated by Django 4.2.7 on 2023-11-12 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parkIt', '0003_alter_post_options_alter_post_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='creator_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
