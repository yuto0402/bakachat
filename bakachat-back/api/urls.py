from rest_framework import routers
from .views import ToDoViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'', )

urlpatterns = [
    path('', include(router.urls)),
]
