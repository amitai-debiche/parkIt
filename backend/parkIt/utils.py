from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_contact_email(post,to_email):
    context = {
        'to_email' : to_email,
        'post_location' : post.location,
    }
    html_message = render_to_string('./email_templates/mail_template_1.html', context)
    plain_message = strip_tags('./email_templates/mail_template_1.html', context)

    send_mail(
        "Interest in your parkIt Spot",
        plain_message,
        'parkitmad@gmail.com',
        [to_email],
        html_message=html_message,
        fail_silently=False,
    )