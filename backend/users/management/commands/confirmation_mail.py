import os
from django.core.management.base import BaseCommand
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from users.models import CustomUser
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Send email to all users about the Web3Lagos Conference 3.0 Hackerhouse'

    def handle(self, *args, **kwargs):
        # Subject of the email
        subject = "Confirm Your Participation in Web3Lagos Conference 3.0 Hackerhouse"
        
        try:
            # Render the email template from the file
            html_message = render_to_string('users/email_template.html')

            # Get all users' email addresses
            users = list(CustomUser.objects.values_list('email', flat=True))
            print(users)
            
            email_message = EmailMessage(
                subject,
                html_message,
                settings.DEFAULT_FROM_EMAIL,  
                bcc=users,
            )
            email_message.content_subtype = "html"
            
            # Attempt to send the email
            email_message.send(fail_silently=False)

            self.stdout.write(self.style.SUCCESS('Emails sent successfully!'))

        except Exception as e:
            # Log the error
            logger.error(f"Failed to send emails: {str(e)}")
            self.stdout.write(self.style.ERROR(f"Failed to send emails: {str(e)}"))
