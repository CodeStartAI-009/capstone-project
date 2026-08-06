from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from detector.services import analyze_url

from .serializers import PredictionRequestSerializer


@api_view(["GET"])
def health(request):
    return Response({"status": "ok"})


@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
def predict(request):
    serializer = PredictionRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        return Response(analyze_url(serializer.validated_data["url"]))
    except ValueError as exc:
        return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(
            {"detail": "The analysis service is temporarily unavailable. Please try again."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

