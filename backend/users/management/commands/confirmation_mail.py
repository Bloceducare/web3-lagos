import os
import logging
from django.core.management.base import BaseCommand
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string
from django.conf import settings
from users.models import CustomUser

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Send email to the last 150 users about the Web3Lagos Conference 3.0 Hackerhouse'

    def handle(self, *args, **kwargs):
        logging.basicConfig(level=logging.DEBUG)

        try:
            # Render the HTML template
            html_template = render_to_string('users/email_template.html')

            # List to hold all the email messages
            email_messages = []

            # Get the last 150 users' emails and names
            users = CustomUser.objects.values('email', 'first_name').order_by('-id')[:200]

            for user in users:
                email = user['email']
                name = user['first_name']

                # Personalize the email template for each user
                html_message = html_template.replace('{name}', name)

                from_email = settings.DEFAULT_FROM_EMAIL
                subject = 'Welcome to the Web3Lagos Conference 3.0 Hackerhouse! 💥'

                # Create the email message
                msg = EmailMultiAlternatives(subject, '', from_email, [email])
                msg.attach_alternative(html_message, "text/html")
                email_messages.append(msg)

                print(email, name)

            # Send all emails at once
            connection = get_connection()
            connection.send_messages(email_messages)

            self.stdout.write(self.style.SUCCESS('Successfully sent emails to the last 150 users'))

        except Exception as e:
            logger.error(f'An error occurred: {e}')
            self.stderr.write(self.style.ERROR(f'An error occurred: {e}'))
