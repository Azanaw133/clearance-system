from rest_framework import serializers
from .models import UploadedFile

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'filename', 'uploaded_at', 'extracted_text',
                  'processed_text', 'unique_words', 'word_count', 'frequency']
        
        