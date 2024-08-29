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
            html_message_template = render_to_string('users/email_template.html')

            # Get all users' email addresses
            users = CustomUser.objects.values_list('email', flat=True)

            for email in users:
                # Render the email message for each user
                html_message = html_message_template
                
                email_message = EmailMessage(
                    subject,
                    html_message,
                    settings.DEFAULT_FROM_EMAIL,  
                    [email],
                )
                email_message.content_subtype = "html"
                
                # Attempt to send the email
                try:
                    email_message.send(fail_silently=False)
                    self.stdout.write(self.style.SUCCESS(f'Email sent to {email} successfully!'))
                except Exception as e:
                    # Log the error for each failed email
                    logger.error(f"Failed to send email to {email}: {str(e)}")
                    self.stdout.write(self.style.ERROR(f"Failed to send email to {email}: {str(e)}"))

        except Exception as e:
            # Log the error for general issues
            logger.error(f"Failed to process email sending: {str(e)}")
            self.stdout.write(self.style.ERROR(f"Failed to process email sending: {str(e)}"))
