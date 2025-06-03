from django.urls import path
from .views import RegisterView, LoginView, MenuItemListView, OrderCreateView, OrderHistoryView, AdminOrderListView, AdminOrderUpdateView, InvoiceView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('menu/', MenuItemListView.as_view(), name='menu'),
    path('order/', OrderCreateView.as_view(), name='order-create'),
    path('order/history/', OrderHistoryView.as_view(), name='order-history'),
    path('admin/orders/', AdminOrderListView.as_view(), name='admin-orders'),
    path('admin/orders/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin-order-update'),
    path('invoice/<int:order_id>/', InvoiceView.as_view(), name='invoice'),
]