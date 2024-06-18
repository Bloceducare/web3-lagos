import csv
import os
import logging
from django.core.management.base import BaseCommand
from django.core.mail import EmailMultiAlternatives, get_connection
from django.conf import settings

class Command(BaseCommand):
    help = 'Send bulk personalized emails to users'

    def handle(self, *args, **kwargs):
        logging.basicConfig(level=logging.DEBUG)

        try:
            # Get the directory of the current script
            base_dir = os.path.dirname(os.path.abspath(__file__))
            # Construct the file paths
            csv_file_path = os.path.join(base_dir, 'data.csv')
            html_template_path = os.path.join(base_dir, 'email_template.html')

            # Read the HTML template
            with open(html_template_path, 'r') as file:
                html_template = file.read()

            # List to hold all the email messages
            email_messages = []

            # Read the CSV file
            with open(csv_file_path, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    name = row['Name']
                    email = row['Email']
                    subject = 'Welcome to the Web3Lagos Volunteer Team! 🥳💥'
                    print(email)
                    # Insert the user's name into the HTML template
                    html_message = html_template.replace('{name}', name)

                    from_email = settings.DEFAULT_FROM_EMAIL

                    # Create the email message
                    msg = EmailMultiAlternatives(subject, '', from_email, [email])
                    msg.attach_alternative(html_message, "text/html")
                    email_messages.append(msg)

            # Send all emails at once
            connection = get_connection()  # Use the default email connection
            connection.send_messages(email_messages)

            self.stdout.write(self.style.SUCCESS('Successfully sent emails to all users'))

        except Exception as e:
            logging.error(f'An error occurred: {e}')
            self.stderr.write(self.style.ERROR(f'An error occurred: {e}'))
