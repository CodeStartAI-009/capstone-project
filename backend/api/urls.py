from django.urls import path

from .views import health, predict


urlpatterns = [
    path("health/", health, name="health"),
    path("predict/", predict, name="predict"),
]

