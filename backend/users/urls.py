from django.urls import path
from .views import SignupView, SigninView, UserDetailView, UserListView, CompletePasswordResetView, ResetPasswordView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('password_reset/', ResetPasswordView.as_view(), name='initiate-reset-password'),
    path('complete-reset-password/', CompletePasswordResetView.as_view(), name='complete-reset-password'),
]
