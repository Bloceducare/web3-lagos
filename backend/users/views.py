from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .serializers import SignupSerializer, SigninSerializer
from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token
from .serializers import CustomUserDetailSerializer, ResetPasswordSerializer, CompletePasswordResetSerializer
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_str, force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

class SignupView(generics.CreateAPIView):
    """Register  user here with email and password"""
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = CustomUser.objects.get(email=request.data['email'])
        self.send_confirmation_email(user)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({
                'message': 'User registered successfully.',
                **response.data
            }, status=status.HTTP_201_CREATED)
        else:
            return response
        

    def send_confirmation_email(self, user):
        subject = 'Hackathon Registration Confirmation'
        html_message = f'''
        <p>Hello,</p>

        <p>Congratulations on successfully applying to be part of this year’s Web3 Lagos conference hackathon. This year, we are having IRL hackathons and we are working to ensure this happens in four (4) different locations.</p>

        <p>We advise you to get acquainted with the platform, read all information on the dashboard, register your team, and also ensure that you join the hackathon <a href="https://t.me/+Wu8DKYZweFMxMTdk">telegram group</a> to interact with the team and others in the hackathon and also find others who might be looking for teams.</p>

        <p>We are looking forward to seeing very interesting and usable ideas and can’t wait to see what you and your team will be building.</p>

        <p>Best,</p>

        <p>Faith Roberts<br>For the Hackathon team</p>
        '''
        plain_message = strip_tags(html_message)
        recipient_list = [user.email]
        email = EmailMessage(subject, plain_message, settings.DEFAULT_FROM_EMAIL, recipient_list)
        email.content_subtype = "html"
        email.send()




class SigninView(generics.CreateAPIView):
    """Login a user here with email and password"""
    serializer_class = SigninSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({
                'accesss_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'other_name': user.other_name,
                    'github_username': user.github_username,
                },
                'message': 'Authentication successful.'
            }, status=status.HTTP_200_OK)
        else:
            # Check specific reasons for authentication failure
            user = CustomUser.objects.filter(email=email).first()

            if user is None:
                error_message = 'User with this email does not exist.'
            elif not user.check_password(password):
                error_message = 'Incorrect password.'
            else:
                error_message = 'Authentication failed for an unknown reason.'

            return Response({
                'error': error_message,
                'message': 'Authentication failed.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get a user details from tthe user table by passing the user id as a slug"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserDetailSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
class UserListView(generics.ListAPIView):
    """Retrieves data for all users """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserDetailSerializer


def send_reset_password_mail(email, resetlink):
    subject = 'Password reset request'
    message = f'Your reset password link is: {resetlink}'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)



class ResetPasswordView(generics.CreateAPIView):
    """Request for reset password link user password by providing email"""
    serializer_class = ResetPasswordSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = CustomUser.objects.filter(email=email).first() 
        if user is not None:
            # Generate a token for password reset
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Generate the reset link
            resetlink = f"https://event.web3bridge.com/reset-password/{uid}/{token}/"

            # Send the reset link to the user's email
            send_reset_password_mail(user.email, resetlink)

            return Response({'message': 'Password reset initiated. Please check your email.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

class CompletePasswordResetView(generics.CreateAPIView):
    """Complete the password reset process"""
    serializer_class = CompletePasswordResetSerializer
    def create(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        confirm_new_password = request.data.get('confirm_new_password')
        
        uid = force_str(urlsafe_base64_decode(uid))  # Decode and convert to string
        
        user = CustomUser.objects.filter(pk=uid).first()

        if user is not None and default_token_generator.check_token(user, token):
            if new_password == confirm_new_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)