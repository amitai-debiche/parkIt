from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import os

def send_contact_email(post,creator_email, user_email):
    context = {
        'to_email' : user_email,
        'post_location' : post.location,
    }
    html_message = render_to_string('mail_template_1.html', context)
    plain_message = strip_tags(html_message)
    print(os.getenv('EMAIL_HOST_USER'))
    print(os.getenv('EMAIL_HOST_PASSWORD'))
    send_mail(
        "Interest in your parkIt Spot",
        plain_message,
        'parkitmad@gmail.com',
        [creator_email],
        html_message=html_message,
        fail_silently=False,
    )