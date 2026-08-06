from rest_framework import serializers


class PredictionRequestSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=2048, trim_whitespace=True)

    def validate_url(self, value):
        if not value:
            raise serializers.ValidationError("URL is required.")
        return value

